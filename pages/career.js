import { authenticate } from "./intranet/admin/authenticate";
import { getPage } from "../Database";
import Page from "../components/page";
import { career } from "../defaultIDs";
import Layout from "../components/layout/layout";
import { FaHandshake, FaCar, FaRunning } from "react-icons/fa";
import { BiHealth } from "react-icons/bi";
import { GiPartyFlags } from "react-icons/gi";

export async function getServerSideProps(context) {
  const pageId = career;
  let authentication = await authenticate(context);
  const page = (await getPage(pageId))[0];
  return {
    props: {
      authentication: authentication === undefined ? null : authentication,
      page: page,
    },
  };
}

export default function Career({ authentication, page }) {
  const data = [
    {
      icon_svg: <FaHandshake size={90} />,
      title: "Kollektivavtal",
      text: "Great place to work even with competitive environment. Spent 2 years in a very demanding but empowerful environment. Great iniziatives to promote team working ",
      color: "bg-primary-1",
    },
    {
      icon_svg: <FaCar size={90} />,
      title: "Parkering",
      text: "Great place to work even with competitive environment. Spent 2 years in a very demanding but empowerful environment. Great iniziatives to promote team working ",
      color: "bg-secondary-d1",
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
      icon_svg: <GiPartyFlags size={90} />,
      title: "Aktiviteter",
      text: "Great place to work even with competitive environment. Spent 2 years in a very demanding but empowerful environment. Great iniziatives to promote team working ",
      color: "bg-primary-1",
    },
  ];
  return (
    <Layout>
      <Page
        authentication={authentication}
        page={page}
        redirect={"career"}
        formTitle="SPONTANANSÖKAN"
      >
        <section className="">
          <div className="pt-12 flex flex-col items-center justify-center ">
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
