import { Button } from "@/components/global/button";
import Link from "next/link";

export default function Home() {
    return (
        <section className="wrap-md w-full wrap-px pt-4 mx-auto">
            <div className="grid grid-cols-6 gap-4">
                {/* Div Número 6 */}
                <div className="col-span-6">
                    <div className="flex flex-wrap gap-4 content-start bg-[url()] relative p-8 sm:p-12 border aspect-video md:aspect-[3/1] border-neutral-400/30 rounded-xl shadow-sm overflow-hidden">
                        <div className="image-container absolute flex w-full h-full inset-y-0 bottom-0 items-center  right-0 flex-1 bg-[url('/bg-team.png')] bg-cover bg-center bg-no-repeat">
                        <span className="ml-10 w-3/5 block text-xl sm:text-4xl">The people behind the project</span>
                        </div>
                    </div>
                </div>
            <div className="col-span-6">
            <div className="pl-4 grid grid-cols-1 md:grid-cols-3 border border-neutral-400/30 rounded-xl">
    <Link href="https://sites.google.com/view/joaquin-navajas/about">
        <img src="joaco.png" alt="team member" className="h-5/6 hover:scale-110 transition-transform duration-200"/>
    </Link>
    <Link href="https://emmanueliarussi.github.io/">
        <img src="emma.png" alt="team member" className="h-5/6 hover:scale-110 transition-transform duration-200"/>
    </Link>
    <Link href="https://www.linkedin.com/in/santiago-corley-a0677911a/es">
        <img src="san.png" alt="team member" className="h-5/6 hover:scale-110 transition-transform duration-200"/>
    </Link>
    <Link href="https://www.linkedin.com/in/alexia-aquino-b753a327a/?originalSubdomain=ar">
        <img src="alexia.png" alt="team member" className="h-5/6 hover:scale-110 transition-transform duration-200"/>
    </Link>
    <Link href="https://www.linkedin.com/in/andres-cotton/?originalSubdomain=ar">
        <img src="andy.png" alt="team member" className="h-5/6 hover:scale-110 transition-transform duration-200"/>
    </Link>
    <Link href="https://luzalbaposse.github.io/">
        <img src="luz.png" alt="team member" className="h-5/6 hover:scale-110 transition-transform duration-200"/>
    </Link>
</div>
            </div>
                
                
            </div>
        </section>
    );
}
