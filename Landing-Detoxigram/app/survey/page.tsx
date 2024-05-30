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
                        <div className=" border border-neutral-400/30 rounded-xl shadow-sm overflow-hidden">
                            <h1 className="w-full text-center">HOLA</h1>
                        </div>
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
                    <div className="bg-neutral-300/20 p-8 sm:p-12 border border-neutral-400/30 rounded-xl shadow-sm">
                        <p>
                            Firstly, we wondered if there existed a relationship between the political affiliation of participants, and their responses. To do this, we divided their judging of the
                            sentences in two large categories, these being "Toxic" or "Non-toxic". We only focused on Democrats and Republicans, to see how the responses varied amongst them.
                        </p>
                        <p className="mt-4 font-bold">
                            In 8 of the 30 sentences that the participants judged, we could establish a significant difference between their answers and their affiliation. Here are some of these
                            sentences and the distribution of responses:
                        </p>
                    </div>
                </div>

                {/* Detailed Analysis Graphs */}
                <div className="col-span-6 grid grid-cols-1 gap-4">
                    <div className="bg-neutral-300/20 p-8 sm:p-12 border border-neutral-400/30 rounded-xl shadow-sm">
                        <p className="mb-4">Q0: Text of the question</p>
                        <Image src="/path/to/your/detailed-analysis-graph-1.png" alt="Detailed Analysis Graph 1" layout="responsive" width={500} height={500} className="mx-auto" />
                    </div>

                    <div className="bg-neutral-300/20 p-8 sm:p-12 border border-neutral-400/30 rounded-xl shadow-sm">
                        <p className="mb-4">Q1: Text of the question</p>
                        <Image src="/path/to/your/detailed-analysis-graph-2.png" alt="Detailed Analysis Graph 2" layout="responsive" width={500} height={500} className="mx-auto" />
                    </div>

                    <div className="bg-neutral-300/20 p-8 sm:p-12 border border-neutral-400/30 rounded-xl shadow-sm">
                        <p className="mb-4">Q2: Text of the question</p>
                        <Image src="/path/to/your/detailed-analysis-graph-3.png" alt="Detailed Analysis Graph 3" layout="responsive" width={500} height={500} className="mx-auto" />
                    </div>
                </div>
            </div>
        </section>
    );
}
