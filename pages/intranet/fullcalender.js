import {getEvents,isAdmin} from "../../Database";
import Calender from "../../components/Calender";

export async function getServerSideProps(context) {
    let cookies = JSON.parse(context.req.cookies['user'] || null)
    let admin = await isAdmin(cookies.id)
    if (cookies !== {}) {
        let events = await getEvents(undefined);
        return {
            props: {
                admin: admin,
                allEvents: events
            }
        }
    }
    return {
        redirect: {
            permanent: false,
            destination: "/intranet",
        },
        props:{},
    };
}

export default function Home({admin,allEvents}) {
    return <Calender admin={admin} allEvents={allEvents}/>
}
