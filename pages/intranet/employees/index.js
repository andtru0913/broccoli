import LayoutIntranet from "../../../components/layout/layoutIntranet";
import EmployeeAccordion from "../../../components/employeeAccordion";
import { getNotifications, getUserOverview } from "../../../Database";
import * as Database from "../../../Database";

export async function getServerSideProps(context) {
  let data = await getUserOverview();
  const cookies = JSON.parse(context.req.cookies["user"] || null);
  if (cookies !== null) {
    const user = await Database.getUserinfo(cookies.id);
    return {
      props: {
        data: data,
        admin: user.admin,
        notifications: JSON.stringify(await getNotifications()),
      },
    };
  }
  return {
    redirect: {
      permanent: false,
      destination: "/intranet",
    },
    props: {},
  };
}

//const { theme, setTheme } = useTheme();
// useEffect(() => {
//  let currentTheme = theme;
// theme === "dark" ? setTheme("dark_intranet") : setTheme("intranet");
// }, [])

export default function employee({ data, admin, notifications }) {
  return (
    <LayoutIntranet notifications={notifications} admin={admin}>
      <main className=" py-20  flex flex-col items-center bg-secondary-1  ">
        <div className="h-[10rem] z-20">
          <h1 className=" px-4 text-center uppercase font-bold z-20">
            Anställda
          </h1>
          <h3 className="p-4 text-center text-base z-20">
            Här presenteras medarbetare på Broccoli med kontaktinformation
          </h3>
        </div>
        <div className="layout flex flex-row flex-wrap py-4 bg-secondary-1 ">
          <svg
            className=" absolute fill-primary-l1 top-0 left-0 z-0 h-auto overflow-hidden "
            width="950"
            height="350"
            viewBox="0 0 1011 497"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M-262.814 197.543C-267.368 164.706 -187.678 158.082 -92.0512 72.1636C-92.0512 72.1636 10.4065 -20.5277 10.4065 -50.977C10.4065 -89.0386 242.644 -80.0829 290.458 -80.0829C338.271 -80.0829 748.102 -62.1716 912.034 -39.7824C1075.97 -17.3932 1007.66 36.3409 912.034 72.1636C816.407 107.986 827 197.543 780.5 256.5C759.325 283.347 720.102 302.772 563 320.684C405.898 338.595 403.797 284.861 315 320.684C226.203 356.506 317.78 484.805 242.644 496C167.508 507.195 10.4065 399.046 -126.204 347.551C-235.492 306.355 -262.814 230.381 -262.814 197.543Z" />
          </svg>
        </div>

        <div className="layout  flex flex-row flex-wrap z-20 bg-secondary-1  ">
          <div className="flex flex-row flex-wrap justify-center py-6">
            <EmployeeAccordion data={data} />
          </div>

          {/* <div className=" w-1/4 group transition ease-in-out hover:scale-105 py-10 px-1 flex justify-end flex-col ">
          <div className=" absolute opacity-50 place-self-center flex-1 group-hover:scale-105">
            <h1 class="bg-white container max-width  text-gray-220 font-bold p-1 text-lg ">My name</h1>
          </div>
          <img className="h-200 w-auto sm:h-100 "
            src="/images/BjornB.jfif"
          />
        </div>*/}
        </div>
      </main>
    </LayoutIntranet>
  );
}
