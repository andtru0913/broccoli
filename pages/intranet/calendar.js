import * as Database from "../../Database";
import Calender from "../../components/intranet/Calender";
import LayoutIntranet from "../../components/layout/layoutIntranet";
import {getNotifications} from "../../Database";

export async function getServerSideProps(context) {
  let cookies = JSON.parse(context.req.cookies["user"] || null);
  let user = await Database.getUserinfo(cookies.id);
  if (cookies !== {} || user !== null) {
    let events = await Database.getUserEvents(cookies.id);
    events.map((data) => {
      data.startDate = new Date(data.start).toLocaleString("default", {
        weekday: "long",
        day: "numeric",
        month: "short",
      });
      data.endDate = new Date(data.start).toLocaleString("default", {
        weekday: "long",
        day: "numeric",
        month: "short",
      });
    });
    return {
      props: {
        user: user,
        events: JSON.stringify(events),
        notifications: JSON.stringify(await getNotifications())
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

export default function Home({ user, events, notifications }) {
  return (
      <LayoutIntranet notifications={notifications} admin={user.admin}>
        <Calender user={user} allEvents={JSON.parse(events)} cal="mine" />
      </LayoutIntranet>);
}
