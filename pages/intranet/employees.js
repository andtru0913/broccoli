import LayoutIntranet from "../../components/layout/layoutIntranet";
import EmployeeAccordion from "../../components/employeeAccordion";
import { getNotifications, getUserinfo, getUserOverview } from "../../Database";
import {verify} from "../../tokens";

export async function getServerSideProps(context) {
  const user_id = await verify(JSON.parse(context.req.cookies["token"] || null))
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
          data: await getUserOverview(),
          admin: user.admin,
          notifications: JSON.stringify(await getNotifications(user.id)),
        },
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
      <main className=" py-20  flex flex-col items-center  ">
        <div className="h-[10rem] z-20">
          <h1 className=" px-4 text-center uppercase font-bold z-20">
            Anställda
          </h1>
          <h3 className="p-4 text-center text-base z-20">
            Här presenteras medarbetare på Broccoli med kontaktinformation
          </h3>
        </div>
        <div className="layout flex flex-row py-4 ">
          <svg
            className="  md:visible md:absolute  md:fill-primary-l1 md:top-0 md:left-0 md:z-0 md:h-auto  "
            width="950"
            height="350"
            viewBox="0 0 1011 497"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M-262.814 197.543C-267.368 164.706 -187.678 158.082 -92.0512 72.1636C-92.0512 72.1636 10.4065 -20.5277 10.4065 -50.977C10.4065 -89.0386 242.644 -80.0829 290.458 -80.0829C338.271 -80.0829 748.102 -62.1716 912.034 -39.7824C1075.97 -17.3932 1007.66 36.3409 912.034 72.1636C816.407 107.986 827 197.543 780.5 256.5C759.325 283.347 720.102 302.772 563 320.684C405.898 338.595 403.797 284.861 315 320.684C226.203 356.506 317.78 484.805 242.644 496C167.508 507.195 10.4065 399.046 -126.204 347.551C-235.492 306.355 -262.814 230.381 -262.814 197.543Z" />
          </svg>
        </div>
        <div>
          <svg
            className="absolute right-0 -z-10 fill-secondary-1"
            width="1004"
            height="920"
            viewBox="0 0 1004 920"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M1012.42 473.14C1015.76 358.195 1017.07 312.824 953.28 258.393C836.941 159.125 754.537 189.872 703.896 78.1764C655.971 21.5714 663.546 15.8344 572.525 1.88259C481.504 -12.0692 439.496 73.9557 401.504 75.5566C354.013 77.5577 266.111 94.3679 192.578 124.615C119.045 154.862 66.1191 260.071 14.4367 398.928C-37.2459 537.786 74.2907 616.541 102.7 677.931C131.109 739.322 125.049 802.919 199.106 855.485C273.163 908.05 347.816 911.006 423.635 906.875C499.454 902.744 560.061 933.892 627.968 912.307C695.875 890.723 696.918 883.19 722.137 796.936C747.357 710.682 836.01 703.266 941.831 652.935C1047.65 602.604 1010.47 540.303 1012.42 473.14Z" />
          </svg>

          <div className="layout  flex flex-row flex-wrap z-20  ">
            <div className="flex flex-row flex-wrap justify-center py-6">
              <EmployeeAccordion data={data} />
            </div>
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
