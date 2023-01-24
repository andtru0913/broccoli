import { getPage } from "../Database";
import Page from "../components/page";
import { posts } from "../defaultIDs";
import Layout from "../components/layout/layout";

export async function getServerSideProps(context) {
  const pageId = posts;
  const pageName = "posts";
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

export default function Posts({ admin, page, pageName, click }) {
  return (
    <Layout>
      <Page
        classname=""
        authentication={admin}
        page={page}
        image={pageName}
        redirect={pageName}
        formTitle="Ansök våra konsulttjänster"
      >
        <div className="bg-secondary-l1 ">
          <div className="grid md:grid-cols-9 grid-rows-2 md:grid-rows-1">
            <div className="bg-secondary-1 pb-20 md:pb-0  p-8 md:px-24 lg:py-20 lg:px-32 lg:pr-56 text-justify md:col-span-5 md:col-start-1">
              <a onClick={click} href="#linkForm">
                <h1 className="uppercase font-bold pb-5 pt-8 mb:pt-0">
                  Konsulttjänster
                </h1>
                <p className="max-w-readable ">
                  Med vår specifika kompetens kan vi erbjuda tjänster inom
                  utveckling och testning av inbyggda och uppkopplade system.
                  Förutom konsult på plats så erbjuder Broccoli även inhouse
                  lösningar för såväl stora som små projekt. Det kan vara ett
                  bra alternativ för er som kund om ni vill frigöra utrymme i
                  era lokaler eller sitter på annan ort.
                </p>
              </a>
            </div>
            <div className=" mx-4 md:mr-16 lg:mr-28 md:-ml-20 lg:-ml-56 -mt-14 md:mt-0 md:col-span-4 md:col-end-10">
              <img className=" " src="/images/posts.png"></img>
            </div>
          </div>
        </div>
      </Page>
    </Layout>
  );
}
