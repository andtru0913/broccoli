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
            <section className="bg-skin-fill">
                <div className="layout h-screen py-12 flex flex-1 justify-center">
                    <h1>Om OSS</h1>
                </div>
            </section>
            <section className="">


                <div className="layout relative h-screen py-12 flex flex-col flex-1 items-center justify-center ">
                    <div data-animate-type="motion-safe:animate-fadeInRight" className="rotate-45 my-12 js-show-on-scroll">
                        <div className="-rotate-45 translate-x-52 bg-skin-link h-72 w-80 p-12 overflow-hidden"> </div>
                    </div>

                    <div data-animate-type="motion-safe:animate-fadeInLeft" className=" -translate-x-3/4 translate-y-1/4 h-24 w-24 my-12 bg-blue-400 js-show-on-scroll">
                        FadeIn
                    </div>

                    <div className="absolute top-0 flex flex-row flex-1 md:w-1/2 w-full bg-red-500 text-skin-inverted text-center ">

                        <div className="relative flex flex-col flex-1 m-4 bg-violet-500 items-center z-10">
                            <div className="absolute top-20 flex flex-row justify-end">
                            <div className=" w-full   flex flex-col items-center ">
                                <div className="md:w-1/2 w-3/4 border-2 flex flex-col items-center">
                                <h4 className="font-bold">1993</h4>
                                <p className=" ">Broccoli grundades av Björn Bergholm vid sidan om Chalmersstudierna
                                </p>
                                </div>
                                
                            </div>

                            <div className="  bg-blue-300 flex flex-col justify-center">
                            <div className="  p-2 rounded-full bg-skin-fill"></div>
                            </div>
                            </div>
                            
                            <div className="absolute bottom-20 w-1/2 border-2 ">
                                <h4 className="font-bold">2018</h4>
                                <p className=" ">Broccoli köper Broccoligården

                                </p>
                            </div>

                        </div>

                        <div className="relative">
                            <div className="absolute right-6 h-screen w-1 bg-skin-approve">

                            </div>
                            <div className="flex flex-col items-around">
                                <div className="absolute top-32  p-2 rounded-full bg-skin-fill"></div>
                                <div className="absolute bottom-32 p-2 rounded-full bg-skin-fill"></div>
                            </div>
                        </div>
                    </div>


                    <Historia />

                </div>
            </section>

        </Layout>
    );
}