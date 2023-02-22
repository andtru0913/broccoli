import { getPage, getUserinfo } from "../Database";
import Page from "../components/page";
import { career } from "../defaultIDs";
import Layout from "../components/layout/layout";
import { FaHandshake, FaRunning } from "react-icons/fa";
import { BiHealth } from "react-icons/bi";
import { GiPartyFlags, GiSmartphone } from "react-icons/gi";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { verify } from "../tokens";

export async function getServerSideProps(context) {
  const pageId = career;
  const pageName = "career";
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
      page: JSON.stringify(page[0]),
      pageName: pageName,
    },
  };
}

export default function Career({ admin, page, pageName, click }) {
  const data = [
    {
      icon_svg: <FaHandshake size={90} />,
      title: "Kollektivavtal",
      text: "Great place to work even with competitive environment. Spent 2 years in a very demanding but empowerful environment. Great iniziatives to promote team working ",
      color: "bg-primary-1",
    },
    {
      icon_svg: <BiHealth size={90} />,
      title: "Företagshälsovård",
      text: "Great place to work even with competitive environment. Spent 2 years in a very demanding but empowerful environment. Great iniziatives to promote team working ",
      color: "bg-primary-l2",
    },
    {
      icon_svg: <FaRunning size={90} />,
      title: "Friskvård",
      text: "Great place to work even with competitive environment. Spent 2 years in a very demanding but empowerful environment. Great iniziatives to promote team working ",
      color: "bg-secondary-d1",
    },

    {
      icon_svg: <GiSmartphone size={90} />,
      title: "Företagstelefon",
      text: "Great place to work even with competitive environment. Spent 2 years in a very demanding but empowerful environment. Great iniziatives to promote team working ",
      color: "bg-primary-l2",
    },
    {
      icon_svg: <GiPartyFlags size={90} />,
      title: "Aktiviteter",
      text: "Great place to work even with competitive environment. Spent 2 years in a very demanding but empowerful environment. Great iniziatives to promote team working ",
      color: "bg-primary-1",
    },
  ];

  useEffect(() => {
    AOS.init({ duration: 2500 });
  }, []);
  return (
    <Layout>
      <Page
        authentication={admin}
        page={page}
        redirect={pageName}
        formTitle="SPONTANANSÖKAN"
        image={pageName}
      >
        <div className=" bg-secondary-1 w-full pt-20 sm:pt-0">
          <div className="flex flex-row justify-center relative z-40">
            <div className=" text-justify py-8 px-4">
              <a onClick={click} href="#linkForm">
                <h3
                  className="uppercase font-bold pb-5 pt-8 mb:pt-0 md:h1"
                  data-aos="fade-right"
                  data-aos-once="true"
                >
                  Spontanansökan
                </h3>
                <p
                  className="max-w-readable py-2"
                  data-aos="fade-right"
                  data-aos-once="true"
                  data-aos-delay="500"
                >
                  Om du är intresserad av att arbeta som ingenjör hos oss och
                  har en utbildning inom Elektronik, Data, IT, Mekatronik eller
                  Teknisk Fysik så är du välkommen att skicka ditt CV samt några
                  rader om dig själv.
                </p>
              </a>
            </div>
          </div>
        </div>

        {/*

<div id="trigger-zoom" className="bg-secondary-l1 ">
          <div className="grid md:grid-cols-9 grid-rows-2 md:grid-rows-1 ">
            <div className="bg-secondary-1 pb-20 md:pb-0  p-8 md:px-24 lg:py-28 lg:px-36 lg:pr-56 text-justify md:col-span-5 md:col-start-1  w-screen md:w-full">
              <a onClick={click} href="#linkForm">
                <h1
                  className="uppercase font-bold pb-5 pt-8 mb:pt-0 h4 md:h1"
                  data-aos="fade-right"
                  data-aos-once="true"
                >
                  Spontanansökan
                </h1>
                <p
                  className="max-w-readable "
                  data-aos="fade-right"
                  data-aos-once="true"
                  data-aos-delay="500"
                >
                  Om du är intresserad av att arbeta som ingenjör hos oss och
                  har en utbildning inom Elektronik, Data, IT, Mekatronik eller
                  Teknisk Fysik så är du välkommen att skicka ditt CV samt några
                  rader om dig själv.
                </p>
              </a>
            </div>
            <div className=" mx-4 md:mr-16 lg:mr-44 md:-ml-20 lg:-ml-64 -mt-14 md:mt-0 md:col-span-4 md:col-end-10">
              <Image
                alt={""}
                width={"600"}
                height={"600"}
                src="/images/career.png"
              ></Image>
            </div>
          </div>
        </div>



        <div>
          <div className="grid md:grid-cols-9 grid-rows-2 md:grid-rows-1">
            <div className="bg-secondary-1 pb-20 md:pb-0  p-8 md:py-28  lg:py-20 lg:px-40 lg:pr-56  text-justify md:col-span-5 md:col-start-1">
              <a onClick={click} href="#linkForm">
                <h1 className="uppercase font-bold pb-5 pt-8 mb:pt-0">
                  Spontanansökan
                </h1>
                <p className="max-w-readable ">
                  Om du är intresserad av att arbeta som ingenjör hos oss och
                  har en utbildning inom Elektronik, Data, IT, Mekatronik eller
                  Teknisk Fysik så är du välkommen att skicka ditt CV samt några
                  rader om dig själv.
                </p>
              </a>
            </div>
            <div className=" mx-4 md:mr-16 md:-ml-64 -mt-14 md:mt-0 md:col-span-4 md:col-end-10">
              <img className=" " src="/images/career.png"></img>
            </div>
          </div>
        </div>
*/}
        <section className="bg-secondary-1 z-20 pt-12 ">
          <div className="pt-12 flex flex-col px-5 text-center items-center justify-center relative z-40 ">
            <h2 className="font-bold uppercase pb-5">Förmåner hos broccoli</h2>

            <div className=" grid md:grid-cols-5 w-screen justify-center gap-0 ">
              {data.map((data, i) => {
                return (
                  <div
                    key={i}
                    className={` flex flex-col items-center w-screen md:w-full  p-8 md:p-10 lg:p-15  ${data.color}`}
                  >
                    {data.icon_svg}
                    <h4 className="uppercase text-lg pt-5 px-8 ">
                      {data.title}
                    </h4>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </Page>
    </Layout>
  );
}
