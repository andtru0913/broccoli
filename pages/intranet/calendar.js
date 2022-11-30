import * as Database from "../../Database";
import Calender from "../../components/intranet/Calender";

export async function getServerSideProps(context) {
  let cookies = JSON.parse(context.req.cookies["user"] || null);
  let user = await Database.getUserinfo(cookies.id);
  if (cookies !== {} || user !== null) {
    let events = await Database.getUserEvents(cookies.id);
    return {
      props: {
        admin: user.admin === undefined ? false : user.admin,
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

export default function Home({ admin, events }) {
  return <Calender admin={admin} allEvents={JSON.parse(events)} cal="mine" />;
}
