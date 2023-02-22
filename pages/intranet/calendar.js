import Calender from "../../components/intranet/Calender";
import LayoutIntranet from "../../components/layout/layoutIntranet";
import {getBirthdays, getNotifications, getUserEvents, getUserinfo} from "../../Database";
import {verify} from "../../tokens";

export async function getServerSideProps(context) {
    const user_id = await verify(JSON.parse(context.req.cookies["token"] || null))
    const user = await getUserinfo(user_id);
    if (!user) {
        return {
            redirect: {
                permanent: false,
                destination: "/intranet",
            },
            props: {},
        }
    } else {
        const [events, notifications, birthdays] = await Promise.all([getUserEvents(user.id), getNotifications(user.id), getBirthdays()]);
        return {
            props: {
                user: user,
                events: JSON.stringify(events),
                notifications: JSON.stringify(notifications),
                birthdays: JSON.stringify(birthdays)
            }
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
