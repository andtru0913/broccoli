import LayoutIntranet from "../../../components/layout/layoutIntranet";
import {getNotifications, getUserinfo} from "../../../Database";
import HB_ITEMS from "../../../components/handbook/handbookItems";
import HBLink from "../../../components/handbook/HBLink";
export async function getServerSideProps(context) {
    const cookies = JSON.parse(context.req.cookies["user"] || null);
    const user = !! cookies ? (await getUserinfo(cookies.id)) : null;
    return !user ?
        {
            redirect: {
                permanent: false,
                destination: "/intranet",
            },
            props: {},
        }
        :
        {
            props: {
                admin: user.admin,
                notifications: JSON.stringify(await getNotifications())
            }
        }
}

export default function Home({admin,notifications}) {
    return (
        <LayoutIntranet admin={admin} notifications={notifications}>
            <div className={"mt-20 mx-40 grid grid-cols-2 md:grid-cols-4 gap-2"}>
                {HB_ITEMS.map((category,i) =>
                <HBLink category={category} i={i}>
                </HBLink>
                )}
            </div>

        </LayoutIntranet>
    )

}