import Page from "../components/page";
import { getPage, getUserinfo } from "../Database";
import { underconsultants } from "../defaultIDs";
import Layout from "../components/layout/layout";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { verify } from "../tokens";

export async function getServerSideProps(context) {
  const pageId = underconsultants;
  const pageName = "underconsultants";
  const user_id = await verify(
    JSON.parse(context.req.cookies["token"] || null)
  );
  const [user, page] = await Promise.all([
    getUserinfo(user_id),
    getPage(pageId),
  ]);
  return {
    props: {
      admin: !!user ? user.admin : false,
      pageId: pageId,
      pagestring: JSON.stringify(page[0]),
      pageName: pageName,
    },
  };
}

export default function Underconsultants({
  admin,
  pagestring,
  pageName,
  click,
}) {
  useEffect(() => {
    AOS.init({ duration: 2500 });
  }, []);
  const page = JSON.parse(pagestring);
  return (
    <Layout>
      <Page
        authentication={admin}
        page={page}
        image={pageName}
        redirect={pageName}
        buttonName="Kontakta oss"
      >
        <div className=" bg-secondary-1 w-full pt-48 sm:pt-0">
          <div className="flex flex-row justify-center">
            <div className=" text-justify py-8 px-4">
              <a onClick={click} href="#linkForm">
                <h3
                  className="uppercase font-bold pb-5 pt-8 mb:pt-0 md:h1"
                  data-aos="fade-right"
                  data-aos-once="true"
                >
                  Vad vi kan göra
                </h3>
                <p
                  className="max-w-readable py-2"
                  data-aos="fade-right"
                  data-aos-once="true"
                  data-aos-delay="500"
                >
                  Driver du ett eget konsultföretag och är på jakt efter nytt
                  uppdrag, då kan vi vara din nya partner. Vi har ett logiskt,
                  transparent och attraktivt upplägg för dig som vill fokusera
                  mer på tekniken än att granska finstilta avtal. Vi har själva
                  varit små och genom åren lärt oss att man behöver en pålitlig
                  partner för att hitta de mest intressanta uppdragen hos kunder
                  där man själv inte har ett ramavtal. Kontakta oss ifall du
                  vill ha hjälp att hitta ditt nästa uppdrag eller ifall du
                  redan hittat ett uppdrag och behöver en väg in till kunden, så
                  syr vi tillsammans ihop det administrativa.
                </p>
              </a>
            </div>
          </div>
        </div>
      </Page>
      <form method="POST" action="./api/send_email" encType={"multipart/form-data"}>
        <div className="  flex flex-col ">
          <div id="linkForm" className=" w-full  md:p-12">
            <input type={"hidden"} name={"pagetitle"} value={pageName} />
            <input type={"hidden"} name={"redirect"} value={"../posts"} />
            {/**title */}

            <div className="relative flex  flex-row ">
              <div className="flex-1 flex justify-center md:justify-start  p-2 text-2xl">
                <p className=" pt-12 flex self-center md:self-auto uppercase">
                  ANSÖK OM ATT BLI UNDERKONSULT
                </p>
              </div>
            </div>

            {/**first and last name */}
            <div className="relative flex flex-wrap flex-col md:flex-row ">
              <div className="flex flex-1 flex-col p-2">
                <label className="text-base pb-1" htmlFor="first">
                  Förnamn
                </label>
                <input
                    className=" text-sm p-2 border border-slate-900 appearance-none  leading-tight hover:border-dashed autofill:bg-primary-1 autofill:focus:bg-primary-1"
                    type="text"
                    id="first"
                    name="first"
                    placeholder="Förnamn..."
                    required
                />
              </div>
              <div className="flex flex-1 flex-col p-2">
                <label className="text-base pb-1" htmlFor="last">
                  Efternamn
                </label>
                <input
                    className="text-sm p-2 border  border-slate-900 appearance-none  leading-tight focus:border-dashed hover:border-dashed  "
                    autoComplete="on"
                    type="text"
                    id="last"
                    name="last"
                    placeholder="Efternamn..."
                    required
                />
              </div>
            </div>
            {/**mail and phone*/}
            <div className="relative flex flex-wrap flex-col md:flex-row  ">
              <div className="flex flex-1 flex-col p-2">
                <label className="text-base pb-1" htmlFor="first">
                  E-post
                </label>
                <input
                    className=" text-sm p-2 border  border-slate-900 appearance-none  leading-tight focus:border-dashed hover:border-dashed "
                    type="email"
                    id="email"
                    name="email"
                    placeholder="example@mail.com "
                    required
                />
              </div>
              <div className="flex flex-1 flex-col p-2">
                <label className="text-base pb-1" htmlFor="last">
                  Telefonnummer
                </label>
                <input
                    className=" text-sm p-2 border border-slate-900 aappearance-none  leading-tight focus:border-dashed hover:border-dashed"
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder="07xxxxxxxx "
                    required
                />
              </div>
            </div>

            {/**free text */}
            <div className="relative flex flex-wrap flex-col md:flex-row">
              <div className="flex flex-1 flex-col p-2">
                <label className="text-base pb-1" htmlFor="first">
                  Egen text
                </label>
                <textarea
                    className=" text-sm p-2 border  border-slate-900  appearance-none leading-tight text-wrap focus:border-dashed hover:border-dashed"
                    id="freetext"
                    name="freetext"
                    placeholder="Berätta något om dig själv! :)"
                />
              </div>
            </div>

            {/**attatchment */}

            <div className="relative flex flex-wrap flex-row ">
              <div className="flex flex-1 flex-col p-2  w-screen md:w-full">
                <label className="text-base pb-1" htmlFor="first">
                  Infoga fil (CV och/eller personligt brev)
                </label>
                <input
                    className="form-control block px-3 py-1.5 text-base font-normal text-muted  solid  border  border-slate-900 focus:text-muted focus:border-dashed hover:border-dashed"
                    type="file"
                    id="formFile"
                    name="file"
                    multiple={true}
                />
              </div>
            </div>
            {/**attatchment */}

            <div className="relative flex flex-wrap flex-row  ">
              <div className="flex flex-1 flex-row p-2">
                <label className="text-xs pb-1 text-muted" htmlFor="first">
                  Genom att skicka in detta formulär godkännder du att dina
                  uppgifter sparas
                </label>
              </div>
            </div>
            {/**submit */}

            <div className="relative flex justify-end flex-row z-20   ">
              <div className=" p-2 ">
                <button
                    id="formSubmit"
                    type="submit"
                    className=" btn btn-primary "
                >
                  Skicka in
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </Layout>
  );
}

/**
 * <div className="bg-secondary-1">
          <div className="grid md:grid-cols-9 grid-rows-2 md:grid-rows-1">
            <div className=" pb-20 md:pb-0  p-8 md:px-24 lg:py-28 lg:px-32 lg:pr-56 text-justify md:col-span-5 md:col-start-1">
              <a onClick={click} href="#linkForm">
                <h1
                  className="uppercase font-bold pb-5 pt-8 mb:pt-0"
                  data-aos="fade-right"
                  data-aos-once="true"
                >
                  Vad vi kan göra
                </h1>
                <p
                  className="max-w-readable "
                  data-aos="fade-right"
                  data-aos-once="true"
                  data-aos-delay="500"
                >
                  Driver du ett eget konsultföretag och är på jakt efter nytt
                  uppdrag, då kan vi vara din nya partner. Vi har ett logiskt,
                  transparent och attraktivt upplägg för dig som vill fokusera
                  mer på tekniken än att granska finstilta avtal. Vi har själva
                  varit små och genom åren lärt oss att man behöver en pålitlig
                  partner för att hitta de mest intressanta uppdragen hos kunder
                  där man själv inte har ett ramavtal. Kontakta oss ifall du
                  vill ha hjälp att hitta ditt nästa uppdrag eller ifall du
                  redan hittat ett uppdrag och behöver en väg in till kunden, så
                  syr vi tillsammans ihop det administrativa.
                </p>
              </a>
            </div>
          </div>
        </div>
 */
