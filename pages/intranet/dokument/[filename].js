import LayoutIntranet from '../../../components/layout/layoutIntranet';
import {getNotifications, getUserinfo} from "../../../Database";
import {verify} from "../../../tokens";

export async function getServerSideProps(context) {
    const user_id = await verify(JSON.parse(context.req.cookies["token"] || null))
    const user = await getUserinfo(user_id);
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
                filename: context.params.filename,
                admin: user.admin,
                notifications: JSON.stringify(await getNotifications(user.id))
            }
        }
}

export default function Home ({filename, admin, notifications}) {
    return (
        <LayoutIntranet notifications={notifications} admin={admin}>
            <object style={{height: "100vh"}} className={"mx-auto w-4/5"} data={`/uploads/dokument/${filename}#toolbar=1`}>
                <p> Gick inte att öppna filen</p>
                <a download={filename} href={`/uploads/dokument/${filename}`}>Ladda ner</a>
            </object>
        </LayoutIntranet>
    );
}