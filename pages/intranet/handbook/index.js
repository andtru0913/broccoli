import LayoutIntranet from "../../../components/layout/layoutIntranet";
import {getNotifications, getUserinfo} from "../../../Database";
import HB_ITEMS from "../../../components/handbook/handbookItems";
export async function getServerSideProps(context) {
    let cookies = JSON.parse(context.req.cookies["user"] || null);
    let user = await getUserinfo(cookies.id);
    if (cookies !== {} || user !== null) {
        return {
            props: {
                admin: user.admin,
                notifications: JSON.stringify(await getNotifications()),
                    data: HB_ITEMS
            },
        };
    }
}

export default function Home({admin,notifications, data}) {
    return (
        <LayoutIntranet admin={admin} notifications={notifications}>
            {JSON.stringify(data)}
        </LayoutIntranet>
    )

}