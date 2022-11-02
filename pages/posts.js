import Card from "../components/card";
import Form from "../components/form";
import Layout from "../components/layout/layout";



export default function Posts() {
    return (
        <Layout>
            <section className="">
            <div className='relative  flex flex-1 '>
                        <div className='flex w-full h-full justify-center z-10 '>
                            <img className=" bg-cover" src='/images/tjanster.jfif' />
                        </div>
                        <div className='absolute top-0 flex flex-col flex-1 bg-zinc-800 bg-opacity-60 p-4 z-20 h-full text-white text-center max-w-prose'>
                        <h1 className="pb-8"> Tjänster hos broccoli</h1>

                        <p > Med vår hårdvaru- och mjukvarukompetens kan vi erbjuda tjänster inom design, konstruktion och testning av inbyggda system.

Förutom konsult på plats så erbjuder Broccoli även inhouse lösningar för såväl stora som små projekt. Det kan vara ett bra alternativ för er som kund om ni vill frigöra utrymme i era lokaler, har platsbrist eller sitter på annan ort.
</p>

                        </div>

                    </div>
                <div className="layout py-12 text-white text-center max-w-prose ">

                    
                    <h1 className="pb-8"> Tjänster hos broccoli</h1>
                    <p > Med vår hårdvaru- och mjukvarukompetens kan vi erbjuda tjänster inom design, konstruktion och testning av inbyggda system.

                        Förutom konsult på plats så erbjuder Broccoli även inhouse lösningar för såväl stora som små projekt. Det kan vara ett bra alternativ för er som kund om ni vill frigöra utrymme i era lokaler, har platsbrist eller sitter på annan ort.
                    </p>


                </div>
            </section>


            <section className="bg-theme-green ">
                <div className=" layout py-12 md:w-1/2">
                    <div className="grid md:grid-cols-2  md:gap-12 ">
                        <Card href={"/carreer"} title="Spontanansökan" text={"Vi söker löpande nya medarbetare. Om du är intresserad av att arbeta som ingenjör hos oss är du välkommen att skicka en spontanansökan"} image="/images/karriär.jpg" />
                        <Card href={"/carreer"} title="Exjobb" text={"Vi söker löpande nya medarbetare. Om du är intresserad av att arbeta som ingenjör hos oss är du välkommen att skicka en spontanansökan"} image="/images/historia.jfif" />

                    </div>
                </div>




            </section>
            <section className="bg-beige-1">
                <div className="layout py-12 md:w-1/2">
                    <Form />
                </div>
            </section>
        </Layout>
    );
}