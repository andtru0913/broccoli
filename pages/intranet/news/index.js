import { getAllNews, getNotifications, getUserinfo } from "../../../Database";
import LayoutIntranet from "../../../components/layout/layoutIntranet";
import Nyheter from "../../../components/intranet/newsItem";
import { verify } from "../../../tokens";

export async function getServerSideProps(context) {
  const user_id = await verify(
    JSON.parse(context.req.cookies["token"] || null)
  );
  const user = await getUserinfo(user_id);
  return !user
    ? {
        redirect: {
          permanent: false,
          destination: "/intranet",
        },
        props: {},
      }
    : {
        props: {
          user: user,
          news: JSON.stringify(await getAllNews(false)),
          notifications: JSON.stringify(await getNotifications(user.id)),
        },
      };
}

export default function Home({ user, news, notifications }) {
  let adminPanel = "";
  if (user.admin) {
    adminPanel = (
      <form
        className={"flex flex-col w-64 z-10"}
        method="POST"
        action={"../../api/admin/createNews"}
        encType={"multipart/form-data"}
      >
        <p className={"m-1"}>Nytt inlägg</p>
        <input type={"hidden"} name={"id"} value={user.id} />
        <input
          id={"title"}
          className={
            "m-1 form-control block text-base font-normal text-muted  solid  border  border-slate-900 focus:text-muted "
          }
          type={"text"}
          name={"title"}
          placeholder={"Titel"}
        />
        <input
          className={
            "m-1 form-control block px-3 py-1.5 text-base font-normal text-muted  solid  border  border-slate-900 focus:text-muted "
          }
          type="file"
          name="file"
        />
        <button className="m-1 btn btn-primary" type={"submit"}>
          Skapa nytt inlägg
        </button>
      </form>
    );
  }
  return (
    <LayoutIntranet admin={user.admin} notifications={notifications}>
      <section>
        <div className="flex flex-col items-center justify-center p-5 bg-secondary-1 ">
          <svg
            className=" absolute right-0 overflow-hidden z-0 fill-secondary-d1 "
            width="709"
            height="570"
            viewBox="0 0 709 570"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M497.871 59.9819C555.514 46.7719 846.095 -139.073 848 160.849L822.381 570C792.211 552.005 617.427 467.712 551.245 456.347C514.078 449.964 367.014 440.72 327.077 396.679C280.488 345.303 124.767 378.842 58.0754 339.853C-8.61652 300.863 -5.0722 235.276 6.83704 197.786C18.7463 160.296 27.0239 98.1033 79.4247 75.6092C121.345 57.6139 201.116 86.9745 297.188 86.9745C393.26 86.9745 440.228 73.192 497.871 59.9819Z" />
          </svg>

          <h1 className="uppercase font-bold mt-12 p-4 z-10">nyheter</h1>
          {adminPanel}
        </div>
      </section>

      <section>
        <div className="flex flex-col bg-secondary-1 h-screen pt-12 ">
          <div>
            <a href={"./news/archive"} className="ml-4 btn btn-button-primary ">
              Arkiv
            </a>
          </div>
          <div className="flex flex-col  md:w-1/2  p-4 z-20 mx-5 ">
            <Nyheter
              admin={user.admin}
              link={"/intranet/news/"}
              data={JSON.parse(news)}
            />
          </div>
        </div>
      </section>
    </LayoutIntranet>
  );
}
