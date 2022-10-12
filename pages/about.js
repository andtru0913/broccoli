import Image from "next/image";
import { Container } from "postcss";
import Layout from "../components/layout";

export default function About() {
    return (
        <Layout>
            About us!

            <div className="bg-purple-300 mt-24 flex align-middle justify-start ml-48">
                <div className="h-44 w-44 bg-slate-500 mx-5">

                    <Image 
                        className="overflow-hidden"
                        src="/images/gothenburg.webp"
                        width={100}
                        height={100}
                        layout="responsive"
                        objectFit="cover"
                    />
                </div>
                <div className="h-44 w-44 bg-slate-500 mx-5">
                    <Image 
                        className="overflow-hidden"
                        src="/images/kranar.jpg"
                        width={100}
                        height={100}
                        layout="responsive"
                        objectFit="cover"
                    />
                </div>
                <div className="h-44 w-44 bg-slate-500 mx-5">

                    <Image 
                        className="overflow-hidden"
                        src="/images/gothenburg.jfif"
                        width={100}
                        height={100}
                        layout="responsive"
                        objectFit="cover"
                    />
                </div>
                <div className="h-44 w-44 bg-slate-500 mx-5">

                    <Image 
                        className="overflow-hidden"
                        src="/images/kranar.jpg"
                        width={100}
                        height={100}
                        layout="responsive"
                        objectFit="cover"
                    />
                </div>
                <div className="h-44 w-44 bg-slate-500 mx-5">

                    <Image 
                        className="overflow-hidden"
                        src="/images/gothenburg.jfif"
                        width={100}
                        height={100}
                        layout="responsive"
                        objectFit="cover"
                    />
                </div>

                <div className="h-44 w-44 bg-slate-500 mx-5">

                    <Image 
                        className="overflow-hidden"
                        src="/images/gothenburg.jfif"
                        width={100}
                        height={100}
                        layout="responsive"
                        objectFit="cover"
                    />
                </div>
                                
            </div>

            <Image 
                className="overflow-hidden"
                src="/images/kranar.jpg"
                width={100}
                height={80}
                layout="responsive"
                objectFit="contain"
                />
        </Layout>
    );
}