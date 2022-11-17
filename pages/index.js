import Image from "next/image";
import Layout from "../components/layout/layout";
import Accordion from "../components/accordion";

export const getStaticProps = async () => {
  const url = `https://graph.instagram.com/me/media?fields=id,caption,media_url,timestamp,media_type,permalink&access_token=${process.env.INSTAGRAM_KEY}`;
  const data = await fetch(url);
  const feed = await data.json();

  return {
    props: {
      feed,
    },
  };
};

export default function Home({ feed }) {
  const insta_images = feed.data;
  return (
    <Layout className="">
      <main>
        <header className=" ">
          <div className=" overflow-hidden h-screen bg-center ">
            <Image
              src="/images/gothenburg.jfif"
              layout="fill"
              objectFit="cover"
              alt="Siluette of Gothenburg"
            />
          </div>
          <div className="relative overflow-hidden"></div>
        </header>

        <section className="">
          <div className="layout py-12  flex flex-col justify-center">
            <div className="py-2 md:p-4 text-center">
              <h2>Att jobba hos broccoli</h2>
            </div>

            <div className="  flex flex-col md:items-center">
              <Accordion />
            </div>
          </div>
        </section>

        <section className=" py-12 text-center text-skin-base overflow-hidden">
          <h2 className=" ">Våra kärnvärden</h2>
          <div className=" layout grid grid-cols-1 grid-flow-row md:grid-cols-3 justify-center gap-4 py-8 lg:px-28 cursor-default">
            <div className="relative rounded">
              <div className="flex flex-col flex-1 bg-skin-primary bg-opacity-80 p-4 z-20 h-full  ">
                <h3 className="py-2">RELATIONER</h3>

                <p className="">
                  På Broccoli arbetar vi inkluderande, visar ömsesidig respekt
                  och bjuder aktivt in berörda i dialogen. Genom våra olikheter
                  bygger vi en stark gemenskap. Vi eftersträvar olikheter då det
                  stärker oss som grupp och utvecklar oss som individer. Vi lär
                  oss även kontinuerligt genom kunskapsdelning och inspiration
                  av varandra vilket leder till vår trevliga företagskultur.
                </p>
              </div>
            </div>
            <div className="relative rounded">
              <div className="flex flex-col flex-1 bg-skin-primary bg-opacity-80 p-4 z-20 h-full  ">
                <h3 className="py-2">PROFESSIONALISM</h3>

                <p className="">
                  Nöjda kunder får vi genom att prioritera god teknisk kompetens
                  och kvalitet samt genom att vara lyhörda till behoven. Vi är
                  den pålitliga partnern med goda ambitioner och fokus på att
                  garantera en bra leverans. Kontinuerlig utveckling genom
                  feedback, erfarenhet och utbildning leder till arbetsglädje,
                  nätverkande och ett högt engamenang.
                </p>
              </div>
            </div>
            <div className="relative rounded">
              <div className="flex flex-col flex-1 bg-skin-primary bg-opacity-80 p-4 z-20 h-full ">
                <h3 className="py-2">HÅLLBAR UTVECKLING</h3>

                <p>
                  Vi värderar hållbarhet genom ekonomiskt sinne samt personlig
                  och teknisk utveckling. Vi gör medvetna val för en långsiktig
                  utveckling vilket ger oss trygghet, frihet och en känsla av
                  att vi tillsammans bidrar till det bättre.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="">
          <div className="layout  py-12">
            <h2 className="  text-center md:ml-12 md:text-left">
              Följ oss på Instagram
            </h2>
            <a
              className="text-skin-muted hover:opacity-50"
              href="https://www.instagram.com/broccoliengineering/"
            >
              <p className=" text-center md:ml-12 md:text-left">
                @broccoliengineering
              </p>
            </a>
            <div className=" flex flex-1 align-middle justify-center flex-col md:flex-row">
              {insta_images &&
                insta_images.slice(0, 4).map((image) => (
                  <div
                    className=" relative basis-1/5 m-5 shadow-lg shadow-skin-shadow"
                    key={image.id}
                  >
                    <a href={image.permalink}>
                      <img
                        className="overflow-hidden bg-cover bg-center w-full h-full transition-all ease-in-out hover:scale-105"
                        src={image.media_url}
                        alt={"image"}
                      />
                    </a>
                  </div>
                ))}
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
