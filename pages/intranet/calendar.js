import Calender from "../../components/intranet/Calender";
import LayoutIntranet from "../../components/layout/layoutIntranet";
import {getBirthdays, getNotifications, getUserEvents, getUserinfo} from "../../Database";

export async function getServerSideProps(context) {
  const cookies = JSON.parse(context.req.cookies["user"] || null);
  const user = !!cookies ? (await getUserinfo(cookies.id)) : null;
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
          user: user,
          events: JSON.stringify(await getUserEvents(cookies.id)),
          notifications: JSON.stringify(await getNotifications()),
          birthdays: JSON.stringify(await getBirthdays())
        }
      }
}


export default function Home({ user, events, notifications, birthdays }) {
  let allEvents = JSON.parse(events)
  JSON.parse(birthdays).forEach((u) => {
    if (!!u.birthday) {
      let birthday = (new Date(u.birthday))
      birthday.setFullYear(new Date().getFullYear())
      allEvents.push({title: `${u.firstname} ${u.lastname}s födelsedag`, start: birthday, end: birthday})
    }
  })
  return (
      <LayoutIntranet notifications={notifications} admin={user.admin}>
        <Calender id={"calendar"} user={user} allEvents={allEvents} cal="mine" />
      </LayoutIntranet>);
}
