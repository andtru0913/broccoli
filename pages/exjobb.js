import Page from "../components/page";
import {getPage, getUserinfo} from "../Database";
import { exjobb } from "../defaultIDs";
import Layout from "../components/layout/layout";
import {verify} from "../tokens";

export async function getServerSideProps(context) {
  const pageId = exjobb;
  const pageName = "exjobb";
  const user_id = await verify(JSON.parse(context.req.cookies["token"] || null))
  const user = await getUserinfo(user_id);
  const page = (await getPage(pageId))[0];
  return {
    props: {
      admin: user.admin,
      page: page,
      pageName: pageName,
    },
  };
}

export default function Exjobb({ admin, page, pageName, click }) {
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
          <div className="grid grid-rows-2 md:grid-cols-4 md:grid-rows-1 ">
            <div className="  col-span-1 md:row-span-2 place-content-center  md:left-14 md:relative row-start-2 row-span-1 md:col-span-1 md:col-start-1">
              <div className=" ">
                <img
                  className="   md:mt-56 md:ml-10 "
                  src="/images/en1.png"
                ></img>
              </div>
            </div>
            <div className=" col-span-2 row-span-1 row-start-1 bg-secondary-1 md:col-span-2 md:col-start-2 ">
              <a onClick={click} href="#linkForm">
                <div className="flex flex-col md:p-28  ">
                  <h1 className="font-bold uppercase pb-4 text-center">
                    Spontanansökan
                  </h1>

                  <p className="max-w-readable text-justify  md:px-12">
                    För dig som snart ska välja ett examensarbete så kan vi vara
                    ett alternativ. I vår process att ta fram examensarbeten så
                    utgår vi från tomt papper och har en aktiv dialog med dig
                    för att hitta en skräddarsydd uppgift. Som konsultbolag har
                    vi förmånen att ha en bredd av möjliga uppgifter, så länge
                    de ryms inom vårt kompetensområde. Detta innebär en
                    möjlighet för dig som är kreativ och full av egna idéer men
                    även för dig som är öppen för att erövra ny teknik. Vår
                    erfarenhet har vi byggt under många år, sedan vårt första
                    examensarbete hösten 2006.
                  </p>
                </div>
              </a>
            </div>

            <div className=" col-span-1 md:relative -bottom-16 row-start-2 row-span-1  md:right-32 md:top-5    md:col-span-1 md:col-end-5 md:row-start-1  ">
              <img className="  w-full " src="/images/tva.png"></img>
            </div>
          </div>
        </div>
      </Page>
    </Layout>
  );
}
