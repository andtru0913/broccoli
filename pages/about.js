import Image from "next/image";
import { useEffect, useState } from "react";
import Layout from "../components/layout/layout";
import Historia from "./historia";
const callback = function (entries) {
    entries.forEach(entry => {

        // Is the element in the viewport?
        if (entry.isIntersecting) {

            // Add the fadeIn class:
            entry.target.classList.add("motion-safe:animate-fadeIn");
        } else {

            // Otherwise remove the fadein class
            entry.target.classList.remove("motion-safe:animate-fadeIn");
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
            <section className="bg-purple-1">
                <div className="layout h-screen py-12 flex flex-1 justify-center">
                    <h1>Om OSS</h1>
                </div>
            </section>
            <section className="">


                <div className="layout h-screen py-12 flex flex-1 justify-center">
                    <div class=" translate-x-3/4 translate-y-1/4 h-24 w-24 bg-blue-400 js-show-on-scroll">
                        FadeIn
                    </div>
                    <Historia />

                </div>
            </section>

        </Layout>
    );
}