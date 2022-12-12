import Image from "next/image";
import Link from "next/link";
import Nyheter from "../../components/intranet/newsItem";
import LayoutIntranet from "../../components/layout/layoutIntranet";
import ThemedImage from "../../components/themedImage";
import * as Database from "../../Database";
import UpcomingEvent from "../../components/intranet/upcomingEvent";
import {getNews, getNotifications} from "../../Database";

export async function getServerSideProps(context) {
  let cookies = JSON.parse(context.req.cookies["user"] || null);
  if (cookies !== null) {
    const user = await Database.getUserinfo(cookies.id);
    const groups = await Database.getAllLunchGroups();
    const events = await Database.upcomingEvents(3);
    events.map(
      (data) =>
        (data.date = new Date(data.start).toLocaleString("default", {
          day: "numeric",
          month: "short",
        }))
    );
    let lunchgroups = [];
    groups.slice(1).map((data) => {
      let people = [];
      data.users.map((usr) => {
        let fullName = usr.firstname + usr.lastname;
        people.push(fullName);
      });
      let object = { id: data.id, title: data.title, people: people };
      lunchgroups.push(object);
    });

    return {
      props: {
        user: user !== undefined ? user : null,
        lunchgroups: lunchgroups,
        events: JSON.stringify(events),
        notifications: JSON.stringify(await getNotifications()),
        news: JSON.stringify(await getNews(2))
      },
    };
  }
  return {
    props: {
      user: null,
    },
  };
}

export default function Home({ user, lunchgroups, events, notifications, news }) {
  if (user === null) {
    return (
      <main className="">
        <div className=" mx-auto bg-fill w-screen h-screen p-4 relative">
          <Image
            src="/images/frontpage.jpg"
            layout="fill"
            objectFit="cover"
            alt="Siluette of Gothenburg"
            className="w-full h-auto"
          />
          <div className=" w-1/2  absolute top-0 left-1/4 flex justify-center lg:justify-start p-4 lg:left-0">
            <Link href="/">
              <a>
                <div className="relative h-auto w-20 md:h-5 py-0 flex md:w-60 lg:h-10">
                  <ThemedImage
                    img_path_light="/images/lightMode/BroccoliBlack.png"
                    img_path_dark="/images/darkMode/BroccoliWhite.png"
                  />
                </div>
              </a>
            </Link>
          </div>
          <div className=" layout md:left-1/4 md:w-1/2 absolute top-1/4  shadow-lg  py-4 lg:py-12 bg-fill bg-opacity-70 lg:w-1/3 lg:left-1/3">
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
                  className="p-4 text-2xl lg:text-base lg:p-2 m-2  appearance-none  rounded-md  shadow leading-tight focus:outline focus:outline-offset-1 focus:outline-2 focus:outline-primary-d1  autofill:bg-primary autofill:focus:bg-secondary"
                  type="password"
                  name="password"
                  placeholder="Lösenord"
                />
                <button
                  className="shadow btn btn-primary focus:shadow-outline focus:outline-none text-inverted font-semibold p-2 m-2  rounded"
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
      <LayoutIntranet notifications={notifications} admin={user.admin}>
        <main>
          <div className=" flex flex-col">
            <div className="flex flex-col relative h-screen">
              <Image
                src="/images/BlurryGothenburg.JPG"
                layout="fill"
                objectFit="cover"
                alt="Siluette of Gothenburg"
                className="absolute top-0 -z-20"
              />

              <svg
                className="hidden lg:flex  absolute h-auto fill-secondary-1 -z-10 lg:w-4/6 left-0 top-0 opacity-70"
                width="832"
                height="557"
                viewBox="0 0 832 557"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M450.638 555.955C391.972 558.622 380.138 511.955 226.638 455.955C226.638 455.955 61.0384 395.955 6.6384 395.955C-61.3616 395.955 -45.3616 259.955 -45.3616 231.955C-45.3616 203.955 -13.3616 -36.0449 26.6384 -132.045C66.6384 -228.045 162.638 -188.045 226.638 -132.045C290.638 -76.0449 394.638 -140.045 450.638 -132.045C506.638 -124.045 574.638 -92.0449 606.638 -0.0449219C638.638 91.9551 606.638 135.955 670.638 187.955C734.638 239.955 806.638 215.955 826.638 259.955C846.638 303.955 810.638 395.955 718.638 475.955C645.038 539.955 509.305 555.955 450.638 555.955Z" />
              </svg>

              <svg
                className="absolute h-screen w-auto fill-primary-1 -z-10  right-0 -top-10 opacity-70"
                width="782"
                height="554"
                viewBox="0 0 782 554"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M497.871 68.9819C555.514 55.7719 846.095 -130.073 848 169.849L822.381 579C792.211 561.005 617.427 476.712 551.245 465.347C514.078 458.964 367.014 449.72 327.077 405.679C280.488 354.303 124.767 387.842 58.0754 348.853C-8.61652 309.863 -5.0722 244.276 6.83704 206.786C18.7463 169.296 27.0239 107.103 79.4247 84.6092C121.345 66.6139 201.116 95.9745 297.188 95.9745C393.26 95.9745 440.228 82.192 497.871 68.9819Z" />
              </svg>

              <div className=" h-1/2  z-20 flex flex-row items-end">
                <h1 className=" h0 font-bold uppercase flex-1 text-center text-inverted ">
                  Välkommen {user.firstname}
                </h1>
              </div>
            </div>

            <div className="md:grid md:grid-cols-3 flex flex-col">
              <div className=" md:grid md:col-span-2 flex flex-col p-12 lg:p-16 bg-secondary-d1">
                <h2 className=" text-muted uppercase font-bold ">
                  Senaste Nytt
                </h2>
                <Nyheter data={JSON.parse(news)}/>
              </div>
              <div className=" flex flex-col p-12 lg:p-16 bg-secondary-1 ">
                <h2 className=" w-auto text-muted uppercase font-bold ">
                  Kommande event
                </h2>
                {JSON.parse(events).map((data) => {
                  return (
                    <UpcomingEvent
                      key={data.id}
                      title={data.title}
                      date={data.date}
                      description={data.description}
                    />
                  );
                })}
              </div>

              <div className=" md:col-span-3 flex flex-col p-12 lg:p-16 bg-secondary-l1 cursor-default ">
                <h2 className=" text-muted uppercase font-bold ">
                  Lunchgrupper
                </h2>
                <div className="  flex flex-row flex-wrap gap-6 my-4 ">
                  {lunchgroups.map((lunch, n) => {
                    return lunch.id === user.lunchgroup.id ? (
                      <div
                        key={n}
                        className="flex flex-col md:flex-col self-center"
                      >
                        <div className="flex-auto bg-primary-1 border-2 border-dashed  border-secondary-d1 p-6">
                          <h4 className=" uppercase font-bold ">
                            {lunch.title}
                          </h4>
                          {lunch.people.map((i) => {
                            return <p key={i}>{i}</p>;
                          })}
                        </div>
                      </div>
                    ) : (
                      <div
                        key={n}
                        className="flex flex-col md:flex-col self-top"
                      >
                        <div className="flex-auto  border-2 border-dashed  border-secondary-d1 p-6">
                          <h4 className=" uppercase font-bold ">
                            {lunch.title}
                          </h4>
                          {lunch.people.map((i) => {
                            return <p key={i}>{i}</p>;
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </main>
      </LayoutIntranet>
    );
  }
}
