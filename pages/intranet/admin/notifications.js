import LayoutIntranet from "../../../components/layout/layoutIntranet";
import {getAllNotifications, getGroups, getNotifications, getUserinfo} from "../../../Database";
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
            relevantNotifs: JSON.stringify(await getNotifications()),
            groups: JSON.stringify(await getGroups())
        }
      }
}

export default function Home({ user, notifications, relevantNotifs, groups }) {
  const useFormattedDate = (date) => {
    const [formattedDate, setFormattedDate] = useState(null);

    useEffect(
        () => setFormattedDate(new Date(date).toLocaleString("default", {year: "numeric", day: "numeric", month: "long",}),[])
    )

    return formattedDate;
  };

    const list = JSON.parse(notifications)
    const lunchgroups = JSON.parse(groups)
    useEffect(() => {
            document.getElementById("search").addEventListener("keyup", function(e) {
                try {
                    document.getElementById("all").querySelectorAll('input[type="checkbox"],label').forEach((item) => {
                        item.classList.add("hidden")
                    })
                    document.getElementById("all").querySelectorAll(`input[name*=${e.target.value}],label[name*=${e.target.value}]`).forEach((item) => {
                        item.classList.remove("hidden")
                    })
                } catch(e) {
                    document.getElementById("all").querySelectorAll('input[type="checkbox"],label').forEach((item) => {
                        item.classList.remove("hidden")
                    })
                    document.getElementById("all").querySelectorAll('input[class*="name"],label[class*="name"]').forEach((item) => {
                        item.classList.add("hidden")
                    })
                }

        });
    }, [])
  return (
    <LayoutIntranet admin={true} notifications={relevantNotifs}>
        <div className={"p-2"}>
      Notifikationer
            <form className={"flex flex-row h-64"} action={"../../api/admin/createNotification"} method={"POST"}>
                <div className={"flex flex-col w-72 "}>
                    <input type={"hidden"} name={"id"} value={user.id}/>
                    <input className={"m-1"} type={"date"} name={"date"}/>
                    <input className={"m-1"} type={"title"} name={"title"} placeholder={"Titel"}/>
                    <textarea className={"m-1"} rows={2} name={"text"} placeholder={"Text"}/>
                    <button className={"m-2 w-full font-medium transition-all duration-200 hover:text-green-700"} type={"submit"}> Lägg till</button>
                </div>
                <div className={"w-72 m-2 p-2 overflow-y-scroll"}>
                    <input id={"search"} placeholder={"Sök anställd"} type={"text"}/>
                    <div id={"all"}>
                        <input className={"selectAll"} type={"checkbox"} onClick={function(e) {
                            document.getElementById("all").querySelectorAll('input[type="checkbox"]').forEach((item) => {
                                item.checked = e.target.checked
                            })
                        }}/> <label>All </label>
                        {lunchgroups.map((item, i) => (
                            <div key={i} className={"ml-4"}>
                                <label htmlFor={item.id}>
                                    <input id={item.id} type={"checkbox"} onClick={function(e) {
                                        document.getElementsByClassName(item.id)[0].querySelectorAll('input[type="checkbox"]').forEach((user) => {
                                            user.checked = e.target.checked
                                        })
                                    }}/>
                                    {item.title}
                                </label>
                                <div className={item.id}>
                                    {item.users.map((user, i) => (
                                        <div key={i} className={`ml-4`}>
                                            <label className={"hidden name"} htmlFor={user.email}>
                                                <input className={"hidden name"} id={user.email} name={`${user.firstname} ${user.lastname}`} value={user.email} type={"checkbox"}/>
                                                {user.firstname} {user.lastname}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </form>
            <div className={"flex flex-wrap"}>
                {list.map((item, i) => (
                    <div className={"flex flex-row bg-secondary-1 w-80 p-2"} key={i}>
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
            </div>
        </div>
    </LayoutIntranet>
  );
}
