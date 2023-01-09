import LayoutIntranet from "../../../components/layout/layoutIntranet";
import {getAllNotifications, getGroups, getNotifications, getUserinfo, getUserNotifications} from "../../../Database";
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
            relevantNotifs: JSON.stringify(await getNotifications(user.id)),
            groups: JSON.stringify(await getGroups()),
            allUsers: await getUserNotifications()
        }
      }
}

export default function Home({ user, notifications, relevantNotifs, groups, allUsers }) {
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
                    document.getElementById("all").querySelectorAll('label').forEach((item) => {
                        item.classList.add("hidden")
                    })
                    document.getElementById("all").querySelectorAll(`label[name*=${e.target.value}]`).forEach((item) => {
                        item.classList.remove("hidden")
                    })
                } catch(e) {
                    document.getElementById("all").querySelectorAll('label').forEach((item) => {
                        item.classList.remove("hidden")
                    })
                    document.getElementById("all").querySelectorAll('label[class*="name"]').forEach((item) => {
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
                <div className={"flex flex-row"}>
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
                            <label>
                                <input className={"selectAll"} type={"checkbox"} onClick={function(e) {
                                    document.getElementById("all").querySelectorAll('input[type="checkbox"]').forEach((item) => {
                                        item.checked = e.target.checked
                                    })
                                    document.getElementById("selected").querySelectorAll('input[type="checkbox"]').forEach((item) => {
                                        item.checked = e.target.checked
                                    })
                                    document.getElementById("selected").querySelectorAll('input[type="checkbox"],label').forEach((item) => {
                                        if (e.target.checked) {
                                            item.classList.remove("hidden")
                                        } else {
                                            item.classList.add("hidden")
                                        }
                                    })
                                }}/> All </label>
                            {lunchgroups.map((item, i) => (
                                <div key={i} className={"ml-4"}>
                                    <label htmlFor={item.id}>
                                        <input className={"mr-2"} id={item.id} type={"checkbox"} onClick={function(e) {
                                            document.getElementsByClassName(item.id)[0].querySelectorAll('input[type="checkbox"]').forEach((user) => {
                                                const u = document.getElementById(`select${user.id}`)
                                                user.checked = e.target.checked
                                                u.checked = e.target.checked
                                                const label = document.getElementById("selected").querySelector(`label[name=${user.id}]`)
                                                if (e.target.checked) {
                                                    u.classList.remove("hidden")
                                                    label.classList.remove("hidden")
                                                } else {
                                                    u.classList.add("hidden")
                                                    label.classList.add("hidden")
                                                }
                                            })
                                        }}/>
                                        {item.title}
                                    </label>
                                    <div className={item.id}>
                                        {item.users.map((user, i) => (
                                            <div key={i}>
                                                <label name={`${user.firstname} ${user.lastname}`} className={`hidden name`} htmlFor={user.email}>
                                                    <input className={"name mr-2"} id={user.email} type={"checkbox"} onClick={function(e) {
                                                        const u = document.getElementById(`select${user.email}`)
                                                        const label = document.getElementById("selected").querySelector(`label[name=${user.email}]`)
                                                        u.checked = e.target.checked
                                                        if (e.target.checked) {
                                                            u.classList.remove("hidden")
                                                            label.classList.remove("hidden")
                                                        } else {
                                                            u.classList.add("hidden")
                                                            label.classList.add("hidden")
                                                        }
                                                    }}/>
                                                    {user.firstname} {user.lastname}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className={"w-72 m-2 p-2 overflow-y-scroll"}>
                        <div id={"selected"}>
                            {allUsers.map((user,i) => (
                                <div key={i} className={`ml-4`}>
                                    <label className={"hidden"} name={user.email} htmlFor={user.email}>
                                        <input className={"hidden mr-2"} id={`select${user.email}`} name={`users`} value={user.id} type={"checkbox"} onClick={function(e) {
                                            document.getElementById(user.email).checked = e.target.checked
                                            const label = document.getElementById("selected").querySelector(`label[name=${user.email}]`)
                                            label.classList.add("hidden")
                                            e.target.classList.add("hidden")
                                        }}/>
                                        {user.firstname} {user.lastname}
                                    </label>
                                </div>
                            ))}
                        </div>
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
