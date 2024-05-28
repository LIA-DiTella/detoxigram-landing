// Holi, te dejo la maqueta del resto del sitio y anda poniendo lo q quieras adentro. Para ponerle un fondo al titular usa bg-[url('/bg-report.png')] bg-cover bg-center bg-no-repeat en el className, si tenes ganas armatelo en figma, sino lo hago en un rato
import { Button } from "@/components/global/button";
import Link from "next/link";

export default function Home() {
    return (
        <section className="wrap-md w-full wrap-px pt-4 mx-auto">
            <div className="grid grid-cols-6 gap-4">
                {/* Titular de la survey */}
                <div className="col-span-6">
                    <div className="flex flex-wrap gap-4 content-start bg-neutral-300/20 relative p-8 sm:p-12 border aspect-video md:aspect-[3/1] border-neutral-400/30 rounded-xl shadow-sm overflow-hidden">
                        <div className="image-container absolute flex w-full h-full inset-y-0 bottom-0 items-center  right-0 flex-1">
                        <span className="ml-10 w-3/5 block text-xl sm:text-4xl">What we learned from our survey</span>
                        </div>
                    </div>
            </div>

                <div className="col-span-6">
                        <div className="flex flex-wrap gap-4 content-start bg-neutral-300/20 relative p-8 sm:p-12 border aspect-video md:aspect-[3/1] border-neutral-400/30 rounded-xl shadow-sm overflow-hidden">
                            <div className="absolute flex w-full h-full inset-y-0 bottom-0 items-center  right-0 flex-1">
                            {/* Acá podes ir poniendo cosas en cajitas */}
                            </div>
                </div>
            
            </div>
            </div>
        </section>
    );
}

