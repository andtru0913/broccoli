import Image from "next/image";
import Card from "../components/card";
import Form from "../components/form";
import Layout from "../components/layout/layout";



export default function Posts() {
    return (
        <Layout>
            <section className="">
                <div className='relative  flex flex-col '>
                    <div className="flex flex-row">
                        <div className="bg-zinc-800 w-full p-8 flex flex-col flex-auto items-center">
                            <div className='  bg-opacity-60 text-white text-center max-w-prose'>
                                <h1 className="pb-8"> Tjänster hos broccoli</h1>

                                <p > Med vår hårdvaru- och mjukvarukompetens kan vi erbjuda tjänster inom design, konstruktion och testning av inbyggda system.

                                    Förutom konsult på plats så erbjuder Broccoli även inhouse lösningar för såväl stora som små projekt. Det kan vara ett bra alternativ för er som kund om ni vill frigöra utrymme i era lokaler, har platsbrist eller sitter på annan ort.
                                </p>

                            </div>
                        </div>
                        <div className="bg-green-300 flex-auto ">
                        <div className='overflow-hidden bg-center'>
                    <img className=" bg-cover " src='/images/tjanster.jfif' />
                </div>

                        </div>

                    </div>


                    <div className=" overflow-hidden h-1/3 w-1/2 translate-x-1/2">

                        <Image
                            src='/images/tjanster.jfif'
                            layout="fill"
                            objectFit='cover'
                            alt="Siluette of Gothenburg"
                        />
                    </div>


                </div>

                <div className='overflow-hidden h-1/3 bg-center'>
                    <img className=" bg-cover " src='/images/tjanster.jfif' />
                </div>

                <div className="layout py-12 text-white text-center max-w-prose bg-red-300">


                    <h1 className="pb-8"> Tjänster hos broccoli</h1>
                    <p > Med vår hårdvaru- och mjukvarukompetens kan vi erbjuda tjänster inom design, konstruktion och testning av inbyggda system.

                        Förutom konsult på plats så erbjuder Broccoli även inhouse lösningar för såväl stora som små projekt. Det kan vara ett bra alternativ för er som kund om ni vill frigöra utrymme i era lokaler, har platsbrist eller sitter på annan ort.
                    </p>


                </div>
            </section>


            <section className="">
                <div className=" layout py-12 md:w-1/2">
                    <div className="grid md:grid-cols-2  md:gap-12 ">
                        <Card href={"/carreer"} title="Spontanansökan" text={"Vi söker löpande nya medarbetare. Om du är intresserad av att arbeta som ingenjör hos oss är du välkommen att skicka en spontanansökan"} image="/images/karriär.jpg" />
                        <Card href={"/carreer"} title="Exjobb" text={"Vi söker löpande nya medarbetare. Om du är intresserad av att arbeta som ingenjör hos oss är du välkommen att skicka en spontanansökan"} image="/images/historia.jfif" />

                    </div>
                </div>




            </section>
            <section className="">
                <div className="layout py-12 md:w-1/2">
                    <Form />
                </div>
            </section>
        </Layout>
    );
}