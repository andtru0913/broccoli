import LayoutIntranet from '../../../components/layout/layoutIntranet';
import {getNotifications, getUserinfo} from "../../../Database";

export async function getServerSideProps(context) {
    let cookies = JSON.parse(context.req.cookies['user'] || null)
    let user = await getUserinfo(cookies.id)
    if (cookies !== {} || user !== null) {
        return {
            props: {
                filename: context.params.filename,
                admin: user.admin,
                notifications: JSON.stringify(await getNotifications())}
        }
    }
    return {
        redirect: {
            permanent: false,
            destination: "/intranet",
        },
        props:{},
    }
}

export default function Home ({filename, admin, notifications}) {
    return (
        <LayoutIntranet notifications={notifications} admin={admin}>
            <object style={{height: "100vh"}} className={"mx-auto w-4/5"} data={`/uploads/news/${filename}#toolbar=1`}>
                <p> Gick inte att öppna filen</p>
                <a download={filename} href={`/uploads/news/${filename}`}>Ladda ner</a>
            </object>
        </LayoutIntranet>
    );
}