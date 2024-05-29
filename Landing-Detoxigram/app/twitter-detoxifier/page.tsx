'use client'
import Link from "next/link";
import ToxicityPredictionForm from "@/components/global/toxicity_form";
import { useState, useEffect } from "react";

export default function Home() {

    return (
        <section className="wrap-md w-full wrap-px pt-4 mx-auto">
            <div className="grid grid-cols-6 gap-4">
                {/* Div Número 6 */}
                <div className="col-span-6">
                    <div className="flex flex-wrap gap-4 content-start bg-neutral-300/20 relative p-8 sm:p-12 border aspect-video md:aspect-[3/1] border-neutral-400/30 rounded-xl shadow-sm overflow-hidden">
                        <div className="image-container absolute flex w-full h-full inset-y-0 bottom-0 items-center  right-0 flex-1 bg-[url('/bg-twitter.png')] bg-cover bg-center bg-no-repeat">
                        <span className="text-white ml-10 w-3/5 block text-xl sm:text-4xl">We are all <span className="underline">content creators</span>. Do you want to know how toxic your content is?</span>
                        </div>
                    </div>
                </div>
                <ToxicityPredictionForm/>


            </div>
        </section>
    );
}

