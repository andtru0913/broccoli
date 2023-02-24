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
  const [user, page] = await Promise.all([getUserinfo(user_id), getPage(pageId)]);
  return {
    props: {
      admin: !!user ? user.admin : false,
      page: page[0],
      pageName: pageName,
    },
  };
}

export default function Posts({ admin, page, pageName }) {
  useEffect(() => {
    AOS.init({ duration: 2500 });
  }, []);
  return (
    <Layout>
      <Page
        classname=""
        authentication={admin}
        page={page}
        image={pageName}
        redirect={pageName}
        buttonName="Kontakta oss"
      >

        <div className=" bg-secondary-1 w-full pt-20 sm:pt-0">
          <div className="flex flex-row justify-center">
            <div className=" text-justify py-8 px-4">
              <a href="#linkForm">
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
      <form method="POST" action="./api/send_email" encType={"multipart/form-data"}>
        <div className="  flex flex-col ">
          <div id="linkForm" className=" w-full  md:p-12">
            <input type={"hidden"} name={"pagetitle"} value={pageName} />
            <input type={"hidden"} name={"redirect"} value={"../posts"} />
            {/**title */}

            <div className="relative flex  flex-row ">
              <div className="flex-1 flex justify-center md:justify-start  p-2 text-2xl">
                <p className=" pt-12 flex self-center md:self-auto uppercase">
                  Kontakta oss
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
