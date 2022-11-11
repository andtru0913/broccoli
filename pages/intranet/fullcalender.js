import {getEvents} from "../../Database";
import Calender from "../../components/Calender";
import * as Database from "../../Database";

export async function getServerSideProps(context) {
    let cookies = JSON.parse(context.req.cookies['user'] || null)
    let user = await Database.getUserinfo(cookies.id)
    if (cookies !== {} || user !== null) {
        let events = await getEvents(undefined);
        return {
            props: {
                admin: user.admin,
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
