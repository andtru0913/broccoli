import Card from "../components/card";
import Form from "../components/form";
import Layout from "../components/layout/layout";



export default function Underconsultants() {
    const title = "Vill du bli underkonsult?"
    const intro_text = "Vi vill alltid erbjuda våra kunder ett alternativ som svar på deras förfrågningar. Därför har vi intresse av att knyta till oss ingenjörer som vill arbeta som underkonsulter. Är du intresserad av att arbeta som underkonsult genom Broccoli så är du välkommen att kontakta oss på:"
    return (
        <Layout>
            <section className="bg-green-dark">
                <div className="layout py-12 text-white text-center max-w-prose ">
                    <h1 className="pb-8">{title}</h1>
                    <p > {intro_text}</p>


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