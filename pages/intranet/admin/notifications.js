import LayoutIntranet from "../../../components/layout/layoutIntranet";
import {getAllNotifications, getNotifications, getUserinfo} from "../../../Database";
import {useEffect, useState} from "react";

export async function getServerSideProps(context) {
  const cookies = JSON.parse(context.req.cookies["user"] || null);
  const user = !! cookies ? (await getUserinfo(cookies.id)) : null;
  return (!user || !user.admin) ?
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
          user: user,
          notifications: JSON.stringify(await getAllNotifications()),
            relevantNotifs: JSON.stringify(await getNotifications())
        }
      }
}

export default function Home({ user, notifications, relevantNotifs }) {

  const useFormattedDate = (date) => {
    const [formattedDate, setFormattedDate] = useState(null);

    useEffect(
        () => setFormattedDate(new Date(date).toLocaleString("default", {year: "numeric", day: "numeric", month: "long",}),[])
    )

    return formattedDate;
  };

  let list = JSON.parse(notifications)
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
              <p>{useFormattedDate(item.startDate)} - {useFormattedDate(item.endDate)}</p>
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
