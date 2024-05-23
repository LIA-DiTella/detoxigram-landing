import { Button } from "@/components/global/button";
import Link from "next/link";

export default function Home() {
    return (
        <section className="wrap-md w-full wrap-px pt-4 mx-auto">
            <div className="grid grid-cols-6 gap-4">
                {/* Div Número 6 */}
                <div className="col-span-6">
                    <div className="flex flex-wrap gap-4 content-start bg-neutral-300/20 relative p-8 sm:p-12 border aspect-video md:aspect-[3/1] border-neutral-400/30 rounded-xl shadow-sm overflow-hidden">
                        <div className="image-container absolute flex w-full h-full inset-y-0 bottom-0 items-center  right-0 flex-1">
                        <span className="ml-10 w-3/5 block text-xl sm:text-4xl">Report</span>
                        </div>
                    </div>
                
                <div className="col-span-6 mt-10">
                    <div id="#Build">
                    <h2 className="w-full text-4xl text-left mt-5 mb-5">What have we build?</h2>
                    <p className="w-full text-xl text-left mt-5 mb-5">Texto texto</p>
                    </div>
                    <div id="#Lessons">
                    <h2 className="w-full text-4xl text-left mt-5 mb-5">What lessons have we learned?</h2>
                    <p className="w-full text-xl text-left mt-5 mb-5">Texto texto</p>
                    </div>
                    <div id="#Future">
                    <h2 className="w-full text-4xl text-left mt-5 mb-5">Future Plans</h2>
                    <p className="w-full text-xl text-left mt-5 mb-5">Texto texto</p>
                    </div>
                </div>
            </div>
            </div>
        </section>
    );
}
