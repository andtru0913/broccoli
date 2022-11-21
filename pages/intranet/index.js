import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import ActiveLink from "../../components/activeLink";
import INTRA_MENU_LIST from "../../components/intranet/navItemIntra";
import Nyheter from "../../components/intranet/newsItem";
import LayoutIntranet from "../../components/layout/layoutIntranet";
import * as Database from "../../Database";

export async function getServerSideProps(context) {
  let cookies = JSON.parse(context.req.cookies["user"] || null);
  if (cookies !== null) {
    let user = await Database.getUserinfo(cookies.id);
    let groups = await Database.getAllLunchGroups();
    let lunchgroups = [];
    groups.slice(1).map((data) => {
      let people = [];
      data.users.map((usr) => {
        let fullName = usr.firstname + usr.lastname;
        people.push(fullName);
      });
      let object = { title: data.title, people: people };
      lunchgroups.push(object);
    });

    return {
      props: {
        user: user !== undefined ? user : null,
        lunchgroups: lunchgroups,
      },
    };
  }
  return {
    props: {
      user: null,
    },
  };
}

const lunchfuldata = [
  {
    id: "00",
    title: "Arendal",
    people: ["Anna", "Mathilda", "Stefan", "Johannes", "Kalle"],
  },
  {
    id: "12",
    title: "Lundby",
    people: ["Anna", "Mathilda", "Stefan", "Johannes", "Kalle"],
  },
  {
    id: "23",
    title: "Arendal",
    people: ["Anna", "Mathilda", "Stefan", "Johannes", "Kalle"],
  },
  {
    id: "634e9876bf1fe7084e06634c",
    title: "Arendal",
    people: ["Anna", "Mathilda", "Stefan", "Johannes", "Kalle"],
  },
  {
    id: "34",
    title: "Arendal",
    people: ["Anna", "Mathilda", "Stefan", "Johannes", "Kalle"],
  },
  {
    id: "je",
    title: "Arendal",
    people: ["Anna", "Mathilda", "Stefan", "Johannes", "Kalle"],
  },
  {
    id: "78",
    title: "Arendal",
    people: ["Anna", "Mathilda", "Stefan", "Johannes", "Kalle"],
  },
  {
    id: "98",
    title: "Arendal",
    people: ["Anna", "Mathilda", "Stefan", "Johannes", "Kalle"],
  },
];

export default function Home({ user, lunchgroups }) {
  const { theme, setTheme } = useTheme();
  useEffect(() => {
    let currentTheme = theme;
    theme === "dark" ? setTheme("dark_intranet") : setTheme("intranet");
  }, []);
  if (user === null) {
    return (
      <main className="">
        <div className=" mx-auto bg-fill w-screen h-screen p-4 relative">
          <Image
            src="/images/gothenburg.jfif"
            layout="fill"
            objectFit="cover"
            alt="Siluette of Gothenburg"
            className="w-full h-auto"
          />
          <div className=" w-1/2  absolute top-0 left-1/4 flex justify-center lg:justify-start p-4 lg:left-0">
            <Link href="/">
              <a>
                <img
                  className="h-8 w-auto sm:h-10"
                  src="/images/BroccoliBlack.png"
                  alt="Broccoli"
                />
              </a>
            </Link>
          </div>

          <div className=" layout md:left-1/4 md:w-1/2 absolute top-1/4  shadow-lg rounded-md lg:rounded-3xl py-4 lg:py-12 bg-fill bg-opacity-70 lg:w-1/3 lg:left-1/3">
            <div className="flex flex-1 justify-center flex-col items-center  ">
              <h1>Logga in</h1>
              <form
                className="flex flex-col flex-1 lg:py-12 w-full lg:w-auto"
                action="../../api/login"
                method="POST"
              >
                <input
                  className="p-4 text-2xl lg:text-base lg:p-2 m-2 border border-border appearance-none  rounded-md  shadow leading-tight focus:outline focus:outline-offset-1 focus:outline-2 focus:outline-link autofill:bg-primary autofill:focus:bg-secondary"
                  type="text"
                  name="username"
                  placeholder="Användarnamn"
                />

                <input
                  className="p-4 text-2xl lg:text-base lg:p-2 m-2 border  border-border appearance-none  rounded-md  shadow leading-tight focus:outline focus:outline-offset-1 focus:outline-2 focus:outline-link autofill:bg-primary autofill:focus:bg-secondary"
                  type="password"
                  name="password"
                  placeholder="Lösenord"
                />
                <button
                  className="shadow bg-button-accent hover:bg-button-accent-hover focus:shadow-outline focus:outline-none text-inverted font-semibold p-2 m-2  rounded"
                  type="submit"
                >
                  Logga in
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    );
  } else {
    return (
      <LayoutIntranet>
        <main className="">
          <div className="layout py-20 md:py-12 flex flex-col items-center">
            <h1 className=" text-center">Välkommen {user.firstname}</h1>

            <section>
              <div className="md:hidden flex flex-1 flex-col lg:flex-row justify-center py-12">
                <div className="grid grid-cols-2 gap-4">
                  {INTRA_MENU_LIST.map((menu) => {
                    return menu.bottom === false ? (
                      <div
                        className=" bg-primary bg-opacity-60 p-4 rounded-sm"
                        key={menu.text ?? "menu"}
                      >
                        <Link href={menu.href} className="custom-tap-highlight">
                          <a className="w-full text-base uppercase md:ml-8 font-medium text-center text-muted opacity-80 focus:bg-opacity-80 ">
                            <p>{menu.text}</p>
                          </a>
                        </Link>
                      </div>
                    ) : (
                      <></>
                    );
                  })}
                </div>
              </div>
            </section>

            <section>
              <div className=" flex flex-1 flex-col lg:flex-row justify-center py-12 gap-2">
                <div className="flex flex-col md:w-1/3 ">
                  <h4 className="uppercase font-medium ">Senaste Nytt</h4>
                  <Nyheter />
                </div>

                <div className="flex flex-col md:grow ">
                  <h4 className="uppercase font-medium ">Lunchgrupper</h4>
                  <div className=" grid grid-cols-2 content-center md:flex md:flex-row md:flex-wrap md:w-max-1/2 gap-4  my-2">
                    {lunchfuldata.map((pp) => {
                      return pp.id === user.lunchgroupID ? (
                        <div className="relative flex flex-col  p-4 lg:p-5">
                          <h4 className="font-semibold">{pp.title}</h4>
                          {pp.people.map((i) => {
                            return <p>{i}</p>;
                          })}
                        </div>
                      ) : (
                        <div className="flex flex-col md:flex-row justify-center">
                          <div className="flex-auto bg-primary rounded-sm p-2">
                            <h4 className="font-semibold">{pp.title}</h4>
                            {pp.people.map((i) => {
                              return <p>{i}</p>;
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="flex flex-col ">
                  <h4 className="uppercase font-medium ">Kommande event</h4>
                </div>
              </div>
            </section>
          </div>
        </main>
      </LayoutIntranet>
    );
  }
}
