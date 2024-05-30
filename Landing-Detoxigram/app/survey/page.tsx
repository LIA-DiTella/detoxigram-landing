import Image from "next/image"; // Import the Image component for graph images

export default function Home() {
    return (
        <section className="wrap-md w-full wrap-px pt-4 mx-auto">
            <div className="grid grid-cols-6 gap-4">
                {/* Titular de la survey */}
                <div className="col-span-6">
                    <div className="flex flex-wrap gap-4 content-start bg-[url('/bg-report.png')] bg-cover bg-center bg-no-repeat relative p-8 sm:p-12 border aspect-video md:aspect-[3/1] border-neutral-400/30 rounded-xl shadow-sm overflow-hidden">
                        <div className="absolute flex w-full h-full inset-y-0 bottom-0 items-center right-0 flex-1">
                            <span className="ml-10 w-3/5 block text-xl sm:text-4xl">What we learned from our survey</span>
                        </div>
                    </div>
                </div>

                {/* Intro Text */}
                <div className="col-span-6">
                        <p className= "w-full text-xl text-left mt-5 mb-5">
                            Firstly, it's important to know who we were surveying. In other words, the sampling. The survey was answered by 307 participants. The following graphs intend to give a
                            better image of the distribution of them in different categories:
                        </p>
                </div>

                {/* Graphs Section */}
                <div className="col-span-6 grid grid-cols-1 gap-4">
                    <div className="bg-neutral-300/20 p-7 sm:p-9 border border-neutral-400/30 rounded-xl shadow-sm">
                        <iframe 
                            src='https://flo.uri.sh/visualisation/18158523/embed'
                            title='CAMBIAR' 
                            className='flourish-embed-iframe' 
                            frameBorder='0' 
                            scrolling='no' 
                            style={{ width: '100%', height: '600px' }} 
                            sandbox='allow-same-origin allow-forms allow-scripts allow-downloads allow-popups allow-popups-to-escape-sandbox allow-top-navigation-by-user-activation'
                        ></iframe>
                    </div>

                    <div className="bg-neutral-300/20 p-8 sm:p-12 border border-neutral-400/30 rounded-xl shadow-sm">
                        <iframe 
                            src='https://flo.uri.sh/visualisation/18175928/embed'
                            title='CAMBIAR' 
                            className='flourish-embed-iframe' 
                            frameBorder='0' 
                            scrolling='no' 
                            style={{ width: '100%', height: '600px' }} 
                            sandbox='allow-same-origin allow-forms allow-scripts allow-downloads allow-popups allow-popups-to-escape-sandbox allow-top-navigation-by-user-activation'
                        ></iframe>
                    </div>

                    <div className="bg-neutral-300/20 p-8 sm:p-12 border border-neutral-400/30 rounded-xl shadow-sm">
                        <iframe 
                            src='https://flo.uri.sh/visualisation/18175979/embed' 
                            title='CAMBIAR' 
                            className='flourish-embed-iframe' 
                            frameBorder='0' 
                            scrolling='no' 
                            style={{ width: '100%', height: '600px' }} 
                            sandbox='allow-same-origin allow-forms allow-scripts allow-downloads allow-popups allow-popups-to-escape-sandbox allow-top-navigation-by-user-activation'
                        ></iframe>
                    </div>

                    <div className="bg-neutral-300/20 p-8 sm:p-12 border border-neutral-400/30 rounded-xl shadow-sm">
                        <iframe 
                            src='https://flo.uri.sh/visualisation/18176006/embed' 
                            title='CAMBIAR' 
                            className='flourish-embed-iframe' 
                            frameBorder='0' 
                            scrolling='no' 
                            style={{ width: '100%', height: '600px' }} 
                            sandbox='allow-same-origin allow-forms allow-scripts allow-downloads allow-popups allow-popups-to-escape-sandbox allow-top-navigation-by-user-activation'
                        ></iframe>
                    </div>
                </div>

                {/* Analysis Text */}
                <div className="col-span-6">
                        <p className= "w-full text-xl text-left mt-5 mb-5">
                            First, we wondered if there existed a relationship between the political affiliation of participants, and their responses. To do this, we divided their judging of the
                            sentences in two large categories, these being "Toxic" or "Non-toxic". We only focused on Democrats and Republicans, to see how the responses varied amongst them.
                        </p>
                        <p className= "w-full text-xl text-left mt-5 mb-5">
                            In 8 of the 30 sentences that the participants judged, we could establish a significant difference between their answers and their affiliation. Here are some of the
                            sentences and their distribution that had really pronounced difference:
                        </p>
                </div>

                {/* Detailed Analysis Graphs */}
                <div className="col-span-6 grid grid-cols-1 gap-4">
                    <div className="bg-neutral-300/20 p-8 sm:p-12 border border-neutral-400/30 rounded-xl shadow-sm">
                        <p className="mb-4">Participants judged the sentence:</p>
                        <p className="mb-4 text-center bg-gray-300 px-2 py-1 rounded-md">
                        "Exactly the reason my 5.56 and 7.62 and 9mm will never be given up. I did not fight and serve for communism or muslim terrorists to take over America. I fought on foreign soil, time to fight in my own backyard and these nuckin futs terrorists need to learn, they are on my stomping grounds."
                         </p>
                        <iframe 
                            src='https://flo.uri.sh/visualisation/18176640/embed' 
                            title='CAMBIAR' 
                            className='flourish-embed-iframe' 
                            frameBorder='0' 
                            scrolling='no' 
                            style={{ width: '100%', height: '600px' }} 
                            sandbox='allow-same-origin allow-forms allow-scripts allow-downloads allow-popups allow-popups-to-escape-sandbox allow-top-navigation-by-user-activation'
                        ></iframe>
                    </div>

                    <div className="bg-neutral-300/20 p-8 sm:p-12 border border-neutral-400/30 rounded-xl shadow-sm">
                    <p className="mb-4">Participants judged the sentence:</p>
                        <p className=" text-center mb-4 bg-gray-300 px-2 py-1 rounded-md">
                        "Trans is a mental disorder"
                         </p>
                        <iframe 
                            src='https://flo.uri.sh/visualisation/18177064/embed'
                            title='CAMBIAR' 
                            className='flourish-embed-iframe' 
                            frameBorder='0' 
                            scrolling='no' 
                            style={{ width: '100%', height: '600px' }} 
                            sandbox='allow-same-origin allow-forms allow-scripts allow-downloads allow-popups allow-popups-to-escape-sandbox allow-top-navigation-by-user-activation'
                        ></iframe>
                    </div>

                    <div className="bg-neutral-300/20 p-8 sm:p-12 border border-neutral-400/30 rounded-xl shadow-sm">
                    <p className="mb-4">Participants judged the sentence:</p>
                    <p className=" text-center mb-4 bg-gray-300 px-2 py-1 rounded-md">
                        "Exactly the reason my 5.56 and 7.62 and 9mm will never be given up. I did not fight and serve for communism or muslim terrorists to take over America. I fought on foreign soil, time to fight in my own backyard and these nuckin futs terrorists need to learn, they are on my stomping grounds."
                    </p>
                        <iframe 
                            src='https://flo.uri.sh/visualisation/18176640/embed' 
                            title='CAMBIAR' 
                            className='flourish-embed-iframe' 
                            frameBorder='0' 
                            scrolling='no' 
                            style={{ width: '100%', height: '600px' }} 
                            sandbox='allow-same-origin allow-forms allow-scripts allow-downloads allow-popups allow-popups-to-escape-sandbox allow-top-navigation-by-user-activation'
                        ></iframe>
                    </div>
                </div>
            </div>
        </section>
    );
}
