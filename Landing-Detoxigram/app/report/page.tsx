'use client'
import { Button } from "@/components/global/button";
import Link from "next/link";
import { motion } from "framer-motion";


export default function Home() {
    const variants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      };
    return (
              <section className="wrap-md w-full wrap-px pt-4 mx-auto">
                <motion.div
                  className="grid grid-cols-6 gap-4"
                  initial="hidden"
                  animate="visible"
                  variants={variants}
                  transition={{ duration: 0.5 }}
                >
                  {/* Div Número 6 */}
                  <motion.div className="col-span-6" variants={variants}>
                    <motion.div
                      className="flex flex-wrap gap-4 content-start bg-neutral-300/20 relative p-8 sm:p-12 border aspect-video md:aspect-[3/1] border-neutral-400/30 rounded-xl shadow-sm overflow-hidden"
                      variants={variants}
                    >
                      <div className="bg-[url('/bg-report.png')] bg-cover bg-center bg-no-repeat image-container absolute flex w-full h-full inset-y-0 bottom-0 items-center right-0 flex-1">
                        <span className="ml-10 w-3/5 block text-xl sm:text-4xl">Learn about our project</span>
                      </div>
                    </motion.div>
          
                    <motion.div className="col-span-6 mt-10" variants={variants}>
                      <div id="#Learned">
                        <motion.div
                          className="bg-[url('/learned.png')] bg-cover bg-center bg-no-repeat flex h-auto gap-4 content-start relative p-8 sm:p-12 border border-neutral-400/30 rounded-xl shadow-sm justify-center"
                          variants={variants}
                        >
                          <h2 className="w-full text-4xl text-center mb-0">What have we learned?</h2>
                        </motion.div>
                        <h2 className="w-full text-3xl text-justify mt-5 mb-5">What we learned about Toxicity</h2>
                        <h2 className="w-full text-2xl text-justify mt-5 mb-5 text-bold">How to define it</h2>
                        <div className="w-full text-xl text-justify mt-5 mb-5">
                          Inspired by previous literature (Zhixue et al., 2021; Ousidhoum et al., 2021; Fortuna et al., 2021), we characterized toxicity as a <span className="font-bold">range</span> of disrespectful and harmful user-generated content, <span className="font-bold">not as a binary element.</span> We measured toxicity using a scale that aligns with how individuals perceive and evaluate real messages on platforms like Telegram. This scale is categorized into five levels:<br /><br />
                          <span className="font-bold">🟢 Non-toxic:</span> Respectful and constructive. Does not contain personal attacks or offensive content.<br /><br />
                          <span className="font-bold">🟡 Slightly Toxic:</span> Although mostly respectful, it suggests a lack of appreciation for the viewpoints of others. It does not directly attack individuals or groups.<br /><br />
                          <span className="font-bold">🟠 Moderately Toxic: </span> Features a clearly disrespectful tone. Does not involve violent attacks.<br /><br />
                          <span className="font-bold">🔴 Highly Toxic:</span> Insulting and aggressive. Targets groups and individuals based on their gender, ethnicity, sexual orientation, ideology, or religion.<br /><br />
                          <span className="font-bold">🔴 Extremely Toxic:</span> In addition to the elements of highly toxic messages, this includes threats or calls to violent action.<br /><br />
          
In accordance with this definition, an <a href="/survey" className="underline">online survey</a> (N=300) was conducted with a sample of American participants, balanced by gender and political orientation (167 female, aged 40.69 ± 11.95 yr). The survey's primary objective was to assess individual perceptions of message toxicity within various Telegram channels. They were recruited through Prolific, an online research platform, and invited to complete the survey via SurveyMonkey. They were informed that their participation was completely voluntary and that they could withdraw their participation at any time without penalty.<br /><br />

Participants rated the toxicity of 30 messages (sourced from different Telegram channels) on the 5-point scale (0-4) mentioned before. Attention checks were incorporated to ensure data quality, and participants failing two or more of them were excluded from compensation. A £0.90 incentive was provided upon successful completion to encourage engagement and maintain data quality. We used the recollected data as ground truth for our classifier.

                        </div>
                        <h2 className="w-full text-2xl text-justify mt-5 mb-5 text-bold">Multiple attributes in toxicity</h2>
                        <p className="w-full text-xl text-justify mt-5 mb-5">
                          An observation that we took from the literature is that polarizing or toxic content has different attributes that we believe are key to understanding unhealthy online conversations (Price et al., 2020).<br /><br />
                          We believe that both detecting and communicating these attributes are crucial components of a toxicity classifier. To help build this classifier we used the <a href="https://github.com/conversationai/unhealthy-conversations" className="underline">UCC dataset</a>, a rich and annotated set of online comments. <br /><br />
                          Analyzing this dataset we realized some of the labeled attributes were similar and, as such, redundant.<br />
                          Using Principal Components Analysis we determined that the most important attributes to detect are: sarcasm, antagonism, generalization and dismissiveness.<br />
                        </p>
                        <h2 className="w-full text-2xl text-justify mt-5 mb-5 text-bold">How to communicate it</h2>
                        <p className="w-full text-xl text-justify mt-5 mb-5">
                          As far as we know, <span className="font-bold">there are no other toxicity classifiers that combine accurate and nuanced metrics with tailored and persuasive explanations of their classifications.</span> Moreover, they do not showcase to the user healthier alternatives of communication.
                        </p>
                      </div>
          
                      <h2 className="w-full text-3xl text-justify mt-5 mb-5">What we learned about the technology</h2>
                      <p className="w-full text-xl text-justify mt-5 mb-5">
                        In our literature overview of existing toxicity detection models, we came to the conclusion that there are different technologies that have proven accurate for the task. The two main ones are outlined below.<br /><br />
                        When prompted effectively, generative LLMs are accurate classifiers for nuanced language tasks and can generate persuasive messages. However, they can be quite expensive, slow and memory intensive. <br /><br />
                        On the other hand, BERT models are often cheap to train and deploy and accurate, but they may struggle with nuanced classifications.<br /><br />
                        We concluded that leveraging these two classification tools can yield great results. We propose a classification pipeline that  integrates these classifiers with the Telegram API to develop agents that interact smoothly with users. This setup makes it easy to fetch messages from public Telegram channels while preserving user privacy, as we do not know who sent the messages.<br />
                      </p>
          
                      <div>
                        <h2 className="w-full text-2xl text-justify mt-5 mb-5 text-bold">Choosing the right generative LLM</h2>
                        <p className="w-full text-xl text-justify mt-5 mb-5">
                      When choosing the right LLM for our project, we had many different angles to consider. First of all, as we wanted both the liberty to fine-tune the chosen model and the option to run inference of the LLM locally, we focused our search on small and effective open-source models. That being said, we had different tasks we needed the chosen LLM to excel at.<br />
                      As we have stated before, in Detoxigram we use LLMs for different tasks.<br />
                      For both explaining toxicity and detoxifying messages, we needed a model that is both efficient and easily adaptable to our specific problem. We believe Llama 3, as an open-source, efficient, small model, is perfect for our needs. There is also a very important factor to consider: when detoxifying messages, under no circumstances do we want to be accidentally generating hate speech ourselves. The emphasis Meta has put on ensuring Llama 3 is a relatively safe model, including the published resources for developers, has been an important factor when deciding to use this LLM for our project.<br />
                      Moreover, the choice of an open-source model like Llama 3 aligns with our project's spirit of transparency and collaboration. Open-source models provide us with the flexibility to deeply understand the model architecture and make necessary adjustments that proprietary models might not allow. This is particularly important for us as we want to ensure our solution is robust and tailored to the nuances of Rioplatense Spanish.<br />
                      </p>
                      </div>
          
                      <div id="#Build">
                        <div className="bg-[url('/build.png')] bg-cover bg-center bg-no-repeat flex h-auto gap-4 content-start relative p-8 sm:p-12 border border-neutral-400/30 rounded-xl shadow-sm justify-center">
                          <h2 className="w-full text-4xl text-center mb-0">What have we built?</h2>
                        </div>
                        <div className="w-full text-xl text-justify mt-5 mb-5">
                          We have built <a href="https://t.me/DetoxigramBot" className="text-red-600 font-bold underline">Detoxigram</a>, a tool that analyzes toxicity in text channels, explains its decisions and detoxifies messages with the goal of reducing negative interactions and promoting constructive dialogue. As far as we know, Detoxigram is the first ever toxicity classifier that also accurately explains its classifications. Detoxigram both classifies tele  gram channels and provides metrics with tailored explanations of its classification. <br /><br />
                          In order to achieve this, we proposed a toxicity-detection pipeline that combines generative LLMs and BERT to exploit their strengths efficiently.<br /><br />
                          We decided to use the BERT-based classifiers for two different tasks:<br />
                          <ul className="list-disc list-inside text-xl leading-relaxed">
                            <li className="mt-4 mb-4">Coarse-grained toxicity detection of Telegram messages.</li>
                            <li className="mt-4 mb-4">Detecting unhealthy-speech attributes of the Telegram messages.</li>
                          </ul>
                          The purpose of the first task is to minimize the volume of messages being inputted into the LLM. By choosing to input to the LLM only those messages deemed the most toxic by our BERT classifier, we are able to explain the toxicity of a telegram channel through a low resource approach without sacrificing nuance. For this task, we used a pre-trained BERT classifier, trained on the <a href="https://github.com/microsoft/TOXIGEN" className="underline">Toxigen dataset.</a><br /><br />
                          The purpose of the second task is to accurately demonstrate to users the various dimensions of unhealthy speech that a channel might exhibit. By providing specific information about the different dimensions of toxicity in Telegram messages, users can make more confident and informed decisions about the content they consume. For this task we trained a BERT-based classifier using the dataset mentioned in the previous section. <br /><br />
                          We decided to use generative LLMs for the following tasks:<br />
                          <ul className="list-disc list-inside text-xl leading-relaxed">
                            <li className="mt-4 mb-4">Fine-grained toxicity detection of telegram messages.</li>
                            <li className="mt-4 mb-4">Explaining to the user the reasons behind each classification.</li>
                            <li className="mt-4 mb-4">Detoxifying toxic messages.</li>
                          </ul>
                          The Detoxigram classification pipeline can then be outlined through the following steps:<br /><br />
                          <ul className="list-decimal list-inside text-xl leading-relaxed">
                            <li className= "ml-4">We extract the last 50 messages of a given Telegram channel.<br /><br /></li>
                            <li className= "ml-4">We classify these messages using a BERT-based toxicity classifier.<br /><br /></li>
                            <li className= "ml-4">We then take the 10 most toxic messages from the previous step and we again classify them using a generative LLM. This ensures we accurately portray the toxicity of the Telegram channel. <br /><br /></li>
                            <li className= "ml-4">Finally we prompt the generative LLM to produce a short text explaining the classification of the Telegram channel, and we use the second BERT-based classifier to detect the toxicity attributes of the channel. <br /><br /></li>
                          </ul>
                          <img src="/Pipeline.png" className="w-full mt-5 mb-5" />
                          <p className="bg-red-600 text-white w-fit text-xl">You can check our <a href="https://github.com/LIA-DiTella/Detoxigram" className="underline text-white font-bold">code here.</a></p>
                        </div>
                      </div>
          
                      <h2 className="w-full text-2xl text-justify mt-5 mb-5 text-bold">What can users do with Detoxigram?</h2>
                      <div className="w-full text-xl text-justify mt-5 mb-5">
                        Telegram users who use Detoxigram have the following tools at their disposal to manage and understand toxicity in their conversations: <br /> <br />
                        <span className="font-bold">Analyze a Channel:</span> users can use Detoxigram to analyze the toxicity level of any public Telegram channel. By simply inputting the channel name, our tool will scan and evaluate recent messages to provide a classification. This helps users understand the general tone and health of the conversations within the channel. <br />
                        <div className="flex justify-center items-center">
                          <img src="/analyze_ex.png" className="w-1/2 mt-5 mb-5" />
                        </div>
                        <span className="font-bold">Understand Why It Is Toxic:</span> Detoxigram not only identifies toxic messages but also provides detailed explanations for each classification. This feature helps users understand the reasons behind the toxicity ratings, offering insights into the specific elements and language that contribute to harmful interactions, while also explaining the consequences for the user.<br />
                        <div className="flex justify-center items-center">
                          <img src="/explanation.png" className="w-4/6 mt-5 mb-5" />
                        </div>
                        <span className="font-bold">Visualize the Dimensions of Toxicity:</span> Our tool categorizes toxicity into various dimensions, such as sarcasm, antagonism, generalization, and dismissiveness. Users will be able to visualize these dimensions to get a nuanced view of how toxicity manifests in different forms.<br />
                        <div className="flex justify-center items-center">
                          <img src="/dimensions.png" className="w-4/6 mt-5 mb-5" />
                        </div>
                        <span className="font-bold">Detoxify Their Own Messages:</span> Detoxigram also offers a unique feature that allows users to detoxify their own messages before posting them. By running their text through our tool, they can receive suggestions on how to rephrase or adjust their message to avoid potential toxicity. This proactive approach helps users to communicate more effectively and constructively, fostering healthier interactions.<br />
                        <div className="flex justify-center items-center">
                          <img src="/detoxify_ex.png" className="w-4/6 mt-5 mb-5" />
                        </div>
                      </div>
          
                      <h2 className="w-full text-2xl text-justify mt-5 mb-5 font-bold">Main advantages of Detoxigram</h2>
                      <div className="w-full text-xl text-justify mt-5 mb-5">
                        <div className="underline mb-2">Tailored and persuasive explanation</div>
                        Detoxigram is able to provide an explanation of why the channel was classified with a certain level of toxicity, a summary of the main topics discussed in the channel, and a brief overview of the potential consequences for the user engaging with such content.<br /><br />
                        <div className="underline mt-1 mb-2">Costs</div>
                        By using a BERT classifier to reduce the number of messages classified by our generative LLM, we reduce in 5 the amount of calls done to the API of the chosen LLM. We calculated these values and concluded that the cost of analyzing a channel using our pipeline is, on average, $0.0017 USD.<br /><br />
                        <div className="underline mt-1 mb-2">Low energy consumption</div>
                        By leveraging a BERT model and a generative LLM, we ensure that our pipeline is not as resource intensive as it would be when only using a generative LLM. The BERT model we use has  only 110 million parameters. A relatively small generative LLM (for example, LLaMA 7B) has 60 times more parameters.<br /><br />
                        <div className="underline mt-1 mb-2">Behavioral design based UX</div>
                        As a telegram bot, Detoxigram is seamlessly integrated to the interface the users employ on a daily basis. It requires no downloads or installations. <br /><br />
                        Information is provided to the user gradually according to its requests. Our classifications are communicated in combination with an intuitive color code that works as a “traffic light” that synthesizes the classification. <br /><br />
                        Toxicity Dimensions are shown with an image that is coordinated with the color code matching the overall classification of the channel. <br /><br />
                        <div className="underline mt-1 mb-2">Open Source</div>
                        Developed with open source technology, Detoxigram doesn’t have third parties dependency and provides greater modular flexibility for further developments and updates. <br /><br />
                      </div>
                      <div id="#Future">
                        <div className="bg-[url('/future.png')] bg-cover bg-center bg-no-repeat flex h-auto gap-4 content-start relative p-8 sm:p-12 border border-neutral-400/30 rounded-xl shadow-sm justify-center">
                          <h2 className="w-full text-4xl text-center mb-0">What are our plans for the future?</h2>
                        </div>
                        <div className="w-full text-xl text-justify mt-5 mb-5">
                        <ul className="list-disc list-inside text-xl leading-relaxed">
    <li><span className="font-bold">Twitter Analyzer (Live beta):</span> We've developed a real-time Twitter data analysis tool that provides detailed insights into the level of toxicity in a user's content. This helps to understand the implications of the content we consume in a very engaging way.</li> <br />
    <li><span className="font-bold">Twitter Bot Integration:</span> We aim to create a bot seamlessly integrated into Twitter, providing users with an intuitive way to interact with our platform, perform various tasks, and receive personalized recommendations on the content they consume.</li><br />
    <li><span className="font-bold">Fine-tuning of an LLM:</span> To enhance the performance of our toxicity detection models, we're exploring the fine-tuning of a smaller LLM specifically for classification tasks in the context of text toxicity, aiming to achieve greater accuracy and efficiency.</li><br />
    <li><span className="font-bold">Scalability Enhancements:</span> Recognizing the growing demand for our services, we're committed to scaling our infrastructure to support thousands of concurrent users. This involves optimizing our code, deploying load balancers, and leveraging cloud-based services to ensure high availability and performance.</li><br />
    <li><span className="font-bold">Expanding to WhatsApp:</span> In addition to Twitter, we're considering deploying our functionalities into WhatsApp, enabling users to access our services more conveniently through a widely used messaging platform.</li><br />
    <li><span className="font-bold">Explore improving the performance of the LLM classifier:</span> To enhance the performance of our toxicity detection models, we're exploring the fine-tuning of a smaller LLM specifically for classification tasks in the context of text toxicity, aiming to achieve greater accuracy and efficiency.</li><br />
    <li><span className="font-bold">API Development: </span>Detoxigram API will empower developers to integrate our toxicity detection and moderation capabilities into their own applications.</li><br />
</ul>
                    </div>
                    </div>
                    <div id="#Referencias">
                    <div className="bg-[url('/referencias.png')] bg-cover bg-center bg-no-repeat flex h-auto gap-4 content-start relative p-8 sm:p-12 border border-neutral-400/30 rounded-xl shadow-sm justify-center">
                    <h2 className="w-full text-4xl text-center mb-0">References</h2>
                    </div>                    
                    <div className="w-full text-lg leading-relaxed mt-5 mb-5">
    <ol className="list-disc list-inside text-xl">
        <li className="mt-4 mb-4">Nedjma Ousidhoum, Xinran Zhao, Tianqing Fang, Yangqiu Song, and Dit-Yan Yeung. 2021. <a href="https://aclanthology.org/2021.acl-long.329" className="underline">Probing Toxic Content in Large Pre-Trained Language Models.</a> In Proceedings of the 59th Annual Meeting of the Association for Computational Linguistics and the 11th International Joint Conference on Natural Language Processing (Volume 1: Long Papers), pages 4262–4274, Online. Association for Computational Linguistics.</li>
        <li className="mt-4 mb-4">Paula Fortuna, Juan Soler-Company, Leo Wanner. <a href="https://doi.org/10.1016/j.ipm.2021.102524" className="underline">How well do hate speech, toxicity, abusive and offensive language classification models generalize across datasets?</a> 2021. Information Processing & Management, Volume 58, Issue 3, ISSN 0306-4573.</li>
        <li className="mt-4 mb-4">Ilan Price, Jordan Gifford-Moore, Jory Flemming, Saul Musker, Maayan Roichman, Guillaume Sylvain, Nithum Thain, Lucas Dixon, and Jeffrey Sorensen. 2020. <a href="https://aclanthology.org/2020.alw-1.15" className="underline">Six Attributes of Unhealthy Conversations. In Proceedings of the Fourth Workshop on Online Abuse and Harms</a>, pages 114–124, Online. Association for Computational Linguistics.</li>
        <li className="mt-4 mb-4">Zhixue Zhao, Ziqi Zhang, and Frank Hopfgartner. 2021. <a href="https://eprints.whiterose.ac.uk/173371/1/A_Comparative_Study_of_Using_Pre_trained_Language_Models_forToxic_Comment_Classification.pdf" className="underline">A Comparative Study of Using Pre-trained Language Models for Toxic Comment Classification.</a> In Companion Proceedings of the Web Conference 2021.</li>
        <li className="mt-4 mb-4">Hartvigsen, T., Gabriel, S., Palangi, H., Sap, M., Ray, D., & Kamar, E. (2022). <a href="https://arxiv.org/abs/2203.09509" className="underline">Toxigen: A large-scale machine-generated dataset for adversarial and implicit hate speech detection.</a> arXiv preprint arXiv:2203.09509.</li>
    </ol>
</div>
                    <Button className="bg-red-600 hover:bg-red-700" link= "/Detoxigram_Report.pdf" target="_blank">
Dowload report                    </Button>
</div>
                    </motion.div>
                  </motion.div>
                </motion.div>
              </section>
            );
          }
          

