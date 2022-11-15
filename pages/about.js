import Image from "next/image";
import { useEffect, useState } from "react";
import Layout from "../components/layout/layout";
import Historia from "./historia";
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
      <section className="  bg-gradient-to-br from-skin-hue to-skin-no">
        <div className="layout  text-skin-inverted text-center py-12  flex flex-col flex-1  items-center justify-center  md:gap-20 gap-8 ">
          <div className="md:max-w-readable flex flex-col gap-4">
            <h1>{title ?? "om oss"}</h1>

            <h4 className="">
              {intro ??
                "Merparten av våra konsultuppdrag är förlagda hos kund, och en mindre del är inhouse projekt av varierande storlek. Våra kunder är ofta produktutvecklande företag som återfinns inom diverse olika branscher såsom fordon, automation, marin, medicin med flera. Gemensamt för alla är att de arbetar med elektronik av något slag i sin verksamhet."}
            </h4>
          </div>
          <div className="flex flex-col  md:flex-row gap-4">
            <div className="w-full flex flex-col items-center ">
              <div className="md:w-full w-3/4 border-2 h-32 flex-1 md:p-4 p-4 flex flex-col items-center">
                <h4 className="font-bold">{year ?? "1993"}</h4>
                <p className=" ">
                  {timelinedesc ??
                    " Broccoli grundades av Björn Bergholm vid sidan om Chalmersstudierna. Genom åren har företaget vuxit och är numera ett väl utvecklat teknikkonsultbolag specialiserat inom elektronikutveckling."}
                </p>
              </div>
            </div>

            <div className=" w-full   flex flex-col items-center ">
              <div className="md:w-full w-3/4 flex-1 border-2 md:p-4 p-4 flex flex-col items-center ">
                <h4 className="font-bold">2000</h4>
                <p className=" ">
                  Genom åren har företaget vuxit och är numera ett väl utvecklat
                  teknikkonsultbolag specialiserat inom elektronikutveckling.
                </p>
              </div>
            </div>

            <div className=" w-full   flex flex-col items-center ">
              <div className=" md:w-full w-3/4 flex-1 border-2 md:p-4 p-4 flex flex-col items-center ">
                <h4 className="font-bold">2018</h4>
                <p className=" ">Broccoli köper Broccoligården</p>
              </div>
            </div>
            <div className="w-full flex flex-col items-center ">
              <div className="md:w-full w-3/4 border-2 flex-1 md:p-4 p-4 flex flex-col items-center">
                <h4 className="font-bold">1993</h4>
                <p className=" ">
                  Broccoli grundades av Björn Bergholm vid sidan om
                  Chalmersstudierna. Genom åren har företaget vuxit och är
                  numera ett väl utvecklat teknikkonsultbolag specialiserat inom
                  elektronikutveckling.
                </p>
              </div>
            </div>

            <div className=" w-full   flex flex-col  items-center ">
              <div className="md:w-full w-3/4  flex-1 border-2 md:p-4 p-4 flex flex-col items-center ">
                <h4 className="font-bold">Nutid</h4>
                <p className=" ">
                  Med vår hårdvaru- och mjukvarukompetens kan vi erbjuda
                  tjänster inom design, konstruktion och testning av inbyggda
                  system. Vi hjälper till att täcka behov i gränslandet mellan
                  hårdvara och mjukvara i flera olika branscher.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-skin-fill">
        <div className="layout py-12 flex flex-col items-center">
          <div className="md:max-w-readable flex flex-col gap-4 text-center">
            <h1>{title ?? "kvalitets- och miljöpolicy"}</h1>

            <h4 className="">
              {intro ??
                "Broccoli är ett ingenjörsbolag inom hårdvaru- och mjukvaruutveckling, och då främst inbyggda system. Vi erbjuder konsulttjänster och utbildning. Våra kunder finns till största delen inom fordonsindustrin i Västsverige. Vi vill skapa en attraktiv arbetsplats med nöjda medarbetare som trivs och utvecklas."}
            </h4>
          </div>
          <div className=" py-12 flex flex-col">
            <div className=" py-12 grid md:grid-cols-2 grid-cols-1 md:justify-items-end md:gap-8 gap-4">
              <div className=" overflow-hidden">
                <Image
                  src="/images/gothenburg.jfif"
                  width={300}
                  height={200}
                  objectFit="cover"
                  alt="Siluette of Gothenburg"
                />
              </div>
              <div className="md:max-w-readable flex flex-col gap-4 align-top">
                <h3>{title ?? "VÅRT KVALITETSARBETE"}</h3>

                <p className="">
                  {intro ??
                    "Vi vill ha nöjda kunder och en förutsättning för detta är rätt konsult på rätt plats, detta är självklarheter för oss."}
                </p>
              </div>
            </div>
            <div className=" py-12 grid md:grid-cols-2 grid-cols-1 md:justify-items-end md:gap-8 gap-4">
              <div className="overflow-hidden">
                <Image
                  src="/images/gothenburg.jfif"
                  width={300}
                  height={200}
                  objectFit="cover"
                  alt="Siluette of Gothenburg"
                />
              </div>
              <div className="md:max-w-readable flex flex-col  gap-4">
                <h3>{title ?? "VÅRT MILJÖÅTAGANDE"}</h3>

                <p className="">
                  {intro ??
                    "Vi vill skydda vår miljö och förhindra förorening genom medvetna val. Vi vill minska vår klimatpåverkan och bidra till ett hållbart samhälle genom att utveckla tjänster och produkter som är mer energieffektiva , samt reducera våra CO2 ekvivalenta utsläpp som påverkar växthuseffekten. Vi följer de lagar och krav som vi omfattas av och vi jobbar med att ständigt förbättra vår verksamhet."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
