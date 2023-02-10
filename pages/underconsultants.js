import Page from "../components/page";
import { getPage, getUserinfo } from "../Database";
import { underconsultants } from "../defaultIDs";
import Layout from "../components/layout/layout";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { verify } from "../tokens";
import Image from "next/image";

export async function getServerSideProps(context) {
  const pageId = underconsultants;
  const pageName = "underconsultants";
  const user_id = await verify(
    JSON.parse(context.req.cookies["token"] || null)
  );
  const user = await getUserinfo(user_id);
  const page = (await getPage(pageId))[0];
  return {
    props: {
      admin: !!user ? user.admin : false,
      pageId: pageId,
      page: page,
      pageName: pageName,
    },
  };
}

export default function Underconsultants({ admin, page, pageName, click }) {
  useEffect(() => {
    AOS.init({ duration: 2500 });
  }, []);
  return (
    <Layout>
      <Page
        authentication={admin}
        page={page}
        image={pageName}
        redirect={pageName}
        formTitle="ANSÖK OM ATT BLI UNDERKONSULT"
      >
        <div className="bg-secondary-l1">
          <div className="grid md:grid-cols-9 grid-rows-2 md:grid-rows-1">
            <div className="bg-secondary-1 pb-20 md:pb-0  p-8 md:px-24 lg:py-28 lg:px-32 lg:pr-56 text-justify md:col-span-5 md:col-start-1">
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
            <div className=" mx-4 md:mr-16 lg:mr-28 md:-ml-20 lg:-ml-44 -mt-14 md:mt-0 md:col-span-4 md:col-end-10">
              <Image alt={""} height={"600"} width={"600"} className=" " src="/images/ucon.png"></Image>
            </div>
          </div>
        </div>
      </Page>
    </Layout>
  );
}
