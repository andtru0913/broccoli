import { getPage } from "../Database";
import Page from "../components/page";
import { career } from "../defaultIDs";
import Layout from "../components/layout/layout";
import { FaHandshake, FaRunning, FaPhoneAlt } from "react-icons/fa";
import { BiHealth } from "react-icons/bi";
import { GiPartyFlags, GiSmartphone } from "react-icons/gi";

export async function getServerSideProps(context) {
  const pageId = career;
  const pageName = "career";
  let cookies = JSON.parse(context.req.cookies["user"] || null);
  const page = (await getPage(pageId))[0];
  return {
    props: {
      admin: !!cookies ? cookies.admin : false,
      page: page,
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
  return (
    <Layout>
      <Page
        authentication={admin}
        page={page}
        redirect={pageName}
        formTitle="SPONTANANSÖKAN"
        image={pageName}
      >
        <div className="bg-secondary-l1 ">
          <div className="grid md:grid-cols-9 grid-rows-2 md:grid-rows-1">
            <div className=" mx-4 md:ml-16 md:-mr-64 -mt-14 md:mt-0 md:col-span-4 md:col-start-1 z-10">
              <img className="z-10 " src="/images/career1.png"></img>
            </div>
            <div className="bg-secondary-1 pb-20 md:pb-0  p-8 md:py-28  lg:py-20 lg:px-40 lg:pl-56  text-justify  md:col-span-5 md:col-end-10">
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
          </div>
        </div>

        {/*
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
        <section className="bg-secondary-l1 ">
          <div className="pt-12 flex flex-col px-5 text-center items-center justify-center ">
            <h2 className="font-bold uppercase pb-5">Förmåner hos broccoli</h2>

            <div className=" grid md:grid-cols-5 w-screen justify-center gap-0 ">
              {data.map((data) => {
                return (
                  <div
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
