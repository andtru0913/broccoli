import LayoutIntranet from '../../../components/layout/layoutIntranet';
import {getUserByEmail, getUserinfo} from "../../../Database";

export async function getServerSideProps(context) {
    let cookies = JSON.parse(context.req.cookies['user'] || null)
    let user = await getUserinfo(cookies.id)
    if (cookies !== {} || user !== null) {
        const email = context.params.email
        let user = await getUserByEmail(email)
        return {
            props: {user: user}
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

export default function Home ({user}) {
    return (
        <LayoutIntranet>
            <div className={"w-12 h-auto"}>
                {JSON.stringify(user)}
            </div>
         </LayoutIntranet>
    );
}