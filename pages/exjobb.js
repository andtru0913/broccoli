import Page from "../components/page";
import { getPage, getUserinfo } from "../Database";
import { exjobb } from "../defaultIDs";
import Layout from "../components/layout/layout";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { verify } from "../tokens";
import Image from "next/image";

export async function getServerSideProps(context) {
  const pageId = exjobb;
  const pageName = "exjobb";
  const user_id = await verify(
    JSON.parse(context.req.cookies["token"] || null)
  );
  const user = await getUserinfo(user_id);
  const page = (await getPage(pageId))[0];
  return {
    props: {
      admin: !!user ? user.admin : false,
      page: page,
      pageName: pageName,
    },
  };
}

export default function Exjobb({ admin, page, pageName, click }) {
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
        formTitle="EXJOBBSANSÖKAN"
      >
        <div className="bg-secondary-l1 ">
          <div className="grid md:grid-cols-9 grid-rows-2 md:grid-rows-1  ">
            <div className="bg-secondary-1 pb-20 md:pb-0 text-justify p-8 md:px-24 lg:py-28 lg:px-36 lg:pr-56  md:col-span-5 md:col-start-1">
              <a onClick={click} href="#linkForm">
                <h1
                  className="uppercase font-bold pb-5 pt-8 mb:pt-0"
                  data-aos="fade-right"
                  data-aos-once="true"
                >
                  Hos oss
                </h1>
                <p
                  className="max-w-readable "
                  data-aos="fade-right"
                  data-aos-once="true"
                  data-aos-delay="500"
                >
                  För dig som snart ska välja ett examensarbete så kan vi vara
                  ett alternativ. I vår process att ta fram examensarbeten så
                  utgår vi från tomt papper och har en aktiv dialog med dig för
                  att hitta en skräddarsydd uppgift. Som konsultbolag har vi
                  förmånen att ha en bredd av möjliga uppgifter, så länge de
                  ryms inom vårt kompetensområde. Detta innebär en möjlighet för
                  dig som är kreativ och full av egna idéer men även för dig som
                  är öppen för att erövra ny teknik. Vår erfarenhet har vi byggt
                  under många år, sedan vårt första examensarbete hösten 2006.
                </p>
              </a>
            </div>
            <div className=" mx-4 md:mr-16 lg:mr-28 md:-ml-20 lg:-ml-44 md:mt-10 md:col-span-4 md:col-end-10">
              <Image alt={""} width={800} height={600} className=" " src="/images/exjobb.png"></Image>
            </div>
          </div>
        </div>
      </Page>
    </Layout>
  );
}
