import LayoutIntranet from "../../../components/layout/layoutIntranet";
import { getNotifications, getUserinfo } from "../../../Database";
import HB_ITEMS from "../../../components/handbook/handbookItems";
import HBLink from "../../../components/handbook/HBLink";
import {verify} from "../../../tokens";
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
          admin: user.admin,
          notifications: JSON.stringify(await getNotifications(user.id)),
        },
      };
}

export default function Home({ admin, notifications }) {
  return (
    <LayoutIntranet admin={admin} notifications={notifications}>
      <div className="realtive">
        <div className="flex flex-col items-center mg:pt-16 p-12">
          <h1 className="font-bold uppercase">Genvägar</h1>
          <p className="p-3">Här hittar du några snabblänkar</p>
        </div>
        <svg
          className="absolute right-0 top-0 -z-10 fill-secondary-d1"
          width="1189"
          height="1092"
          viewBox="0 0 1189 1092"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M1470.12 569.464C1540.84 453.226 1453.25 413.318 1313.72 296.197C1168.74 174.488 906.884 232.309 841.356 98.1955C781.076 29.4439 790.085 22.9145 678.9 3.17359C567.714 -16.5673 519.662 83.8646 473.515 84.4205C415.83 85.1153 309.523 101.928 221.164 135.168C132.806 168.407 72.1542 291.18 14.2017 453.862C-43.7508 616.544 94.6716 713.781 131.388 787.514C168.103 861.246 162.978 936.377 254.895 1001.27C346.813 1066.15 437.706 1072.29 529.766 1070.07C621.826 1067.85 696.631 1106.89 778.454 1083.72C860.276 1060.54 861.278 1051.65 888.905 950.359C916.531 849.064 1169.4 841.58 1296.32 785.687C1423.24 729.794 1399.41 685.702 1470.12 569.464Z" />
        </svg>

        <div
          className={
            " mt-12 mx-5 md:mx-40 grid grid-cols-2 md:grid-cols-4 gap-2"
          }
        >
          {HB_ITEMS.map((category, i) => (
            <HBLink key={i} category={category} i={i}></HBLink>
          ))}
        </div>
      </div>
    </LayoutIntranet>
  );
}
