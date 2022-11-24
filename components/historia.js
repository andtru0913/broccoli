const Historia = ({ title, intro, year, timelinedesc }) => {
  return (
    <section className=" bg-gradient-to-br from-skin-hue to-skin-no">
      <div className="layout  text-skin-inverted text-center py-12  flex flex-col  flex-1  items-center justify-center   lg:gap-20 gap-8 ">
        <div className=" lg:max-w-readable flex flex-col gap-4 ">
          <h1 className="">{title ?? "Historia"}</h1>

          <h4 className="text-justify ">{intro ?? "Broccolis historia"}</h4>
        </div>
        {/**flex   lg:flex-row tablet:flex-row tablet:flex-wrap  lg:flex-wrap   gap-4 */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <div className="w-full  flex flex-col items-center ">
            <div className=" border-2 h-32 flex-1  lg:p-4 p-4 flex flex-col items-center">
              <h4 className="font-bold">{year ?? "1993"}</h4>
              <p className=" ">
                {timelinedesc ??
                  " Broccoli grundades av Björn Bergholm vid sidan om Chalmersstudierna. Genom åren har företaget vuxit och är numera ett väl utvecklat teknikkonsultbolag specialiserat inom elektronikutveckling."}
              </p>
            </div>
          </div>

          <div className=" w-full   flex flex-col items-center ">
            <div className=" flex-1 border-2  lg:p-4 p-4 flex flex-col items-center ">
              <h4 className="font-bold">2000</h4>
              <p className="">
                Genom åren har företaget vuxit och är numera ett väl utvecklat
                teknikkonsultbolag specialiserat inom elektronikutveckling.
              </p>
            </div>
          </div>

          <div className=" w-full flex flex-col items-center ">
            <div className=" w-full flex-1 border-2  lg:p-4 p-4 flex flex-col items-center ">
              <h4 className="font-bold">2018</h4>
              <p className=" ">Broccoli köper Broccoligården</p>
            </div>
          </div>
          <div className="w-full flex flex-col items-center ">
            <div className=" border-2 flex-1  lg:p-4 p-4 flex flex-col items-center">
              <h4 className="font-bold">1993</h4>
              <p className=" ">
                Broccoli grundades av Björn Bergholm vid sidan om
                Chalmersstudierna. Genom åren har företaget vuxit och är numera
                ett väl utvecklat teknikkonsultbolag specialiserat inom
                elektronikutveckling.
              </p>
            </div>
          </div>

          <div className=" w-full   flex flex-col  items-center ">
            <div className=" flex-1 border-2  lg:p-4 p-4 flex flex-col items-center ">
              <h4 className="font-bold">Nutid</h4>
              <p className=" ">
                Med vår hårdvaru- och mjukvarukompetens kan vi erbjuda tjänster
                inom design, konstruktion och testning av inbyggda system. Vi
                hjälper till att täcka behov i gränslandet mellan hårdvara och
                mjukvara i flera olika branscher.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Historia;
