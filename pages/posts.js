import { getPage, getUserinfo } from "../Database";
import Page from "../components/page";
import { posts } from "../defaultIDs";
import Layout from "../components/layout/layout";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { verify } from "../tokens";
export async function getServerSideProps(context) {
  const pageId = posts;
  const pageName = "posts";
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
      pagestring: JSON.stringify(page[0]),
      pageName: pageName,
    },
  };
}

export default function Posts({ admin, pagestring, pageName, click }) {
  useEffect(() => {
    AOS.init({ duration: 2500 });
  }, []);
  const page = JSON.parse(pagestring);
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
        <div className=" bg-secondary-1 w-full pt-20 sm:pt-0">
          <div className="flex flex-row justify-center relative z-40">
            <div className=" text-justify py-8 px-4">
              <a onClick={click} href="#linkForm">
                <h3
                  className="uppercase font-bold pb-5 pt-8 mb:pt-0 md:h1"
                  data-aos="fade-right"
                  data-aos-once="true"
                >
                  Konsulttjänster
                </h3>
                <p
                  className="max-w-readable py-2"
                  data-aos="fade-right"
                  data-aos-once="true"
                  data-aos-delay="500"
                >
                  Med vår specifika kompetens kan vi erbjuda tjänster inom
                  utveckling och testning av inbyggda och uppkopplade system.
                  Förutom konsult på plats så erbjuder Broccoli även inhouse
                  lösningar för såväl stora som små projekt. Det kan vara ett
                  bra alternativ för er som kund om ni vill frigöra utrymme i
                  era lokaler eller sitter på annan ort.
                </p>
              </a>
            </div>
          </div>
        </div>
      </Page>
    </Layout>
  );
}
