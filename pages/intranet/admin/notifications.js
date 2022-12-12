import { authenticate } from "./authenticate";
import LayoutIntranet from "../../../components/layout/layoutIntranet";
import {getAllNotifications, getNotifications, getUserProfile} from "../../../Database";

export async function getServerSideProps(context) {
  let authentication = await authenticate(context);
  if (authentication !== undefined) return authentication;
  const cookies = JSON.parse(context.req.cookies["user"] || null);
  if (cookies !== null) {
    const user = await getUserProfile(cookies.id);
    let notifications = await getAllNotifications();
    notifications.map((data) => {
      data.start = new Date(data.startDate).toLocaleString("default", {
        year: "numeric",
        day: "numeric",
        month: "long",
      });
      data.end = new Date(data.endDate).toLocaleString("default", {
        year: "numeric",
        day: "numeric",
        month: "long",
      });
    });
    const relevantNotifs = await getNotifications()
    return {
      props: {
        user: user,
        notifications: JSON.stringify(notifications),
        relevantNotifs: JSON.stringify(relevantNotifs),
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

export default function Home({ user, notifications, relevantNotifs }) {
  const list = JSON.parse(notifications)
  return (
    <LayoutIntranet admin={true} notifications={relevantNotifs}>
      Notifikationer
      <form action={"../../api/admin/createNotification"} method={"POST"}>
        <input type={"hidden"} name={"id"} value={user.id}/>
        <input type={"date"} name={"date"}/>
        <input type={"title"} name={"title"} placeholder={"Titel"}/>
        <input type={"textarea"} name={"text"} placeholder={"Text"}/>
        <button type={"submit"}> Lägg till</button>
      </form>
      {list.map((item, i) => (
          <div className={"flex flex-row"} key={i}>
            <div className={"flex flex-col"}>
              <p className={"font-bold"}>{item.title}</p>
              <p>{item.text}</p>
              <p>{item.start} - {item.end}</p>
          </div>
            <form className={"flex flex-row"} action={"../../api/admin/deleteNotification"} method={"POST"}>
              <input type={"hidden"} name={"id"} value={item.id}/>
              <button type={"submit"}>&#10060;</button>
            </form>
          </div>
      ))}
    </LayoutIntranet>
  );
}
