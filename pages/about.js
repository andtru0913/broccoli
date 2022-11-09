import Image from "next/image";
import { useEffect, useState } from "react";
import Layout from "../components/layout/layout";
import Historia from "./historia";
const callback = function (entries) {
    entries.forEach(entry => {
        const animationType = entry.target.dataset.animateType
        // Is the element in the viewport?
        if (entry.isIntersecting) {

            // Add the fadeIn class:
            entry.target.classList.add(animationType);
        } else {

            // Otherwise remove the fadein class
            entry.target.classList.remove(animationType);
        }
    });
};
export default function About() {

    // Get all the elements you want to show on scroll

    const [animateHeader, setAnimateHeader] = useState(false);

    useEffect(() => {
        const targets = document.querySelectorAll(".js-show-on-scroll");
        const observer = new IntersectionObserver(callback);
        // Loop through each of the target
        targets.forEach(function (target) {
            // Hide the element
            target.classList.add("opacity-0");

            // Add the element to the watcher
            observer.observe(target);
        });

        // Callback for IntersectionObserver

    }, [])





    return (

        <Layout>
          
            <section className="  bg-gradient-to-br from-skin-hue to-skin-no">
            

                <div className="layout w-full text-skin-inverted text-center py-12  flex flex-col flex-1 items-center justify-center  md:gap-20 gap-8 ">
                <h1>Om OSS</h1>
                    <div className="w-full flex flex-col items-center ">
                        <div className="md:w-1/3 w-3/4 border-2 h-32 flex-1 md:p-4 p-4 flex flex-col items-center js-show-on-scroll" data-animate-type="motion-safe:animate-fadeInLeft" >
                            <h4 className="font-bold">1993</h4>
                            <p className=" ">Broccoli grundades av Björn Bergholm vid sidan om Chalmersstudierna. Genom åren har företaget vuxit och är numera ett väl utvecklat teknikkonsultbolag specialiserat inom elektronikutveckling.
                            </p>
                        </div>

                    </div>


                    <div className=" w-full   flex flex-col items-center ">
                        <div className="md:w-1/3 w-3/4 h-32  flex-1 border-2 md:p-4 p-4 flex flex-col items-center js-show-on-scroll" data-animate-type="motion-safe:animate-fadeInLeft" >
                            <h4 className="font-bold">2000</h4>
                            <p className=" ">Genom åren har företaget vuxit och är numera ett väl utvecklat teknikkonsultbolag specialiserat inom elektronikutveckling.
                            </p>
                        </div>

                    </div>



                    <div className=" w-full   flex flex-col items-center ">
                        <div className="md:w-1/3 w-3/4 h-32  flex-1 border-2 md:p-4 p-4 flex flex-col items-center js-show-on-scroll" data-animate-type="motion-safe:animate-fadeInLeft" >
                            <h4 className="font-bold">2018</h4>
                            <p className=" ">Broccoli köper Broccoligården
                            </p>
                        </div>

                    </div>


                    <div className=" w-full   flex flex-col items-center ">
                        <div className="md:w-1/3 w-3/4 h-32  flex-1 border-2 md:p-4 p-4 flex flex-col items-center js-show-on-scroll" data-animate-type="motion-safe:animate-fadeInLeft" >
                            <h4 className="font-bold">Nutid</h4>
                            <p className=" ">Med vår hårdvaru- och mjukvarukompetens kan vi erbjuda tjänster inom design, konstruktion och testning av inbyggda system. Vi hjälper till att täcka behov i gränslandet mellan hårdvara och mjukvara i flera olika branscher.
                            </p>
                        </div>

                    </div>











                </div>
            </section>

            <section className="bg-skin-fill">
                <div className="layout h-screen py-12 grid md:grid-cols-2 grid-cols-1">
                    <div className=" overflow-hidden">
                    <Image
              src="/images/gothenburg.jfif"
              width={500}
              height={400}
              objectFit='cover'
              alt="Siluette of Gothenburg"
            />
                    </div>
                    <div className="py-12 grid gap-4">
                        
                        <p>Merparten av våra konsultuppdrag är förlagda hos kund, och en mindre del är inhouse projekt av varierande storlek.

                            Våra kunder är ofta produktutvecklande företag som återfinns inom diverse olika branscher såsom fordon, automation, marin, medicin med flera. Gemensamt för alla är att de arbetar med elektronik av något slag i sin verksamhet.</p>

                    </div>

                </div>
            </section>

        </Layout>
    );
}