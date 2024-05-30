import { Button } from "@/components/global/button";
import Link from "next/link";
import { motion } from "framer-motion";


export default function Home() {
    return (
        <section className="wrap-md w-full wrap-px pt-4 mx-auto">
            <div className="grid grid-cols-6 gap-4">
                {/* Div Número 6 */}
                <div className="col-span-6">
                    <div className="flex flex-wrap gap-4 content-start bg-neutral-300/20 relative p-8 sm:p-12 border aspect-video md:aspect-[3/1] border-neutral-400/30 rounded-xl shadow-sm overflow-hidden">
                        <div className="bg-[url('/bg-report.png')] bg-cover bg-center bg-no-repeat image-container absolute flex w-full h-full inset-y-0 bottom-0 items-center  right-0 flex-1">
                        <span className="ml-10 w-3/5 block text-xl sm:text-4xl">Learn about our project</span>
                        </div>
                    </div>
                
                <div className="col-span-6 mt-10">
                    <div id="#Build">
                    <div className="bg-[url('/learned.png')] bg-cover bg-center bg-no-repeat flex h-auto gap-4 content-start relative p-8 sm:p-12 border border-neutral-400/30 rounded-xl shadow-sm justify-center">
                    <h2 className="w-full text-4xl text-center mb-0">What have we learned?</h2>
                    </div>
                    <h2 className="w-full text-3xl text-justify mt-5 mb-5">What we learned about Toxicity</h2>
                    <h2 className="w-full text-2xl text-justify mt-5 mb-5 text-bold">How to define it</h2>
                    <div className="w-full text-xl text-justify mt-5 mb-5">
Inspired by previous literature (Zhixue et al., 2021; Ousidhoum et al., 2021; Fortuna et al., 2021), we characterize toxicity as a range of disrespectful and harmful user-generated content, which includes but is not limited to hate speech and abusive language. Historically, this type of content was treated as a binary classification issue, with research focused on distinguishing one form of toxicity from another. However, recent research treats this issue with greater complexity, employing multi-class classifications that assign comments to various toxic categories, or multi-label classifications that allow comments to be categorized across multiple, or potentially no, toxic categories. <br /><br />

We measured toxicity using a scale that aligns with how individuals perceive and evaluate real messages on platforms like Telegram. This scale is categorized into five levels:<br /><br />
<ul className="list-disc list-inside text-xl leading-relaxed">
<li className="font-bold">🟢 Non-toxic:</li>
Respectful and constructive.<br />
Does not contain personal disqualifications or offensive content.
<li className="font-bold">🟡 Slightly Toxic:</li>
Although mostly respectful, it suggests a lack of appreciation for the viewpoint of others.<br />
It does not directly attack individuals or groups.
<li className="font-bold">🟠 Moderately Toxic:</li>
Disrespectful tone.<br />
It does not attack violently.
<li className="font-bold">🔴 Highly Toxic:</li>
Insulting and aggressive.<br />
Targets groups and individuals based on their gender, ethnicity, sexual orientation, ideology, or religion.
<li className="font-bold">🔴 Extremely Toxic:</li>
Highly toxic and contains threats or calls to violent action.
</ul> <br />
To validate this definition, we conducted an <span className="font-bold">online survey with a sample of N=300 Americans</span> that was balanced in terms of gender and political orientation. <a href="/survey" className="underline">This survey</a> was then used as ground truth for our classifier.
</div>
<h2 className="w-full text-2xl text-justify mt-5 mb-5 text-bold">Online toxicity as a Non-Binary Element</h2>
                    <p className="w-full text-xl text-justify mt-5 mb-5">An observation that we took from the literature is that polarizing or toxic content has different attributes that we believe are key to understanding unhealthy online conversations (Price et al., 2020).<br /><br />

We believe that both detecting and communicating these attributes is a key component of a toxicity classifier. For these tasks we used the <a href="https://github.com/conversationai/unhealthy-conversations" className="underline">UCC dataset</a>, a rich and annotated set of online comments. <br /><br />

Analyzing this dataset we realized some of the labeled attributes were similar and, as such, redundant. Using Principal Components Analysis we determined that the most important attributes to detect are: sarcasm, antagonism, generalization and dismissiveness.<br />
</p>
<h2 className="w-full text-2xl text-justify mt-5 mb-5 text-bold">How to communicate it</h2>
                    <p className="w-full text-xl text-justify mt-5 mb-5">As far as we know, <span className="font-bold">there are no other toxicity classifiers that combine accurate and nuanced metrics with tailored and persuasive explanations of their classifications.</span> Moreover, they do not showcase to the user healthier alternatives of communication.</p>
                    </div>
                    <h2 className="w-full text-3xl text-justify mt-5 mb-5">What we learned about the technology</h2>
                    <p className="w-full text-xl text-justify mt-5 mb-5">In our literature overview of existing toxicity detection models, we came to the conclusion that there are different technologies that have proven accurate for the task. The two main ones are outlined below.<br /><br />

When prompted effectively, generative LLMs are accurate classifiers for nuanced language tasks and can generate persuasive messages. However, they can be quite expensive, slow and can generate hallucinations. <br /><br />

On the other hand, BERT models are often cheap to train and deploy and accurate, but they may struggle with nuanced classifications.<br /><br />

We concluded that leveraging these two classification tools can yield great results. We propose a classification pipeline that  integrates these classifiers with the Telegram API to develop agents that interact smoothly with users. This setup makes it easy to fetch messages from public Telegram channels while preserving user privacy, as we do not know who sent the messages.<br />
</p>
<div>
<h2 className="w-full text-2xl text-justify mt-5 mb-5 text-bold">Choosing the right generative LLM</h2>
<p className="w-full text-xl text-justify mt-5 mb-5">The first question we had to answer when choosing the generative LLM to use for this project was: Are we aiming to deploy a full model for this project, or do we prefer using external companies, such as OpenAI, Anthropic or MistralAI, that would provide this service? <br /><br />

We explored using very efficient implementations of LLMs, namely <a href="https://github.com/ggerganov/llama.cpp" className="underline">llama.cpp.</a> This tool allows us to run inference of LLMs on CPU, reducing costs of deployment. <span className="font-bold">We have not discarded this option but we decided, for the time being, to go in a different direction. Since we are building a Minimum Viable Product (MVP)</span>, we decided it wasn’t worth investing so many resources in running our own model locally yet.<br /><br />

That being said, we needed to choose a high-quality, open-source LLM accessible via an API. To keep the energy cost of our pipeline low, we restricted our search to relatively small LLMs. 
We decided to use Mixtral of Experts (JIANG, Albert Q., et al. Mixtral of experts. 2024), an LLM from Mistral AI, which we found to be the best option with respect to cost and performance trade-offs. Choosing this model also allows us to potentially fine-tune it or deploy it locally if we ever decide to.<br /><br /></p>

</div>
                    <div id="#Lessons">
                    <div className="bg-[url('/build.png')] bg-cover bg-center bg-no-repeat flex h-auto gap-4 content-start relative p-8 sm:p-12 border border-neutral-400/30 rounded-xl shadow-sm justify-center">
                    <h2 className="w-full text-4xl text-center mb-0">What have we built?</h2>
                    </div>
                    <div className="w-full text-xl text-justify mt-5 mb-5">We have built <a href="https://t.me/DetoxigramBot" className="text-red-600 font-bold underline">Detoxigram</a>, a tool that analyzes toxicity in text channels, explains its decisions and detoxifies messages with the goal of reducing negative interactions and promoting constructive dialogue. <br /><br />

In order to achieve this, we proposed a toxicity-detection pipeline that combines generative LLMs and BERT to exploit their strengths efficiently.<br /><br />

We decided to use the BERT-based classifiers for two different tasks:<br /><br />
<ul className="list-disc list-inside text-xl leading-relaxed">
    <li className="mt-4 mb-4">Coarse-grained toxicity detection of Telegram messages.</li>
    <li className="mt-4 mb-4">Detecting unhealthy-speech attributes of the Telegram messages.</li>
</ul> <br /> 

The purpose of the first task is to minimize the volume of messages being inputted into the LLM. By choosing to input to the LLM only those messages deemed the most toxic by our BERT classifier, we are able to explain the toxicity of a telegram channel through a low resource approach without sacrificing nuance. For this task, we used a pre-trained BERT classifier, trained on the <a href="https://github.com/microsoft/TOXIGEN" className="underline">Toxigen dataset.</a><br /><br />

The purpose of the second task is to accurately demonstrate to users the various dimensions of unhealthy speech that a channel might exhibit. By providing specific information about the different dimensions of toxicity in Telegram messages, users can make more confident and informed decisions about the content they consume. For this task we trained a BERT-based classifier using the dataset mentioned in the previous section. <br /><br />

We decided to use generative LLMs for the following tasks:<br />

<ul className="list-disc list-inside text-xl leading-relaxed">
    <li className="mt-4 mb-4">Fine-grained toxicity detection of telegram messages.</li>
    <li className="mt-4 mb-4">Explaining to the user the reasons behind each classification.</li>
    <li className="mt-4 mb-4">Detoxifying toxic messages.</li>
</ul> <br /> 

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
<h2 className="w-full text-2xl text-justify mt-5 mb-5 font-bold">Main advantages of Detoxigram</h2>
<div className="w-full text-xl text-justify mt-5 mb-5"><div className="underline mb-2">Tailored and persuasive explanation</div>
Detoxigram is able to provide an explanation of why the channel was classified with a certain level of toxicity, a summary of the main topics discussed in the channel, and a brief overview of the potential consequences for the user engaging with such content.<br /><br />
<div className="underline mt-1 mb-2">Costs</div>
By using a BERT classifier to reduce the number of messages classified by our generative LLM, we reduce in 5 the amount of calls done to the API of the chosen LLM. We calculated these values and concluded that the price of analyzing a channel using our pipeline is, on average, $0.0017 USD.<br /><br />
<div className="underline mt-1 mb-2">Low energy consumption</div>
In a similar vein to the previous item, by leveraging a BERT model and a generative LLM we ensure that our pipeline is not as resource intensive as it would be when only using a generative LLM. The BERT model we use has  only 110 million parameters.  A relatively small generative LLM (for example, LLaMA 7B) has 60 times more parameters.<br /><br />
<div className="underline mt-1 mb-2">Behavioral design based UX</div>
As a telegram bot, Detoxigram is seamlessly integrated to the interface the users employ on a daily basis. It requires no downloads or installations. <br /><br />

Information is provided to the user gradually according to its requests. Our classifications are communicated in combination with an intuitive color code that works as a “traffic light” that synthesizes the classification. <br /><br />

Toxicity Dimensions are shown with an image that is coordinated with the color code matching the overall classification of the channel. <br /><br />
<div className="underline mt-1 mb-2">Open Source</div>

Developed with open source technology, Detoxigram doesn’t have third parties dependency and provides greater modular flexibility for further developments and updates. <br /><br />
</div>


                    </div>
                    <div id="#Future">
                    <div className="bg-[url('/future.png')] bg-cover bg-center bg-no-repeat flex h-auto gap-4 content-start relative p-8 sm:p-12 border border-neutral-400/30 rounded-xl shadow-sm justify-center">
                    <h2 className="w-full text-4xl text-center mb-0">What are our plans for the future?</h2>
                    </div>                                  
                    <div className="w-full text-xl text-justify mt-5 mb-5">
    <ul className="list-disc list-inside text-xl leading-relaxed">
        <li className="mt-4 mb-4"><span className="font-bold">Twitter Analyzer (Live beta):</span> We've developed a real-time Twitter data analysis tool that provides detailed insights into the level of toxicity in a user's content. This helps to understand the implications of the content we consume in a very engaging way.</li>
        <li className="mt-4 mb-4"><span className="font-bold">Twitter Bot Integration:</span> We aim to create a Twitter bot seamlessly integrated into X, providing users with an intuitive way to interact with our platform, perform various tasks, and receive personalized recommendations on the content they consume.</li>
        <li className="mt-4 mb-4"><span className="font-bold">Fine-tuning of an LLM:</span> To enhance the performance of our toxicity detection models, we're exploring the fine-tuning of a smaller LLM specifically for classification tasks in the context of text toxicity, aiming to achieve greater accuracy and efficiency.</li>
        <li className="mt-4 mb-4"><span className="font-bold">Scalability Enhancements:</span> Recognizing the growing demand for our services, we're committed to scaling our infrastructure to support thousands of concurrent users. This involves optimizing our code, deploying load balancers, and leveraging cloud-based services to ensure high availability and performance.</li>
        <li className="mt-4 mb-4"><span className="font-bold">Expanding to WhatsApp:</span> In addition to Twitter, we're considering deploying our functionalities into WhatsApp, enabling users to access our services more conveniently through a widely used messaging platform.</li>
        <li className="mt-4 mb-4"><span className="font-bold">Explore improving the performance of the LLM classifier:</span> To enhance the performance of our toxicity detection models, we're exploring the fine-tuning of a smaller LLM specifically for classification tasks in the context of text toxicity, aiming to achieve greater accuracy and efficiency.</li>
        <li className="mt-4 mb-4"><span className="font-bold">API Development:</span> Detoxigram API will empower developers to integrate our toxicity detection and moderation capabilities into their own applications.</li>
    </ul>
</div>
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
        <li className="mt-4 mb-4"> Jiang, A. Q., Sablayrolles, A., Roux, A., Mensch, A., Savary, B., Bamford, C., ... & Sayed, W. E. (2024). <a href="https://arxiv.org/abs/2202.12345" className="underline">Mixtral of Experts.</a> arXiv preprint arXiv:2202.12345.</li>
        <li className="mt-4 mb-4">Hartvigsen, T., Gabriel, S., Palangi, H., Sap, M., Ray, D., & Kamar, E. (2022). <a href="https://arxiv.org/abs/2203.09509" className="underline">Toxigen: A large-scale machine-generated dataset for adversarial and implicit hate speech detection.</a> arXiv preprint arXiv:2203.09509.</li>
    </ol>
</div>
                    </div>
                </div>
            </div>
        </section>
    );
}

