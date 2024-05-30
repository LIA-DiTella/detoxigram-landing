import Image from "next/image"; 

export default function Home() {
    return (
        <section className="wrap-md w-full wrap-px pt-4 mx-auto">
            <div className="grid grid-cols-6 gap-4">
                {/* Titular de la survey */}
                <div className="col-span-6">
                    <div className="flex flex-wrap gap-4 content-start bg-[url('/bg-survey.png')] bg-cover bg-center bg-no-repeat relative p-8 sm:p-12 border aspect-video md:aspect-[3/1] border-neutral-400/30 rounded-xl shadow-sm overflow-hidden">
                        <div className="absolute flex w-full h-full inset-y-0 bottom-0 items-center right-0 flex-1">
                            <span className="ml-10 w-3/6 block text-xl sm:text-4xl">Identifying Toxic discourse on Telegram Chats</span>
                        </div>
                    </div>
                </div>

                {/* Intro Text */}
                <div className="col-span-6">
                        <p className= "w-full text-xl text-justify mt-5 mb-5">
                        This survey aims to gain a deeper understanding of how individuals perceive and react to toxic content on Telegram. By engaging a diverse and balanced sample of 300 Americans, we sought to capture a broad spectrum of opinions and insights. The data collected serves as a crucial foundation for refining our toxicity classifier, ensuring it aligns with real-world perceptions and effectively identifies and explains toxic interactions in digital communication.
                        </p>
                        <p className= "w-full text-xl text-justify mt-5 mb-5">
                        The survey sample consisted of a diverse group of 300 participants balanced in terms of gender and political orientation. The age distribution ranged from 18 to over 65 years old, with the majority of respondents falling into the 25-34 and 35-44 age brackets. In terms of gender, the sample included a mix of men, women, non-binary individuals, and a few who preferred not to specify their gender. The political affiliation of respondents varied widely, encompassing Democrats, Republicans, Independents, and those identifying with other or unspecified political orientations.
</p>
                </div>

                {/* Graphs Section */}
                <div className="col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-10 sm:p-8 border border-neutral-400/30 rounded-xl shadow-sm flex justify-center">
                        <iframe 
                            src='https://flo.uri.sh/visualisation/18158523/embed'
                            title='CAMBIAR' 
                            className='flourish-embed-iframe' 
                            frameBorder='0' 
                            scrolling='no' 
                            style={{ width: '75%', height: '450px' }} 
                            sandbox='allow-same-origin allow-forms allow-scripts allow-downloads allow-popups allow-popups-to-escape-sandbox allow-top-navigation-by-user-activation'
                        ></iframe>
                    </div>
                    
                    <div className="p-10 sm:p-8 border border-neutral-400/30 rounded-xl shadow-sm flex justify-center">
                        <iframe 
                            src='https://flo.uri.sh/visualisation/18175928/embed'
                            title='CAMBIAR' 
                            className='flourish-embed-iframe' 
                            frameBorder='0' 
                            scrolling='no' 
                            style={{ width: '75%', height: '450px' }} 
                            sandbox='allow-same-origin allow-forms allow-scripts allow-downloads allow-popups allow-popups-to-escape-sandbox allow-top-navigation-by-user-activation'
                        ></iframe>
                    </div>

                    <div className="p-10 sm:p-8 border border-neutral-400/30 rounded-xl shadow-sm flex justify-center">
                        <iframe 
                            src='https://flo.uri.sh/visualisation/18175979/embed' 
                            title='CAMBIAR' 
                            className='flourish-embed-iframe' 
                            frameBorder='0' 
                            scrolling='no' 
                            style={{ width: '75%', height: '450px' }} 
                            sandbox='allow-same-origin allow-forms allow-scripts allow-downloads allow-popups allow-popups-to-escape-sandbox allow-top-navigation-by-user-activation'
                        ></iframe>
                    </div>

                    <div className="p-10 sm:p-8 border border-neutral-400/30 rounded-xl shadow-sm flex justify-center">
                        <iframe 
                            src='https://flo.uri.sh/visualisation/18176006/embed' 
                            title='CAMBIAR' 
                            className='flourish-embed-iframe' 
                            frameBorder='0' 
                            scrolling='no' 
                            style={{ width: '75%', height: '450px' }} 
                            sandbox='allow-same-origin allow-forms allow-scripts allow-downloads allow-popups allow-popups-to-escape-sandbox allow-top-navigation-by-user-activation'
                        ></iframe>
                    </div>
                </div>

                {/* Analysis Text */}
                <div className="col-span-6">
                        <p className= "w-full text-xl mt-5 mb-5 text-justify">
                        The core of the survey focused on participants' classification of online messages based on their perceived toxicity. Respondents were presented with a series of messages (30 messages) and asked to rate each one on a predefined toxicity scale: Non-toxic, Slightly Toxic, Moderately Toxic, Highly Toxic, and Extremely Toxic. The messages varied in content and tone, they were selected to capture a range of potentially toxic behaviors including disrespect, hostility, and aggression. For each message, participants provided their assessment, which helped us gather subjective evaluations of message toxicity. <br /><br />This approach allowed us to collect nuanced data on how different types of toxic content are perceived by a diverse group of individuals. The collected ratings were then used to validate our toxicity classifier, ensuring that it accurately reflects the varied perceptions of toxicity in online communication.
                        </p>
                        <p className= "w-full text-xl text-justify mt-5 mb-5">
                        The following series of graphs provides a detailed analysis of the survey responses. These visualizations illustrate the distribution of toxicity ratings across different messages, highlighting patterns in how respondents perceive various levels of toxicity.</p>
                </div>

                {/* Detailed Analysis Graphs */}
                <div className="col-span-6 grid grid-cols-1 gap-4">
                    <div className="bg-neutral-300/20 p-8 sm:p-0 border border-neutral-400/30 rounded-xl shadow-sm">
                        <p className="mb-5 mt-2 text-center"> <span className="font-bold">Message:</span>
                        "Exactly the reason my 5.56 and 7.62 and 9mm will never be given up. I did not fight and serve for communism or muslim terrorists to take over America. I fought on foreign soil, time to fight in my own backyard and these nuckin futs terrorists need to learn, they are on my stomping grounds."
                        </p>
                        <div className="flex justify-center">
                        <iframe 
                            src='https://flo.uri.sh/visualisation/18176640/embed' 
                            title='CAMBIAR' 
                            className='flourish-embed-iframe' 
                            frameBorder='0' 
                            scrolling='no' 
                            style={{ width: '60%', height: '360px' }} 
                            sandbox='allow-same-origin allow-forms allow-scripts allow-downloads allow-popups allow-popups-to-escape-sandbox allow-top-navigation-by-user-activation'
                        ></iframe>
                        </div>
                    </div>

                    <div className="bg-neutral-300/20 p-8 sm:p-0 border border-neutral-400/30 rounded-xl shadow-sm ">
                        <p className="mb-5 mt-2 text-center"><span className="font-bold">Message:</span>"Trans is a mental disorder"</p>
                            <div className="flex justify-center">
                                <iframe 
                                    src='https://flo.uri.sh/visualisation/18177064/embed'
                                    title='CAMBIAR' 
                                    className='flourish-embed-iframe' 
                                    frameBorder='0' 
                                    scrolling='no' 
                                    style={{ width: '60%', height: '360px' }} 
                                    sandbox='allow-same-origin allow-forms allow-scripts allow-downloads allow-popups allow-popups-to-escape-sandbox allow-top-navigation-by-user-activation'
                                ></iframe>
                            </div>
                    </div>

                    <div className="bg-neutral-300/20 p-8 sm:p-0 border border-neutral-400/30 rounded-xl shadow-sm">
                        <p className=" text-center mb-5 mt-2 "><span className="font-bold">Message:</span>
                            "Her hearts not at fault here it’s the LACK of brain cells"
                        </p>
                        <div className="flex justify-center">
                            <iframe 
                                src='https://flo.uri.sh/visualisation/18177593/embed' 
                                title='CAMBIAR' 
                                className='flourish-embed-iframe' 
                                frameBorder='0' 
                                scrolling='no' 
                                style={{ width: '60%', height: '360px' }} 
                                sandbox='allow-same-origin allow-forms allow-scripts allow-downloads allow-popups allow-popups-to-escape-sandbox allow-top-navigation-by-user-activation'
                            ></iframe>
                        </div>
                    </div>
                </div>  
        </div>
        </section>
    );
}
