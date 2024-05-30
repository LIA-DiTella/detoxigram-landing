'use client'
import { Button } from "@/components/global/button";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Home() {
    const variants = {
        hidden: { opacity: 0 },
        show: {
          opacity: 1,
          transition: {
            duration: 1
          }
        }
      };
    return (
        <section className="wrap-md w-full wrap-px pt-4 mx-auto">
            <div className="grid grid-cols-6 gap-4">
                {/* Div Número 6 */}
                <motion.div initial="hidden" animate="show" variants={variants} className="col-span-6">
                    <div className="flex flex-wrap gap-4 content-start bg-neutral-300/20 relative p-8 sm:p-12 border aspect-video md:aspect-[3/1] border-neutral-400/30 rounded-xl shadow-sm overflow-hidden">
                        <div className="image-container absolute flex w-full h-full inset-y-0 bottom-0 items-center right-0 flex-1 bg-[url('/div.flex.png')] bg-cover bg-center bg-no-repeat">
                        <span className="ml-10 w-3/5 block text-xl sm:text-4xl">Helping users <span className="underline">understand</span> why content is classfied as <span className="underline">toxic</span></span>
                        </div>
                    </div>
                </motion.div>
                {/* Boton 1 */}
                <motion.div initial="hidden" animate="show" variants={variants} className="col-span-6 sm:col-span-2">
                    <Link
                        href="/team"
                        className="flex flex-wrap gap-4 content-start relative py-4 px-12 border border-neutral-400/30 rounded-xl shadow-sm overflow-hidden bg-red-600 hover:bg-red-700 transition-colors duration-300"
                    >
                        <div className="content w-full text-white text-center">
                            <span>About us</span>
                        </div>
                    </Link>
                </motion.div>
                {/* Boton 2 */}
                <motion.div initial="hidden" animate="show" variants={variants} className="col-span-6 sm:col-span-2">
                    <Link
                        href="/report"
                        className="flex flex-wrap gap-4 content-start relative py-4 px-12 border border-neutral-400/30 rounded-xl shadow-sm overflow-hidden  hover:bg-red-600 hover:text-white transition-colors duration-300"
                    >
                        <div className="content w-full text-center">
                            <span>How does it work?</span>
                        </div>
                    </Link>
                </motion.div>
                {/* Boton 3 */}
                <motion.div initial="hidden" animate="show" variants={variants} className="col-span-6 sm:col-span-2">
                    <Link
                        href="mailto:detoxigram@gmail.com"
                        className="flex flex-wrap gap-4 content-start relative py-4 px-12 border border-neutral-400/30 rounded-xl shadow-sm overflow-hidden bg-red-600 hover:bg-red-700 transition-colors duration-300"
                    >
                        <div className="content w-full text-white text-center">
                            <span>Contact</span>
                        </div>
                    </Link>
                </motion.div>

                 <motion.div initial="hidden" animate="show" variants={variants} className="col-span-6 h-28">
                    <div className="flex flex-wrap gap-4 bg-[url('/barras-bg.png')] bg-cover bg-no-repeat h-full w-full content-start relative p-5 sm:p-5 border aspect-video md:aspect-[3/1] border-neutral-400/30 rounded-xl shadow-sm overflow-hidden items-center justify-center">
                            <div className="h-fit flex-col text-black text-md sm:text-2xl text-center flex items-center justify-center">
                                <span>Detoxigram leverages AI to <span className="underline">identify toxicity</span> in text</span>
                                <span>and <span className="underline">provide the reasons</span> behind that classification</span>
                            </div>
                    </div>
                </motion.div>
                 {/* Div Número 1 */}
                <motion.div initial="hidden" animate="show" variants={variants} className="col-span-3 md:col-span-3">
                    <div className="flex h-full w-full flex-wrap gap-4 content-center bg-[url('/general.png')] bg-cover sm:aspect-auto relative border border-neutral-400/30 rounded-xl shadow-sm overflow-hidden">
                    <img src="/general_illus.png" alt="Alt text" className="w-17/20 h-17/20 aspect-auto" />
                    </div>
                </motion.div>

                <div className="grid col-span-3 grid-row-3 gap-4">
                {/* Div Número 2 */}
                <motion.div initial="hidden" animate="show" variants={variants} className="col-span-6 sm:col-span-3 md:col-span-3">
                        <div className="flex flex-wrap w-full h-full md:h-full content-start bg-[url('/analyze.png')] bg-cover bg-center bg-no-repeat relative aspect-square md:aspect-auto px-8 py-8 border border-neutral-400/30 rounded-xl shadow-sm overflow-hidden items-center">
                        <div className="relative h-full w-full flex flex-col justify-center items-center">
                            <div className="content flex flex-col sm:flex-row gap-4 sm:gap-10 text-black justify-center md:max-w-64 relative z-10">
                                <h2 className="text-2xl sm:text-2xl md:text-2xl sm:w-3/4 text-center sm:text-left mb-0"><span className="underline">Analyze</span> content</h2>
                                <img src="/Lupa.png" alt="Lupa" className="w-full sm:w-9/12 h-auto" />
                            </div>

                        </div>
                    </div>
                </motion.div>
                {/* Div Número 3 */}
                <motion.div initial="hidden" animate="show" variants={variants} className="col-span-6 sm:col-span-3 md:col-span-3">
                        <div className="flex flex-wrap w-full h-full md:h-full content-start bg-[url('/analyze.png')] bg-cover bg-center bg-no-repeat relative aspect-square md:aspect-auto px-8 py-8 border border-neutral-400/30 rounded-xl shadow-sm overflow-hidden items-center">
                        <div className="relative h-full w-full flex flex-col justify-center items-center">
                            <div className="content flex flex-col sm:flex-row gap-4 sm:gap-10 text-black justify-center md:max-w-64 relative z-10">
                                <h2 className="text-2xl sm:text-2xl md:text-2xl mb-0 w-full sm:w-3/4 text-center sm:text-left"><span className="underline">Understand</span> how toxic it is and why</h2>
                                <img src="/Foco.png" alt="Lupa" className="w-full sm:w-9/12 h-auto" />
                            </div>
                            <div className="image-container absolute flex bottom-0">
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Div Número 4 */}
                <motion.div initial="hidden" animate="show" variants={variants} className="col-span-6 sm:col-span-3 md:col-span-3">
                    <div className="flex flex-wrap w-full h-full md:h-full content-start bg-[url('/detoxify.png')] bg-cover bg-center bg-no-repeat relative aspect-square md:aspect-auto px-8 py-8 border border-neutral-400/30 rounded-xl shadow-sm overflow-hidden items-center">
                        <div className="relative h-full w-full flex flex-col justify-center items-center">
                            <div className="content flex flex-col sm:flex-row gap-4 sm:gap-10 text-black justify-center md:max-w-64 relative z-10">
                                <h2 className="text-2xl sm:text-2xl md:text-2xl mb-0 w-full sm:w-3/4 text-center sm:text-left"><span className="underline">Detofixy</span> messages</h2>
                                <img src="/Origami.png" alt="Lupa" className="w-full sm:w-9/12 h-auto" />
                            </div>
                            <div className="image-container absolute flex bottom-0">
                            </div>
                        </div>
                    </div>
                </motion.div>
                </div>

                {/* Div de Grid */}
                  <motion.div initial="hidden" animate="show" variants={variants} className="col-span-6">
                    <div className="flex flex-wrap gap-4 content-start bg-neutral-300/20 relative p-8 sm:p-12 border aspect-video md:aspect-[3/1] border-neutral-400/30 rounded-xl shadow-sm overflow-hidden">
                        <div className="image-container absolute flex flex-row w-full h-full inset-y-0 bottom-0 items-center justify-center space-x-10 right-0 flex-1 bg-[url('/bg-applications.png')] bg-cover bg-center bg-no-repeat">
                        <a href="#"><img src="/chrome.png" alt="chrome" className="h-1/2 aspect-auto"/></a>
                        <a href="https://t.me/DetoxigramBot"><img src="/telegram.png" alt="telegram" className="h-1/2 aspect-auto" /></a>
                        <a href="/twitter-detoxifier"><img src="/twitter.png" alt="twitter" className="h-1/2 aspect-auto" /></a>
                        
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
