import Image from "next/image";
import { useEffect, useState } from "react";
import Layout from "../components/layout/layout";
import Historia from "./historia";
import data from "../public/computer.png";
import broccoli from "../public/broccoli.png";
const callback = function (entries) {
  entries.forEach((entry) => {
    const animationType = entry.target.dataset.animateType;
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
export default function About({ title, intro, year, timelinedesc }) {
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
  }, []);

  return (
    <Layout>
      <main>
        <section className=" bg-fill">
          <div className="layout  text-base text-center py-12  flex flex-col flex-1  items-center justify-center   lg:gap-20 gap-8 ">
            <div className=" lg:max-w-readable flex flex-col gap-4 ">
              <h1 className="">{title ?? "Om oss"}</h1>
            </div>
            <div className=" grid tablet:grid-cols-1 grid-cols-1  lg:grid-cols-3 tablet:grid-rows-1 grid-rows-1  lg:grid-rows-2 gap-2">
              <div className=" p-4  lg:col-span-2 flex flex-col items-center gap-2">
                <div className="  lg:max-w-readable flex  justify-center">
                  <h4 className=" lg:w-3/4">
                    Hos broccoli jobbar ingenjörer med olika inriktningar främst
                    inom:
                  </h4>
                </div>

                <div className="flex flex-row flex-wrap flex-auto justify-center  gap-2">
                  <div className="flex flex-col items-center ">
                    <div className="w-12 h-auto">
                      <Image src={data} />
                    </div>

                    <div className="bg-primary-1 py-4 px-6 ">
                      <p className="font-medium">Data</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-center  ">
                    <div className="w-12 h-auto">
                      <Image src={data} />
                    </div>

                    <div className="bg-primary-1 py-4 px-6">
                      <p className="font-medium">Mjukvara</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-center ">
                    <div className="w-12 h-auto">
                      <Image src={data} />
                    </div>

                    <div className="bg-primary-1 py-4 px-6">
                      <p className="font-medium">Elektronik</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-center  ">
                    <div className="w-12 h-auto">
                      <Image src={data} />
                    </div>

                    <div className="bg-primary-1 py-4 px-6">
                      <p className="font-medium">Mekatronik</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-center ">
                    <div className="w-12 h-auto">
                      <Image src={data} />
                    </div>

                    <div className="bg-primary-1 py-4 px-6">
                      <p className="font-medium">Teknisk Fysik</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="hidden tablet:hidden  lg:flex  lg:row-span-2">
                <div className="w-full h-auto relative">
                  <Image src={broccoli} />
                  <div className="absolute lg:text-sm xl:text-base lg:top-14 xl:top-16  lg:left-8 left-6 w-1/2 font-medium">
                    <p>
                      Merparten av våra konsulter är förlagda hos kund men vi
                      har även inhouse projekt av olika storlekar.
                    </p>
                  </div>
                </div>
              </div>
              <div className=" lg:hidden tablet:flex   lg:col-span-2 flex flex-col justify-center items-center">
                <div className="p-4 rounded-lg  tablet:w-3/4 bg-primary-l1 text-skin-inverted">
                  <h4>
                    Merparten av våra konsulter är förlagda hos kund men vi har
                    även inhouse projekt av olika storlekar.
                  </h4>
                </div>
              </div>
              <div className="  lg:col-span-2 flex flex-col justify-center items-center">
                <div className="p-4 rounded-lg tablet:w-3/4 bg-primary-l1 text-skin-inverted">
                  <h4>
                    Vi kan erbjuda tjänster inom Mjukvaruutveckling, design,
                    konstruktion, testning och inbyggda system. Med vår
                    kompetens kan vi fylla gränslandet mellan hårdvara och
                    mjukvara.
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Historia />

        <section className="bg-fill">
          <div className="layout py-12 flex flex-col items-center">
            <div className=" md:max-w-readable flex flex-col gap-4 text-center">
              <h1>{title ?? "kvalitets- och miljöpolicy"}</h1>

              <h4 className=" text-justify">
                {intro ??
                  "Broccoli är ett ingenjörsbolag inom hårdvaru- och mjukvaruutveckling, och då främst inbyggda system. Vi erbjuder konsulttjänster och utbildning. Våra kunder finns till största delen inom fordonsindustrin i Västsverige. Vi vill skapa en attraktiv arbetsplats med nöjda medarbetare som trivs och utvecklas."}
              </h4>
            </div>
            <div className=" py-12 flex flex-col">
              <div className=" py-12 grid  lg:grid-cols-2 grid-cols-1 place-items-center lg:justify-items-end  lg:gap-8 gap-4">
                <div className=" overflow-hidden">
                  <Image
                    src="/images/gothenburg.jfif"
                    width={300}
                    height={200}
                    objectFit="cover"
                    alt="Siluette of Gothenburg"
                  />
                </div>
                <div className="text-center lg:text-left md:w-1/2 lg:max-w-readable flex flex-col gap-4 align-top lg:place-self-start">
                  <h3>{title ?? "VÅRT KVALITETSARBETE"}</h3>

                  <p className=" text-justify">
                    {intro ??
                      "Vi vill ha nöjda kunder och en förutsättning för detta är rätt konsult på rätt plats, detta är självklarheter för oss."}
                  </p>
                </div>
              </div>
              <div className=" py-12 grid  lg:grid-cols-2 grid-cols-1 place-items-center lg:justify-items-end  lg:gap-8 gap-4">
                <div className="overflow-hidden">
                  <Image
                    src="/images/gothenburg.jfif"
                    width={300}
                    height={200}
                    objectFit="cover"
                    alt="Siluette of Gothenburg"
                  />
                </div>
                <div className="text-center lg:text-left  md:w-1/2 lg:max-w-readable flex flex-col  gap-4 lg:place-self-start">
                  <h3>{title ?? "VÅRT MILJÖÅTAGANDE"}</h3>

                  <p className=" text-justify">
                    {intro ??
                      "Vi vill skydda vår miljö och förhindra förorening genom medvetna val. Vi vill minska vår klimatpåverkan och bidra till ett hållbart samhälle genom att utveckla tjänster och produkter som är mer energieffektiva , samt reducera våra CO2 ekvivalenta utsläpp som påverkar växthuseffekten. Vi följer de lagar och krav som vi omfattas av och vi jobbar med att ständigt förbättra vår verksamhet."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
