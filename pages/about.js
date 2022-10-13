import Image from "next/image";
import Layout from "../components/layout";


export default function About() {

    return (
        <Layout>
            About us!
            <section className='flex'>
                <div className="w-80 ml-16 mt-60 bg-black bg-opacity-50 p-5 rounded-lg">
                    <h1 className="text-amethyst text-6xl leading-tight mb-3"> BROCCOLI </h1>
                    <p className='text-slate-200 text-xs text-wrap leading-tight'> Broccoli är ett ingenjörsbolag inom hårdvaru- och mjukvaruutveckling, och då främst inbyggda system. Vi fokuserar på konsulter som är vår huvudgren där vi hjälper våra kunder att utveckla spännande teknik, och utbildning eftersom det är roligt att sprida kunskap om det vi brinner för. </p>
                </div>

                <div className=" w-full h-96 bg-cover bg-center -z-10 ">

                    <Image
                        src="/images/gothenburg.jfif"
                        layout="fill"
                        objectFit='cover'
                        alt="Siluette of Gothenburg"
                    />
                </div>

            </section>

            <div className="bg-purple-300 mt-24 ">

                <h1 className=" p-5 text-2xl text-center md:ml-12 md:text-left 2xl:text-6xl"> FÖLJ OSS PÅ INSTAGRAM </h1>
                <div className=" flex flex-1 align-middle justify-center flex-col md:flex-row">

                    <div className="relative basis-1/5 bg-slate-500 m-5 shadow-lg shadow-zinc-700">

                        <img
                            className="overflow-hidden bg-cover bg-center w-full h-full"
                            src="/images/gothenburg.webp"

                        />
                        <p className="absolute text-xs bottom-4 left-1/2 -translate-x-1/2 text-white"> inlägg.. </p>

                    </div>
                    <div className="relative basis-1/5 bg-slate-500 m-5 shadow-lg shadow-zinc-700">
                        <Image
                            className="overflow-hidden"
                            src="/images/kranar.jpg"
                            width={100}
                            height={100}
                            layout="responsive"
                            objectFit="cover"
                        />
                        <p className="absolute text-xs bottom-4 left-1/2 -translate-x-1/2 text-white"> inlägg.. </p>

                    </div>
                    <div className="relative basis-1/5 bg-slate-500 m-5 shadow-lg shadow-zinc-700">

                        <Image
                            className="overflow-hidden"
                            src="/images/gothenburg.jfif"
                            width={100}
                            height={100}
                            layout="responsive"
                            objectFit="cover"
                        />
                        <p className="absolute text-xs bottom-4 left-1/2 -translate-x-1/2 text-white "> inlägg.. </p>

                    </div>
                    <div className=" relative basis-1/5 bg-slate-500 m-5 shadow-lg shadow-zinc-700">

                        <Image
                            className="overflow-hidden"
                            src="/images/gothenburg.jfif"
                            width={100}
                            height={100}
                            layout="responsive"
                            objectFit="cover"
                        />
                        <div className="absolute left-1/2 bottom-0 -translate-x-1/2 p-6 w-full bg-zinc-600 opacity-60"></div>
                        <p className="absolute text-xs bottom-4 left-1/2 -translate-x-1/2 text-white"> inlägg.. </p>
                    </div>



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