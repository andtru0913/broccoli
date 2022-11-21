import Image from "next/image";
import Layout from "../components/layout/layout";
import Accordion from "../components/accordion";
import { HiHeart } from "react-icons/hi2";
import { GiTie, GiStumpRegrowth } from "react-icons/gi";
import { FaFacebookSquare } from "react-icons/fa";
import broccoligarden from "../public/images/kranar.png";
import { Doughnut } from "react-chartjs-2";
// noinspection ES6UnusedImports
import Chart from "chart.js/auto";
import { getGenderCount } from "../Database";

export const getStaticProps = async () => {
  const url = `https://graph.instagram.com/me/media?fields=id,caption,media_url,timestamp,media_type,permalink&access_token=${process.env.INSTAGRAM_KEY}`;
  const data = await fetch(url);
  const feed = await data.json();
  return {
    props: {
      feed: feed,
      genderCount: await getGenderCount(),
    },
  };
};

export default function Home({ feed, genderCount }) {
  const chartData = {
    labels: ["Män", "Kvinnor"],
    datasets: [
      {
        data: genderCount,
        tooltip: {
          callbacks: {
            label: function (context) {
              let label = context.label;
              let value = context.formattedValue;

              if (!label) label = "Unknown";

              let sum = 0;
              let dataArr = context.chart.data.datasets[0].data;
              dataArr.map((data) => {
                sum += Number(data);
              });

              let percentage = ((value * 100) / sum).toFixed(0) + "%";
              return label + ": " + percentage;
            },
          },
        },
        backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(255, 159, 64, 0.2)"],
        borderColor: ["rgb(255, 99, 132)", "rgb(255, 159, 64)"],
        borderWidth: 1,
        hoverBorderWidth: 8,
        hoverBorderColor: ["rgb(255, 99, 132)", "rgb(255, 159, 64)"],
      },
    ],
  };
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
        </header>

        <section className="">
          <div className="layout py-12  flex flex-col justify-center">
            <div className="py-2  lg:p-4 text-center">
              <h2>Att jobba hos broccoli</h2>
            </div>

            <div className=" flex flex-col  lg:items-center">
              <Accordion />
            </div>
          </div>
        </section>
        <section>
          <Doughnut className="h-auto w-48" data={chartData}></Doughnut>
        </section>

        <section className="relative">
          <svg
            className="absolute top-14 fill-primary-l2 w-1/2"
            viewBox="0 0 721 805"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M254 707C200 725.597 -72.2149 987.228 -74 565L-50 -11C-21.7366 14.3337 142 133 204 149C238.818 157.985 376.587 171 414 233C457.645 305.327 603.523 258.11 666 313C728.477 367.89 725.157 460.221 714 513C702.843 565.779 695.089 653.333 646 685C606.729 710.334 532 669 442 669C352 669 308 688.403 254 707Z" />
          </svg>

          <div className="layout py-12 text-center text-base overflow-hidden ">
            <h2 className=" ">Våra kärnvärden</h2>
            <div className="grid grid-cols-1 grid-flow-row  lg:grid-cols-3 justify-center gap-4 py-8   lg:px-40 cursor-default">
              <div className="relative rounded">
                <div className="flex flex-col  flex-1 bg-gradient-to-br from-hue to-ho bg-opacity-60   p-4 z-20 h-full items-center ">
                  <div className="text-red-500 h-12  flex items-center">
                    <HiHeart size={30} />
                  </div>
                  <h4 className="  h-12  flex items-center">RELATIONER</h4>

                  <p className="text-justify">
                    På Broccoli arbetar vi inkluderande, visar ömsesidig respekt
                    och bjuder aktivt in berörda i dialogen. Genom våra
                    olikheter bygger vi en stark gemenskap. Vi eftersträvar
                    olikheter då det stärker oss som grupp och utvecklar oss som
                    individer. Vi lär oss även kontinuerligt genom
                    kunskapsdelning och inspiration av varandra vilket leder
                    till vår trevliga företagskultur.
                  </p>
                </div>
              </div>
              <div className="relative rounded">
                <div className="flex flex-col flex-1 bg-secondary-1  bg-opacity-60 p-4 z-20 h-full items-center ">
                  <div className="text-blue-500 h-12  flex items-center">
                    <GiTie size={30} />
                  </div>
                  <h4 className="  h-12  flex items-center">PROFESSIONALISM</h4>

                  <p className="text-justify">
                    Nöjda kunder får vi genom att prioritera god teknisk
                    kompetens och kvalitet samt genom att vara lyhörda till
                    behoven. Vi är den pålitliga partnern med goda ambitioner
                    och fokus på att garantera en bra leverans. Kontinuerlig
                    utveckling genom feedback, erfarenhet och utbildning leder
                    till arbetsglädje, nätverkande och ett högt engamenang.
                  </p>
                </div>
              </div>
              <div className="relative rounded">
                <div className="flex flex-col flex-1 bg-secondary-1  bg-opacity-60 p-4 z-20 h-full items-center ">
                  <div className="text-green-500 h-12  flex items-center">
                    <GiStumpRegrowth size={30} />
                  </div>
                  <h4 className=" h-12  flex items-center">
                    HÅLLBAR UTVECKLING
                  </h4>
                  <p className="text-justify">
                    Vi värderar hållbarhet genom ekonomiskt sinne samt personlig
                    och teknisk utveckling. Vi gör medvetna val för en
                    långsiktig utveckling vilket ger oss trygghet, frihet och en
                    känsla av att vi tillsammans bidrar till det bättre.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="">
          <div className="layout  py-12">
            <h2 className="  text-center  lg:ml-12  lg:text-left">
              Följ oss på Instagram
            </h2>
            <a
              className="text-skin-muted hover:opacity-50"
              href="https://www.instagram.com/broccoliengineering/"
            >
              <p className=" text-center  lg:ml-12  lg:text-left">
                @broccoliengineering
              </p>
            </a>
            <div className=" flex flex-1 align-middle justify-center flex-col lg:flex lg:flex-row md:grid md:grid-cols-2">
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

        <section className="">
          <div className="layout  py-12">
            <div className="flex flex-col  text-center    lg:text-left gap-2 mb-2">
              <h2 className=" ">Broccoligården</h2>
              <p> Text om Broccoligården.</p>
            </div>

            <div className="grid grid-cols-1  lg:grid-cols-3  lg:grid-rows-2 gap-2 mx-auto">
              <div className=" lg:col-span-2 w-auto h-64 relative">
                <Image
                  alt="broccoligarden"
                  src={broccoligarden}
                  layout="fill"
                  objectFit="cover"
                />
              </div>

              <div className=" lg:row-span-2 rounded">
                <div class="mapouter">
                  <div class="gmap_canvas ">
                    <iframe
                      className="w-full h-64"
                      width={277}
                      height={595}
                      id="gmap_canvas"
                      src="https://maps.google.com/maps?q=Broccolig%C3%A5rden%20HALS%20550,%20472%2094%20Svanesund&t=&z=13&ie=UTF8&iwloc=&output=embed"
                      frameborder="0"
                      scrolling="no"
                      marginheight="0"
                      marginwidth="0 "
                    ></iframe>
                  </div>
                </div>
              </div>
              <div className="  lg:col-span-2 w-full rounded">
                <div className="grid grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <h3>Kontakt</h3>
                    <a
                      className="hover:text-skin-muted"
                      href="mailto:engineering@broccoli.se"
                    >
                      <div className="flex flex-row  items-center  justify-start py-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-8 h-8"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                          />
                        </svg>

                        <p className=" pl-4 ">garden@broccoli.se</p>
                      </div>
                    </a>
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3>Följ oss</h3>
                    <div className="w-min text-green-3 hover:text-opacity-40">
                      <FaFacebookSquare size={40} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <a
              className="text-skin-muted hover:opacity-50"
              href="https://m.facebook.com/profile.php?id=100063900016888"
            ></a>
            <div className=" flex flex-1 align-middle justify-center flex-col  lg:flex-row"></div>
            <div className="relative rounded  lg:col-span-2"></div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
