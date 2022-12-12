import {getEvents, getNotifications} from "../../Database";
import Calender from "../../components/intranet/Calender";
import * as Database from "../../Database";
import LayoutIntranet from "../../components/layout/layoutIntranet";

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

  return (<LayoutIntranet admin={user.admin} notifications={notifications}>
        <button onClick={function() {
          fetch("../api/admin/getNotAnswered", {
            method: 'post', // Default is 'get'
            body: JSON.stringify({id: '63885f1daa2ce12979e5a1da'}),
            headers: new Headers({
              'Content-Type': 'application/json'
            })
          })
              .then(response => response.json())
              .then(json => console.log(json))

        }}>Test</button>
        <Calender user={user} allEvents={JSON.parse(events)} cal="all" />
      </LayoutIntranet>
  );
}
