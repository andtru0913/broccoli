import { authenticate } from "./intranet/admin/authenticate";
import { getPage } from "../Database";
import Page from "../components/page";
import { career } from "../defaultIDs";
import Layout from "../components/layout/layout";
import { FaHandshake, FaCar, FaRunning } from "react-icons/fa";
import { BiHealth } from "react-icons/bi";
import { GiPartyFlags } from "react-icons/gi";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

export async function getServerSideProps(context) {
  const pageId = career;
  const redirect = "../career";
  let authentication = await authenticate(context);
  const page = (await getPage(pageId))[0];
  return {
    props: {
      authentication: authentication === undefined ? null : authentication,
      page: page,
      redirect: redirect,
    },
  };
}

export default function Career({ authentication, page, redirect }) {
  const data = [
    {
      icon_svg: <FaHandshake />,
      title: "Kollektivavtal",
      text: "Great place to work even with competitive environment. Spent 2 years in a very demanding but empowerful environment. Great iniziatives to promote team working ",
    },
    {
      icon_svg: <FaCar />,
      title: "Parkering",
      text: "Great place to work even with competitive environment. Spent 2 years in a very demanding but empowerful environment. Great iniziatives to promote team working ",
    },
    {
      icon_svg: <BiHealth />,
      title: "Företagshälsovård",
      text: "Great place to work even with competitive environment. Spent 2 years in a very demanding but empowerful environment. Great iniziatives to promote team working ",
    },
    {
      icon_svg: <FaRunning />,
      title: "Friskvård",
      text: "Great place to work even with competitive environment. Spent 2 years in a very demanding but empowerful environment. Great iniziatives to promote team working ",
    },
    {
      icon_svg: <GiPartyFlags />,
      title: "Aktiviteter",
      text: "Great place to work even with competitive environment. Spent 2 years in a very demanding but empowerful environment. Great iniziatives to promote team working ",
    },
  ];
  return (
    <Layout>
      <Page 
        authentication={authentication}
        page={page}
        redirect={redirect}
        formTitle="SPONTANANSÖKAN"
      >
      
      <section className="">
        <div className="layout py-12 flex flex-col items-center justify-center ">
          <h3>Förmåner hos broccoli</h3>

          <div className=" flex flex-row flex-wrap md:w-auto w-3/4  items-center justify-center md:gap-8 gap-4 py-8">
            {data.map((data) => {
              return (
                <div className="flex flex-col items-center">
                  {data.icon_svg}
                  <p>{data.title}</p>
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
