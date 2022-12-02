import { getEvents } from "../../Database";
import Calender from "../../components/intranet/Calender";
import * as Database from "../../Database";

export async function getServerSideProps(context) {
  let cookies = JSON.parse(context.req.cookies["user"] || null);
  let user = await Database.getUserinfo(cookies.id);
  if (cookies !== {} || user !== null) {
    let events = await getEvents(undefined);
    events.map((data) => {
      data.startDate = new Date(data.start).toLocaleString("default", {
        day: "numeric",
        month: "short",
      });
      data.endDate = new Date(data.start).toLocaleString("default", {
        day: "numeric",
        month: "short",
      });
    });
    return {
      props: {
        user: user,
        events: JSON.stringify(events),
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

export default function Home({ user, events }) {
  return <Calender user={user} allEvents={JSON.parse(events)} cal="all" />;
}
