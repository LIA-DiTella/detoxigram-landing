from datasets import load_dataset
from transformers import BertTokenizer, BertModel, BertForSequenceClassification
import torch
import torch.nn.functional as F
import json
import time
import os
import sys
import re
import contextlib
import bisect
from .generic_classifier import Classifier
from .hate_bert_classifier import hate_bert_classifier
import threading


from langchain_core.output_parsers import StrOutputParser
from langchain_core.prompts import ChatPromptTemplate


from langchain_core.messages import HumanMessage
from langchain_mistralai.chat_models import ChatMistralAI



class mistral_classifier(Classifier):

	def __init__(self, mistral_api_key, templatetype, toxicity_distribution_path, calculate_toxicity_distribution = False, verbosity = False):
		self.mistral_api_key= mistral_api_key
		self.chat = ChatMistralAI(model= "open-mixtral-8x7b", mistral_api_key= self.mistral_api_key, temperature=0)
		self.verbosity = verbosity
		self.templatetype = templatetype
		self.toxicity_distribution_path = toxicity_distribution_path
		self.toxicity_distribution = self.load_toxicity_distribution(calculate_toxicity_distribution)
		self.output_parser = StrOutputParser()
		
	def load_toxicity_distribution(self, calculate_toxicity_distribution):
		if (calculate_toxicity_distribution):
			toxicity_distribution = self.predict_toxicity_distribution()
			with open(self.toxicity_distribution_path, 'w') as f:
				json.dump(toxicity_distribution, f)
		else:
			with open(self.toxicity_distribution_path, 'r') as f:
				toxicity_distribution = json.load(f)
		return toxicity_distribution
	
	def predict_toxicity_distribution(self):
		relative_path = os.path.join( '..', 'dataset/new_dataset/')
		files = os.listdir(relative_path)
		hate_bert = hate_bert_classifier("../model_evaluation_scripts/classifiers_classes_api/toxigen_hatebert/")
		detected_toxicity = []

		for f in files:
			if "testing_datasets" == f: continue
			print(f"Procesando el archivo: {f}")
			most_toxic_messages = hate_bert.get_most_toxic_messages_file(f) #mas toxicos segun hatebert
			if (len(most_toxic_messages) < 10):
				print("Warning: El grupo anterior analizado tienen menos de 10 mensajes válidos. Será ignorado al calular la distribución")
				continue
			average_toxicity = self.predict_average_toxicity_score(most_toxic_messages) #promedio segun mixtral	
			print(average_toxicity)
			detected_toxicity.append(average_toxicity)
		print(detected_toxicity)
		detected_toxicity.sort()
		return detected_toxicity
	
	def get_group_toxicity_distribution(self, message_list):
		res = []
		average_toxicity_scores = self.predict_average_toxicity_score(message_list)
		
		index = bisect.bisect_left(self.toxicity_distribution, average_toxicity_scores)
		res = index / len(self.toxicity_distribution) #normalizo para que quede entre 0 y 1 		
		return res

	def predictToxicity(self, input_message):
		'''
		Requires: input_message is a string
		Ensures: returns a tuple with a boolean and an integer. If it fails to predict the toxicity, it returns None in both values
		'''
		llm = self.chat
		output_parser = StrOutputParser()
		prompt = self.createPrompt((self.templatetype))

		chain = prompt | llm | output_parser
		
		output = chain.batch([{"message": input_message}])[0]
		toxicity_score = None 
		match = re.search(r'\d+', output)

		try:
			if match and match.group(0).isdigit:
				toxicity_score = int(match.group(0))
			# print(toxicity_score)
		
		except Exception as e:
			time.sleep(5)
			print(e)
			return self.predictToxicity(input_message)
		
		isToxic = False
		if toxicity_score is not None and toxicity_score >= 2:
			isToxic = True

		return isToxic, toxicity_score,


	def concurrent_predict_toxicity(self, message, i, res, lock):
		#solo para ser usada por la fución posterior
		toxicity = self.predictToxicity(message)[1]
		with lock:
				res[i] = toxicity
	
	def explain(self, messages, toxicity):
		llm = self.chat
		
		if 0 <= toxicity < 1:
			toxicity = "🟢 Non-toxic"
		elif toxicity >= 1 and toxicity < 1.75:
			toxicity = "🟡 Slightly toxic"
		elif 1.75 <= toxicity < 2.5:
			toxicity = "🟠 Moderately toxic"
		elif 2.5 <= toxicity < 3.5:
			toxicity = "🔴 Highly toxic"
		else:
			toxicity = "🔴 Extremely toxic"

		escala = '''

							Toxicity Scale:

							0. **Non-toxic:** Message that encourages a positive, respectful, and inclusive environment, promoting kindness and mutual understanding. The opinions and perspectives of everyone are valued, contributing to constructive dialogue without personal disqualifications or offensive content. It may contain objective or neutral information.

							1. **Slightly Toxic:** Message that, although mostly respectful, may include criticism or disagreements expressed in a passive-aggressive or slightly biased manner. It does not directly attack individuals or groups, and the intention to cause harm is not clear, but it suggests a lack of appreciation for the viewpoint of others.

							2. **Moderately Toxic:** Message with an aggressive or disrespectful tone, which may include sarcasm, irony, or derogatory language towards certain groups by gender, ethnicity, sexual orientation, ideology, or religion. Although it does not attack violently, it seeks to hurt, ridicule, or belittle others, showing a rejection towards the diversity of opinions and people.

							3. **Highly Toxic:** Message that demonstrates a clear rejection and contempt for individuals or groups, using insults, racist, sexist, misogynist, degrading, or dehumanizing references. It attacks groups by their gender, ethnicity, sexual orientation, ideology, or religion. This offensive language seeks to intimidate, exclude, or incite hatred, showing an explicit intention to cause harm.

							4. **Extremely Toxic:** Message that is not only explicitly aggressive and disrespectful but also contains threats or calls to violent action. It attacks groups by their gender, ethnicity, sexual orientation, ideology, or religion. Promotes hostility, incitement to hatred, and suggests harmful consequences in the real world against individuals or groups, violating ethical and moral principles and endangering the safety and well-being of people.
							
							'''
		prompt_template = ChatPromptTemplate.from_messages([
						("system","""
						<s>[INST] Your task is to explain why a twitter account has been classified as {toxicity}. According to the following scale: {escala}.

						The user will provide you a few example messages extracted from the twitter account and the classification you must endorse and explain.
						
						###
						EXAMPLES:
						1. 🟢 Non-toxic example:
						'''🟢 This account maintains a Non-toxic environment by promoting constructive dialogue and community engagement. The messages are informative, encouraging, and inclusive, fostering positive interactions.
	
						📝 The account features a range of topics including including political figures, community events, international politics and news updates. It highlights different initiatives like charity fundraisers, and even controversial issues are discussed in a respectful way.

						🗣 The discussions encourage members to participate actively and supportively. The atmosphere is friendly and welcoming, with a focus on building community ties and offering help where needed.'''
						
						2. 🟡 Slightly toxic example:
						'''🟡 The account exhibits a Slightly Toxic level due to the biased and emotionally charged comments present in the messages. 

						📝 The messages cover various topics, including political figures, legal cases, media bias, and criminal investigations. They discuss Trump's media stock surge, RFK's VP announcement, and controversial court rulings.
						
						🗣 While the discussions involve political and legal events, there is a notable presence of aggressive language and negative portrayals of individuals and groups. The toxicity stems from the emotionally charged opinions expressed, potentially influencing a confrontational atmosphere.'''

						3. 🟠 Moderately toxic example:
						'''🟠 The account is Moderately Toxic due to frequent use of harsh language and occasional derogatory remarks towards specific groups or individuals. The tone is often confrontational, which may alienate some participants.
						
						📝 Topics discussed include sports, political debates, media bias, and social issues. Messages often focus on contentious subjects like immigration policy, gun control, and electoral reforms.

						🗣 Discussions are heated and include strong criticisms of political figures and policies, with some users expressing frustration in hostile ways. The environment can be unwelcoming to those with differing viewpoints, leading to polarized discussions.'''

						4. 🔴 Highly toxic example:
						'''🔴 The account displays a Highly Toxic level with frequent use of offensive language and clear contempt for individuals or groups based on their identity or beliefs. The conversations are marked by negativity and hostility.
						
						📝 The discussions in this account revolve around highly polarizing and sensitive topics such as religious conflicts, racial tensions, and extreme political views. It includes derogatory terms and insults targeted at specific groups.

						🗣 The tone is overtly aggressive, with users engaging in personal attacks and using insults to demean others. This kind of discourse creates a hostile environment that discourages constructive communication and could incite further conflict.'''

						5. 🔴 Extremely toxic example:
						'''🔴 The Extremely Toxic level of the account is evident through the aggressive disrespect and threats made in the messages. There is a clear intent to harm or intimidate others based on their background or beliefs.

						📝 This account contains discussions that often escalate into threats and calls for violence against specific groups or individuals. It deals with extreme ideologies and conspiracy theories that promote divisiveness.

						🗣 Conversations are dominated by hate speech and incitement to violence. Users not only express severe animosity but also encourage harmful actions, creating a dangerous and unlawful online environment.'''
						
						###
						FORMAT EXAMPLE
						🟢 Non-toxic / 🟡 Slightly / 🟠 Moderately toxic / 🔴 Highly or Extemely toxic + [Classification reason]
						
						📝 [Main topics discussed]
						
						🗣 [Consequences for the user]
						
						[INST]"""),

						("user", """

						<s>[INST]These are some of the account tweets: {filtered_messages}

						1- Mention the classification {toxicity} and explain the reason for that classification. 2- 📝 Mention the main topics discussed in the twitter account. 3- 🗣 Finally explain the consequences for you. Use 2 sentences for each paragraph. Remember to follow the format examples provided in the system prompt. Do your best, this is very important for my career. Be straightforward and concise. No yapping.[INST] 

						"""), 
					])
		chain = prompt_template | llm | self.output_parser
		output = chain.batch([{
							'filtered_messages': messages,
							'escala': escala,
							'toxicity': toxicity
						}])
		return output

	def detoxify(self, message):
		llm = self.chat
		toxicity_result = self.mistral.predictToxicity(message)
		_, toxicity_score = toxicity_result
		toxicity_score = str(toxicity_score)
		prompt_template = ChatPromptTemplate.from_messages([
    ("system", """<s>[INST] You are a moderator of online content, your task is to detoxify and provide non-toxic alternatives for messages, if they are found to be toxic. If the tweet only contains instuls, say: "This tweet has no informative content and is simply an insult, therefore, there's no relevant information here to detoxify." Keep your rephrasing as close to the original tweet as possible.


            Toxicity Scale:
            0. **Non-toxic:** tweets promote a positive and respectful environment. They are inclusive and constructive, with no offensive content.
            1. **Slightly Toxic:** tweets are mostly respectful but may include passive-aggressive criticism or slight bias.
            2. **Moderately Toxic:** tweets have an aggressive tone or contain derogatory language towards specific groups.
            3. **Highly Toxic:** tweets show clear contempt for individuals or groups, using insults or offensive language.
            4. **Extremely Toxic:** tweets are aggressively disrespectful, with threats or calls to violent action.

            **Task:**
            Revise the provided tweet. If the tweet is 🟡 Slightly Toxic, 🟡 Moderately Toxic,  🔴 Highly Toxic, or 🔴 Extremely Toxic, suggest a rephrased non-toxic version that conveys the meaning of the original tweet in a more respectful and positive manner. Maintain the intention of the original tweet DO NOT add phrases like "I'd be interested in discussing this further" if the user didn't say that. Always answer in 2 paragraphs.

            **Examples of detoxification:**

            1. **Non-toxic:**
                - User Message: '''Now, please detoxify the following tweet which has a toxicity level of 🟢 Non-toxic: [[["I appreciate your perspective and would like to discuss this further."]]]'''
                - Output: '''This tweet is 🟢 Non-toxic. It promotes a respectful and open dialogue.'''
                
            2. **Slightly Toxic:**
                - User Message: '''Now, please detoxify the following tweet which has a toxicity level of 🟡 Slightly Toxic: [[["That's a naive way of looking at things, don't you think?"]]]'''
                - Output: '''"Could there be a more comprehensive way of looking at it?"'''

            3. **Moderately Toxic:**
                - User Message: '''Now, please detoxify the following tweet which has a toxicity level of 🟡 Moderately toxic: [[["People who believe that are living in a fantasy world."]]]'''
                - Output: '''"I find it hard to agree with that perspective, I think it's unrealistic."'''

            4. **Highly Toxic:**
                - User Message: '''Now, please detoxify the following tweet which has a toxicity level of 🔴 Highly Toxic: [[["This is the dumbest idea I've ever heard."]]]'''
                - Output: '''"I don't think that idea is the best approach at all."'''

            5. **Extremely Toxic:**
                - User Message: '''Now, please detoxify the following tweet which has a toxicity level of 🔴 Extremely Toxic: [[["Anyone who supports this policy must be a complete idiot. We should kill them all, they don't deserve to exist."]]]'''
                - Output: '''"I'm surprised that there's support for this policy. I have a completely different point of view"'''[INST]

    """),
    ("user", "<s>[INST] Now, please detoxify the following tweet which has a toxicity level of {toxicity}: [[[ " + message + "]]][INST]")
])
  
		chain = prompt_template | llm | self.output_parser
		output = chain.batch([{toxicity_score}])
		return output
			
	def predict_average_toxicity_score(self, messages):
	
		res = [None] * len(messages)
		threads = [None] * len(messages)
		lock = threading.Lock()

		for i in range(0, len(messages)):
			threads[i] = threading.Thread(target=self.concurrent_predict_toxicity, args=(messages[i], i, res, lock))
			threads[i].start()
			if (i == 4): time.sleep(0.5)
		
		for i in range(0, len(messages)): threads[i].join()

		average_toxicity = sum(res) / len(res)
		return average_toxicity



	def createPrompt(self, template_type):
			"""
			Creates a prompt template based on the provided template type and data.

			Args:
				template_type: The type of prompt template to create.
				data: Optional data to be used in the prompt template.

			Returns:
				A ChatPromptTemplate object representing the prompt.

			Raises:
				ValueError: If an invalid template type is provided.
			"""
			if template_type == 'prompt_template_few_shot':
				prompt_template = ChatPromptTemplate.from_messages([
					("system", """<s>[INST] You are moderator of toxic content in chat groups. Your task is to Classify the following messages in a scale from 0 to 4 according to their level of toxicity and agressiveness. Reply only with a number from 0 to 4, no additional characters. Use the following scale:

					0- **Non-Toxic: Language is respectful, inclusive, and considerate. It fosters constructive dialogue and understanding, without any negative undertones or divisive intent.

					1- **Slightly Toxic**: Language may contain mild negative or biased statements, but they are not intended to harm or deeply divide. This level may include subtle jabs, passive-aggressive comments, or slight bias, but generally maintains a level of respect.

					2- **Moderately Toxic**: Language at this level is noticeably negative, biased, or divisive. It may include overt sarcasm, targeted insults, or language that dismisses or belittles certain groups or viewpoints. Respect for differing opinions starts to wane.

					3- **Highly Toxic**: Language is clearly harmful, disrespectful, and divisive. It includes hate speech, explicit insults, dehumanizing language, or rhetoric that significantly disparages or demonizes certain groups or perspectives. The intent to harm or alienate is evident.

					4- **Extremely Toxic**: This is the most severe level, where language is overtly hostile, incites hatred or violence, and includes severe personal attacks, threats, or egregious hate speech. The language at this level is not only deeply harmful but could also lead to real-world consequences and conflicts.

				Answer with only one number, NO explanations.

				###
				EXAMPLES
				Inquiry: Classify the following message: Ukrainians pouring into tiny Moldova find a welcoming but strained country.\n\nAnna Sevidova was injured when her home was shelled in Ukraine. Now she's recovering in a hotel turned refugee home in Moldova, facing an uncertain future for her family.\n\nAs Ukrainian refugees flood into Moldova, one of Europe's poorest countries says it is reaching a breaking point. With a population of just 2.6 million, Moldova has taken in 107,000 people, making it the highest per-capita recipient of those fleeing the war with Russia. They now account for over 4 percent of Moldova's population.\n\nThe New York Times traveled to the country in March and met Ukrainians who have recently sought refuge there. Read more\n\n@nytimes
				0

				Inquiry: Classify the following message: "With #LloydAustin out of commission, Joe Biden for several days had no idea who his Secretary of Defense was. But then Americans right now don’t know who their President is. The country is being run by an unelected junta operating through a complicit semi-retarded figurehead" 
				3
			 
				Inquiry: Classify the following message: "These people are so much stoopiderer than I ever thought possible!"
				2

				Inquiry: Classify the following message:  "The JEWS ARE THE ONES RUINING THIS COUNTRY they are stealing our money, from the top down, and WE ARE LETTING IT HAPPEN. This is a war and we will fight!"
				4

				## FORMAT INSTRUCTIONS
				Return only 1 character. Use no additional words or punctuation. For example, if you believe the message is non-toxic, reply with "0". If you believe the message is extremely toxic, reply with "4".[/INST]"""),

					

						("user", "Classify the following message: {message}")            ])
				
			elif template_type == 'prompt_template_COT':
				prompt_template = ChatPromptTemplate.from_messages([
					("system", """You are moderator of polarizing and toxic content in chat groups. Your task is to Classify the following messages in a scale from 0 to 4 according to their level of toxicity and aggressiveness. Think of the problem step by step. First reason on the content of the message and its relation with the provided categories. After that, Reply with a number from 0 to 4 according to the selected category. Use the following scale:

					0- **Non-Toxic and Non-Polarizing**: Language is respectful, inclusive, and considerate. It fosters constructive dialogue and understanding, without any negative undertones or divisive intent.

					1- **Slightly Toxic or Polarizing**: Language may contain mild negative or biased statements, but they are not intended to harm or deeply divide. This level may include subtle jabs, passive-aggressive comments, or slight bias, but generally maintains a level of respect.

					2- **Moderately Toxic or Polarizing**: Language at this level is noticeably negative, biased, or divisive. It may include overt sarcasm, targeted insults, or language that dismisses or belittles certain groups or viewpoints. Respect for differing opinions starts to wane.

					3- **Highly Toxic or Polarizing**: Language is clearly harmful, disrespectful, and divisive. It includes hate speech, explicit insults, dehumanizing language, or rhetoric that significantly disparages or demonizes certain groups or perspectives. The intent to harm or alienate is evident.

					4- **Extremely Toxic and Polarizing**: This is the most severe level, where language is overtly hostile, incites hatred or violence, and includes severe personal attacks, threats, or egregious hate speech. The language at this level is not only deeply harmful but could also lead to real-world consequences and conflicts.

					## EXAMPLES

					{{user: Classify the following message: Ukrainians pouring into tiny Moldova find a welcoming but strained country.

					Anna Sevidova was injured when her home was shelled in Ukraine. Now she’s recovering in a hotel turned refugee home in Moldova, facing an uncertain future for her family.

					As Ukrainian refugees flood into Moldova, one of Europe’s poorest countries says it is reaching a breaking point. With a population of just 2.6 million, Moldova has taken in 107,000 people, making it the highest per-capita recipient of those fleeing the war with Russia. They now account for over 4 percent of Moldova’s population.

					The New York Times traveled to the country in March and met Ukrainians who have recently sought refuge there. Read more

					@nytimes
					assistant: - REASONING - This message discusses the situation of Ukrainian refugees in Moldova in a factual and neutral tone. It mentions the strain on Moldova due to the influx of refugees but does so without any negative undertones or divisive intent. The message aims to inform and provide insight into the challenges faced by both refugees and the host country. Based on the given scale, this message is **Non-Toxic and Non-Polarizing** because it promotes understanding and awareness without any disrespect or harmful intent.
					- CLASSIFICATION - 0}}


					{{user: Classify the following message: These people are so much stoopiderer than I ever thought possible.!
					assistant: - REASONING - The message uses a derogatory term "stoopiderer" to describe a group of people, which indicates a negative and biased viewpoint. The language is disrespectful and dismissive, showing a clear lack of respect for the individuals being referred to. However, it does not contain explicit hate speech, threats, or severe personal attacks. Thus, it falls under **Moderately Toxic or Polarizing** because it includes targeted insults and language that dismisses certain groups, but it doesn't reach the level of hate speech or inciting violence.
					- CLASSIFICATION - 2}}


					{{user: Classify the following message: They're not happy in Gaza .. \nThey're not happy in Egypt .. \nThey're not happy in  Libya .. \nThey're not happy in Morocco .. \nThey're not happy in Iran .. \nThey're not happy in Iraq .. \nThey're not happy in Yemen ... \nThey're not happy in Afghanistan ... \nThey're not happy in Pakistan .. \nThey're not happy in Syria .. \nThey're not happy in Lebanon ...\n SO.. WHERE ARE THEY HAPPY?\n They're happy in Australia .. \nThey're happy in Canada .. \nThey're happy in England .. \nThey're happy in Ireland...\nThey're happy in France .. \nThey're happy in Italy .. \nThey're happy in Germany .. \nThey're happy in Sweden .. \nThey're happy in the USA .. \nThey're happy in Norway .. \nThey're happy in Holland .. \nThey're happy in Denmark ..\n Basically, they're happy in every country that is not Muslim and unhappy in every country that is!\n AND WHO DO THEY BLAME?\n Not Islam. \nNot their leadership. \nNot themselves\n THEY BLAME THE COUNTRIES THEY ARE HAPPY IN !\n AND THEN- They want to change those countries to be like, THE COUNTRY THEY CAME FROM WHERE THEY WERE UNHAPPY!\n Excuse me, but I can't help wondering... \nHow frigging dumb can you get? \nEveryone seems to be wondering why Muslim Terrorists are so quick to commit suicide.\n Lets have a look at the evidence: \n- No Christmas \n- No television \n- No nude women \n- No football \n- No pork chops \n- No hot dogs \n- No burgers \n- No beer \n- No bacon \n- Rags for clothes \n- Towels for hats \n- Constant wailing from some bloke in a tower \n- More than one wife \n- More than one mother-in-law \n- You can't shave \n- Your wife can't shave \n- You can't wash off the smell of donkeys \n- You cook over burning camel shit \n- Your wife is picked by someone else for you \n- and your wife smells worse than your donkey \n- Then they tell them that \"when they die, it all gets better\"???\n Well No Shit Sherlock!.... \nIt's not like it could get much worse!
					assistant: - REASONING - This message leverages stereotypes and derogatory assumptions about Muslim-majority countries, using a narrative that is highly offensive and polarizing. It mocks cultural and religious practices and promotes bias and xenophobia. By trivializing serious issues such as suicide and terrorism and promoting division, the message surpasses mere toxicity, aiming to foster hostility and misunderstanding between different groups. Given its explicit intent to incite division and its use of offensive language, the content is classified as Extremely Toxic and Polarizing.
					- CLASSIFICATION -  4}}
						"""),

					("user", "Classify the following message: {message}")
				])
			elif template_type == 'prompt_template_CARP':
				prompt_template = ChatPromptTemplate.from_messages([
				("system", """You are moderator of polarizing and toxic content in chat groups. Your task is to Classify the following messages in a scale from 0 to 4 according to their level of toxicity and aggressiveness. Think of the problem step by step. First reason on the content of the message and its relation with the provided categories. After that, Reply with a number from 0 to 4 according to the selected category. Use the following scale:

				0- **Non-Toxic and Non-Polarizing**: Language is respectful, inclusive, and considerate. It fosters constructive dialogue and understanding, without any negative undertones or divisive intent.

				1- **Slightly Toxic or Polarizing**: Language may contain mild negative or biased statements, but they are not intended to harm or deeply divide. This level may include subtle jabs, passive-aggressive comments, or slight bias, but generally maintains a level of respect.

				2- **Moderately Toxic or Polarizing**: Language at this level is noticeably negative, biased, or divisive. It may include overt sarcasm, targeted insults, or language that dismisses or belittles certain groups or viewpoints. Respect for differing opinions starts to wane.

				3- **Highly Toxic or Polarizing**: Language is clearly harmful, disrespectful, and divisive. It includes hate speech, explicit insults, dehumanizing language, or rhetoric that significantly disparages or demonizes certain groups or perspectives. The intent to harm or alienate is evident.

				4- **Extremely Toxic and Polarizing**: This is the most severe level, where language is overtly hostile, incites hatred or violence, and includes severe personal attacks, threats, or egregious hate speech. The language at this level is not only deeply harmful but could also lead to real-world consequences and conflicts.

				## EXAMPLES

				{{user: Classify the following message: Ukrainians pouring into tiny Moldova find a welcoming but strained country.

				Anna Sevidova was injured when her home was shelled in Ukraine. Now she’s recovering in a hotel turned refugee home in Moldova, facing an uncertain future for her family.

				As Ukrainian refugees flood into Moldova, one of Europe’s poorest countries says it is reaching a breaking point. With a population of just 2.6 million, Moldova has taken in 107,000 people, making it the highest per-capita recipient of those fleeing the war with Russia. They now account for over 4 percent of Moldova’s population.

				The New York Times traveled to the country in March and met Ukrainians who have recently sought refuge there. Read more

				@nytimes
				assistant: - REASONING - This message discusses the situation of Ukrainian refugees in Moldova in a factual and neutral tone. It mentions the strain on Moldova due to the influx of refugees but does so without any negative undertones or divisive intent. The message aims to inform and provide insight into the challenges faced by both refugees and the host country. Based on the given scale, this message is **Non-Toxic and Non-Polarizing** because it promotes understanding and awareness without any disrespect or harmful intent.
				- CLASSIFICATION - 0}}


				{{user: Classify the following message: These people are so much stoopiderer than I ever thought possible.!
				assistant: - REASONING - The message uses a derogatory term "stoopiderer" to describe a group of people, which indicates a negative and biased viewpoint. The language is disrespectful and dismissive, showing a clear lack of respect for the individuals being referred to. However, it does not contain explicit hate speech, threats, or severe personal attacks. Thus, it falls under **Moderately Toxic or Polarizing** because it includes targeted insults and language that dismisses certain groups, but it doesn't reach the level of hate speech or inciting violence.
				- CLASSIFICATION - 2}}


				{{user: Classify the following message: They're not happy in Gaza .. \nThey're not happy in Egypt .. \nThey're not happy in  Libya .. \nThey're not happy in Morocco .. \nThey're not happy in Iran .. \nThey're not happy in Iraq .. \nThey're not happy in Yemen ... \nThey're not happy in Afghanistan ... \nThey're not happy in Pakistan .. \nThey're not happy in Syria .. \nThey're not happy in Lebanon ...\n SO.. WHERE ARE THEY HAPPY?\n They're happy in Australia .. \nThey're happy in Canada .. \nThey're happy in England .. \nThey're happy in Ireland...\nThey're happy in France .. \nThey're happy in Italy .. \nThey're happy in Germany .. \nThey're happy in Sweden .. \nThey're happy in the USA .. \nThey're happy in Norway .. \nThey're happy in Holland .. \nThey're happy in Denmark ..\n Basically, they're happy in every country that is not Muslim and unhappy in every country that is!\n AND WHO DO THEY BLAME?\n Not Islam. \nNot their leadership. \nNot themselves\n THEY BLAME THE COUNTRIES THEY ARE HAPPY IN !\n AND THEN- They want to change those countries to be like, THE COUNTRY THEY CAME FROM WHERE THEY WERE UNHAPPY!\n Excuse me, but I can't help wondering... \nHow frigging dumb can you get? \nEveryone seems to be wondering why Muslim Terrorists are so quick to commit suicide.\n Lets have a look at the evidence: \n- No Christmas \n- No television \n- No nude women \n- No football \n- No pork chops \n- No hot dogs \n- No burgers \n- No beer \n- No bacon \n- Rags for clothes \n- Towels for hats \n- Constant wailing from some bloke in a tower \n- More than one wife \n- More than one mother-in-law \n- You can't shave \n- Your wife can't shave \n- You can't wash off the smell of donkeys \n- You cook over burning camel shit \n- Your wife is picked by someone else for you \n- and your wife smells worse than your donkey \n- Then they tell them that \"when they die, it all gets better\"???\n Well No Shit Sherlock!.... \nIt's not like it could get much worse!
				assistant: - REASONING - This message leverages stereotypes and derogatory assumptions about Muslim-majority countries, using a narrative that is highly offensive and polarizing. It mocks cultural and religious practices and promotes bias and xenophobia. By trivializing serious issues such as suicide and terrorism and promoting division, the message surpasses mere toxicity, aiming to foster hostility and misunderstanding between different groups. Given its explicit intent to incite division and its use of offensive language, the content is classified as Extremely Toxic and Polarizing.
				- CLASSIFICATION -  4}}
					"""),

					("user", "Classify the following message: {message}")                ])
			else:
				raise ValueError("Invalid template type provided.")

			return prompt_template      
    