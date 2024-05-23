import { Button } from "@/components/global/button";
import Link from "next/link";

export default function Home() {
    return (
        <section className="wrap-md w-full wrap-px pt-4 mx-auto">
            <div className="grid grid-cols-6 gap-4">
                {/* Div Número 6 */}
                <div className="col-span-6">
                    <div className="flex flex-wrap gap-4 content-start bg-neutral-300/20 relative p-8 sm:p-12 border aspect-video md:aspect-[3/1] border-neutral-400/30 rounded-xl shadow-sm overflow-hidden">
                        <div className="image-container absolute flex w-full h-full inset-y-0 bottom-0 items-center right-0 flex-1 bg-[url('/div.flex.png')] bg-cover bg-center bg-no-repeat">
                        <span className="ml-10 w-3/5 block text-xl sm:text-4xl">Are you aware of how <span className="underline">toxic</span> is the <span className="underline">content</span> you consume?</span>
                        </div>
                    </div>
                </div>
                {/* Boton 1 */}
                <div className="col-span-6 sm:col-span-2">
                    <Link
                        href="/team"
                        className="flex flex-wrap gap-4 content-start relative py-4 px-12 border border-neutral-400/30 rounded-xl shadow-sm overflow-hidden bg-red-600 hover:bg-red-700 transition-colors duration-300"
                    >
                        <div className="content w-full text-white text-center">
                            <span>Who are we</span>
                        </div>
                    </Link>
                </div>
                {/* Boton 2 */}
                <div className="col-span-6 sm:col-span-2">
                    <Link
                        href="/report"
                        className="flex flex-wrap gap-4 content-start relative py-4 px-12 border border-neutral-400/30 rounded-xl shadow-sm overflow-hidden  hover:bg-red-600 hover:text-white transition-colors duration-300"
                    >
                        <div className="content w-full text-center">
                            <span>How does it work</span>
                        </div>
                    </Link>
                </div>
                {/* Boton 3 */}
                <div className="col-span-6 sm:col-span-2">
                    <Link
                        href="/Contact"
                        className="flex flex-wrap gap-4 content-start relative py-4 px-12 border border-neutral-400/30 rounded-xl shadow-sm overflow-hidden bg-red-600 hover:bg-red-700 transition-colors duration-300"
                    >
                        <div className="content w-full text-white text-center">
                            <span>Reach out</span>
                        </div>
                    </Link>
                </div>

                 <div className="col-span-6 h-28">
                    <div className="flex flex-wrap gap-4 bg-[url('/barras-bg.png')] bg-cover bg-no-repeat h-full w-full content-start relative p-5 sm:p-5 border aspect-video md:aspect-[3/1] border-neutral-400/30 rounded-xl shadow-sm overflow-hidden items-center justify-c">
                            <div className="h-fit flex-col text-black ml-10 text-md sm:text-2xl text-center flex items-center justify-center">
                                <span>Detoxigram leverages artificial intelligence to identify toxicity</span>
                                <span>in text channels</span>
                            </div>
                    </div>
                </div>
                 {/* Div Número 1 */}
                <div className="col-span-3 md:col-span-3">
                    <div className="flex h-full w-full flex-wrap gap-4 content-center bg-[url('/general.png')] bg-cover sm:aspect-auto relative border border-neutral-400/30 rounded-xl shadow-sm overflow-hidden">
                    <img src="/general_illus.png" alt="Alt text" className="w-17/20 h-17/20 aspect-auto" />
                    </div>
                </div>

                <div className="grid col-span-3 grid-row-3 gap-4">
                {/* Div Número 2 */}
                <div className="col-span-6 sm:col-span-3 md:col-span-3">
                        <div className="flex flex-wrap w-full h-full md:h-full content-start bg-[url('/analyze.png')] bg-cover bg-center bg-no-repeat relative aspect-square md:aspect-auto px-8 py-8 border border-neutral-400/30 rounded-xl shadow-sm overflow-hidden items-center">
                        <div className="relative h-full w-full flex flex-col justify-center items-center">
                            <div className="content flex flex-col sm:flex-row gap-4 sm:gap-10 text-black justify-center md:max-w-64 relative z-10">
                                <h2 className="text-xl sm:text-3xl md:text-xl mb-0 w-full sm:w-3/4 text-center sm:text-left"><span className="underline">Analyze</span> the content</h2>
                                <img src="/Lupa.png" alt="Lupa" className="w-full sm:w-9/12 h-auto" />
                            </div>
                            <div className="image-container absolute flex bottom-0">
                            </div>
                        </div>
                    </div>
                </div>
                {/* Div Número 3 */}
                <div className="col-span-6 sm:col-span-3 md:col-span-3">
                        <div className="flex flex-wrap w-full h-full md:h-full content-start bg-[url('/analyze.png')] bg-cover bg-center bg-no-repeat relative aspect-square md:aspect-auto px-8 py-8 border border-neutral-400/30 rounded-xl shadow-sm overflow-hidden items-center">
                        <div className="relative h-full w-full flex flex-col justify-center items-center">
                            <div className="content flex flex-col sm:flex-row gap-4 sm:gap-10 text-black justify-center md:max-w-64 relative z-10">
                                <h2 className="text-xl sm:text-3xl md:text-xl mb-0 w-full sm:w-3/4 text-center sm:text-left"><span className="underline">Understand</span> how toxic is it and why</h2>
                                <img src="/Foco.png" alt="Lupa" className="w-full sm:w-9/12 h-auto" />
                            </div>
                            <div className="image-container absolute flex bottom-0">
                            </div>
                        </div>
                    </div>
                </div>

                {/* Div Número 4 */}
                <div className="col-span-6 sm:col-span-3 md:col-span-3">
                    <div className="flex flex-wrap w-full h-full md:h-full content-start bg-[url('/detoxify.png')] bg-cover bg-center bg-no-repeat relative aspect-square md:aspect-auto px-8 py-8 border border-neutral-400/30 rounded-xl shadow-sm overflow-hidden items-center">
                        <div className="relative h-full w-full flex flex-col justify-center items-center">
                            <div className="content flex flex-col sm:flex-row gap-4 sm:gap-10 text-black justify-center md:max-w-64 relative z-10">
                                <h2 className="text-xl sm:text-3xl md:text-xl mb-0 w-full sm:w-3/4 text-center sm:text-left"><span className="underline">Detofixy</span> your messages</h2>
                                <img src="/Origami.png" alt="Lupa" className="w-full sm:w-9/12 h-auto" />
                            </div>
                            <div className="image-container absolute flex bottom-0">
                            </div>
                        </div>
                    </div>
                </div>
                </div>


                {/* Div de Grid */}
                  <div className="col-span-6">
                    <div className="flex flex-wrap gap-4 content-start bg-neutral-300/20 relative p-8 sm:p-12 border aspect-video md:aspect-[3/1] border-neutral-400/30 rounded-xl shadow-sm overflow-hidden">
                        <div className="image-container absolute flex w-full h-full inset-y-0 bottom-0 items-center right-0 flex-1 bg-[url('/bg-applications.png')] bg-cover bg-center bg-no-repeat">
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
