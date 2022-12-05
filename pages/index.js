import Image from "next/image";
import Layout from "../components/layout/layout";
import { HiArrowRight } from "react-icons/hi";
import { FaBed, FaFacebookSquare, FaSwimmer } from "react-icons/fa";
import { MdKitchen } from "react-icons/md";
import broccoligarden from "../public/images/kranar.png";
import "chart.js/auto";
import { Doughnut } from "react-chartjs-2";
import { getGenderCount } from "../Database";
import computerWhite from "../public/images/darkMode/computerWhite.png";
import computerBlack from "../public/images/lightMode/computerBlack.png";
import Reviews from "../components/toWorkAtBroccoli/reviews";
import ThemedImage from "../components/themedImage";
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
        borderWidth: 2,
        borderColor: ["rgb(75, 146, 91)", "rgb( 23, 20, 39)"],
        backgroundColor: ["rgb(75, 146, 91)", "rgb( 23, 20, 39)"],
        data: genderCount,

        tooltip: {
          callbacks: {
            label: function (context) {
              let value = context.formattedValue;
              let sum = 0;
              let dataArr = context.chart.data.datasets[0].data;
              dataArr.map((data) => {
                sum += Number(data);
              });
              return ((value * 100) / sum).toFixed(0) + "%";
            },
          },
        },

        hoverBorderWidth: 5,
        hoverBorderColor: ["rgb(104, 183, 122)", "rgb(40, 35, 64)"],
      },
    ],
  };
  const insta_images = feed.data;
  return (
    <Layout className="relativ">
      <main>
        <div className=" overflow-hidden h-screen bg-center ">
          <Image
            src="/images/gothenburg.jfif"
            layout="fill"
            objectFit="cover"
            alt="Siluette of Gothenburg"
          />
        </div>

        <svg
          className="absolute top-80 lg:top-96  right-0 h-auto fill-secondary-1 w-3/4 md:lg:w-1/2 xl:w-11/12 -z-10"
          width="770"
          height="1048"
          viewBox="0 0 770 1048"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M48.3323 721.52C-17.2708 593.114 -67.2673 272.303 257.572 16.3055L823.14 0L833.498 122.292L848 831.583L808.638 984.447C796.208 1007.55 714.998 1052.52 489.6 1047.63C207.852 1041.52 218.21 986.485 203.708 984.447C192.107 982.817 95.2904 808.483 48.3323 721.52Z" />
        </svg>

        <section className="relative">
          <div className=" pb-12  flex flex-col justify-center">
            <div className=" p-4  lg:col-span-2 flex flex-col items-center gap-2 ">
              <div className="  lg:max-w-readable flex justify-center">
                <h4 className="text-center">
                  Hos broccoli jobbar ingenjörer med olika inriktningar främst
                  inom:
                </h4>
              </div>
              <div className="flex flex-row flex-wrap flex-auto justify-center  gap-2">
                <div className=" flex flex-col items-center ">
                  <div className="relative">
                    <div className=" w-20 h-20">
                      <ThemedImage
                        img_path_light={computerBlack}
                        img_path_dark={computerWhite}
                      />
                    </div>
                  </div>

                  <div className="bg-primary-1 py-4 px-6 ">
                    <p className="font-medium">Data</p>
                  </div>
                </div>
                <div className="flex flex-col items-center  ">
                  <div className="relative">
                    <div className=" w-20 h-20">
                      <ThemedImage
                        img_path_light={computerBlack}
                        img_path_dark={computerWhite}
                      />
                    </div>
                  </div>

                  <div className="bg-primary-1 py-4 px-6">
                    <p className="font-medium">Mjukvara</p>
                  </div>
                </div>
                <div className="flex flex-col items-center ">
                  <div className="relative">
                    <div className=" w-20 h-20">
                      <ThemedImage
                        img_path_light={computerBlack}
                        img_path_dark={computerWhite}
                      />
                    </div>
                  </div>

                  <div className="bg-primary-1 py-4 px-6">
                    <p className="font-medium">Elektronik</p>
                  </div>
                </div>
                <div className="flex flex-col items-center  ">
                  <div className="relative">
                    <div className=" w-20 h-20">
                      <ThemedImage
                        img_path_light={computerBlack}
                        img_path_dark={computerWhite}
                      />
                    </div>
                  </div>

                  <div className="bg-primary-1 py-4 px-6">
                    <p className="font-medium">Mekatronik</p>
                  </div>
                </div>
                <div className="flex flex-col items-center ">
                  <div className="relative">
                    <div className=" w-20 h-20">
                      <ThemedImage
                        img_path_light={computerBlack}
                        img_path_dark={computerWhite}
                      />
                    </div>
                  </div>

                  <div className="bg-primary-1 py-4 px-6">
                    <p className="font-medium">Teknisk Fysik</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <svg
            className="absolute top-80 lg:top-32 h-auto left-0 hidden w-4/5 lg:w-1/2 -z-10"
            width="721"
            height="816"
            viewBox="0 0 721 816"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M254 718C200 736.597 -72.2149 998.228 -74 576L-50 0C-21.7366 25.3337 142 144 204 160C238.818 168.985 376.587 182 414 244C457.645 316.327 603.523 269.11 666 324C728.477 378.89 725.157 471.221 714 524C702.843 576.779 695.089 664.333 646 696C606.729 721.334 532 680 442 680C352 680 308 699.403 254 718Z" />
          </svg>
        </section>

        <section className="">
          <div className=" pb-12 lg:py-12 xl:py-48  flex flex-col justify-center">
            <div className="py-2  lg:p-4 text-center">
              <h1 className="uppercase font-bold ">Att jobba hos broccoli</h1>
            </div>
            <div className="layout grid grid-cols-1 lg:grid lg:grid-cols-2 gap-6 lg:gap-12 lg:pt-12 ">
              <div className="flex flex-col items-center gap-12 md:pt-12 lg:pt-0">
                <p className="h4 md:h3 text-center lg:max-w-lg xl:max-w-xl leading-relaxed">
                  På Broccoli arbetar vi inkluderande, visar ömsesidig respekt
                  och är måna om att nås av rätt information vid rätt tidpunkt.
                  Genom våra individuella egenskaper bygger vi en stark
                  gemenskap. Vi eftersträvar diversitet då det stärker oss som
                  grupp och utvecklar oss som individer.
                </p>
                <div className="w-56 h-56 xl:w-80 xl:h-80">
                  <Doughnut className="" data={chartData}></Doughnut>
                </div>
                <div>
                  <p></p>
                </div>
              </div>
              <div className="flex flex-col  flex-1 lg:w-4/5">
                <Reviews />
              </div>
            </div>
          </div>
        </section>

        <section className="relative  mx-0">
          <div className=" pb-12 lg:py-12 text-center overflow-hidden ">
            <h1 className=" uppercase font-bold ">Våra kärnvärden</h1>
            <div className="grid grid-cols-1 grid-flow-row  md:grid-cols-3 w-full py-8 cursor-default  h-2/3">
              <div className="relative  bg-tertiary-1 text-inverted p-8 md:p-4 lg:p-8 2xl:p-20 flex flex-col w-full flex-1 gap-8 z-20 h-full text-left ">
                <h2 className="font-bold uppercase">Relationer</h2>

                <p className="text-justify">
                  På Broccoli arbetar vi inkluderande, visar ömsesidig respekt
                  och bjuder aktivt in berörda i dialogen. Genom våra olikheter
                  bygger vi en stark gemenskap. Vi eftersträvar olikheter då det
                  stärker oss som grupp och utvecklar oss som individer. Vi lär
                  oss även kontinuerligt genom kunskapsdelning och inspiration
                  av varandra vilket leder till vår trevliga företagskultur.
                </p>
              </div>
              <div className="relative rounded">
                <div className=" bg-secondary-1 p-8 md:p-4 lg:p-8 2xl:p-20 flex  flex-col w-full flex-1 gap-8 z-20 h-full text-left">
                  <p className="h3 lg:h2 shrink font-bold uppercase">
                    Professionalism
                  </p>

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
                <div className=" bg-primary-1 p-8 md:p-4 lg:p-8 2xl:p-20 flex flex-col w-full flex-1 gap-8 z-20 h-full text-left">
                  <h2 className="font-bold uppercase">Hållbar utveckling</h2>
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
        <svg
          className="absolute  right-0 fill-secondary-1 w-3/4 h-auto md:lg:w-1/2 xl:w-1/3 -z-10"
          width="696"
          height="1224"
          viewBox="0 0 696 1224"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M43.7667 896.684C-21.8364 768.278 -57.4046 452.161 267.434 196.164C352.421 130.136 386.634 115.939 485.034 56.1637C583.434 -3.61172 912.455 -71.2783 818.574 175.164L828.933 297.455L843.434 1006.75L804.073 1159.61C791.643 1182.71 710.433 1227.69 485.034 1222.79C203.286 1216.68 213.644 1161.65 199.143 1159.61C187.541 1157.98 90.7248 983.647 43.7667 896.684Z" />
        </svg>
        <svg
          className="absolute left-0 fill-tertiary-1 w-3/4 h-auto md:lg:w-1/2 xl:w-1/3 -z-10"
          width="584"
          height="816"
          viewBox="0 0 584 816"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M117 718C63 736.597 -209.215 998.228 -211 576L-187 0C-158.737 25.3337 5 144 67 160C101.818 168.985 239.587 182 277 244C320.645 316.327 466.523 269.11 529 324C591.477 378.89 588.157 471.221 577 524C565.843 576.779 558.089 664.333 509 696C469.729 721.334 395 680 305 680C215 680 171 699.403 117 718Z" />
        </svg>

        <section className="">
          <div className="layout  lg:py-60">
            <h1 className=" uppercase font-bold text-center ">
              Följ oss på Instagram
            </h1>

            <div className="py-8 flex flex-1 gap-10 align-middle justify-center flex-col lg:flex lg:flex-row md:grid md:grid-cols-2">
              {insta_images &&
                insta_images.slice(0, 4).map((image) => (
                  <div
                    className=" relative basis-1/3 shadow-lg shadow-skin-shadow"
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
            <div className="flex justify-end">
              <a href="https://www.instagram.com/broccoliengineering/">
                <button className=" btn btn-primary">
                  <div className="flex flex-row gap-2  items-center ">
                    Instagram
                    <HiArrowRight />
                  </div>
                </button>
              </a>
            </div>
          </div>
        </section>

        <section className="">
          <div className="pt-12 lg:p-0 flex flex-col items-center ">
            <h1 className=" uppercase font-bold ">Broccoligården</h1>

            <div className=" flex flex-col lg:flex-row bg-tertiary-1 w-full text-inverted mt-8">
              <div className="hidden lg:flex relative w-full max-h-full bg-cover">
                {/**image gallery */}

                <Image
                  alt="broccoligarden"
                  src={broccoligarden}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div className="flex flex-col items-center cursor-default">
                <div className="flex flex-col items-center p-8 md:p-12 cursor-default">
                  {/**information */}
                  <h4 className="uppercase font-bold ">
                    Välkommen till Broccoligården
                  </h4>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 pt-12">
                    <p className="h-auto p-1 text-left shrink max-w-readable">
                      Broccoligården ligger strax utanför svanesund. En idyllisk
                      plats på västkusten. Ta en tur med vänner familj eller
                      jobbteamet och njut av den friska luften, sola på det
                      stora altandäcket, mys inne vid brasan eller varför inte
                      ta ett dopp.
                    </p>

                    <div className="flex flex-row lg:flex-col justify-center items-start gap-12 h-auto  text-center lg:text-left">
                      <div className="flex flex-col lg:flex-row items-center text-inverted gap-4 ">
                        <FaBed size={30} />
                        <p className="font-bold ">37 bäddar</p>
                      </div>
                      <div className="flex flex-col lg:flex-row items-center text-inverted gap-4 ">
                        <MdKitchen size={30} />
                        <p className="font-bold ">Fullt utrustad kök</p>
                      </div>
                      <div className="flex flex-col lg:flex-row items-center text-inverted gap-4">
                        <FaSwimmer size={30} />
                        <p className="font-bold">100m till havet</p>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-8 pt-12">
                    <div className="mapouter">
                      <div className="gmap_canvas ">
                        <iframe
                          className="w-full h-64"
                          width={277}
                          height={595}
                          id="gmap_canvas"
                          src="https://maps.google.com/maps?q=Broccolig%C3%A5rden%20HALS%20550,%20472%2094%20Svanesund&t=&z=13&ie=UTF8&iwloc=&output=embed"
                        ></iframe>
                      </div>
                    </div>
                    <div className="shrink flex flex-col items-center md:items-start justify-around">
                      <h3>Kontakt</h3>
                      <a href="mailto:engineering@broccoli.se">
                        garden@broccoli.se
                      </a>
                      <h3>Följ oss</h3>
                      <div className="w-min text-green-3 hover:text-opacity-40">
                        <FaFacebookSquare size={40} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
