import LayoutIntranet from "../../../components/layout/layoutIntranet";
import {getAllNotifications, getGroups, getNotifications, getUserinfo, getUserNotifications} from "../../../Database";
import {useEffect, useState} from "react";
import {HiXMark} from "react-icons/hi2";

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
            document.getElementById("createSearch").addEventListener("keyup", function(e) {
                try {
                    document.getElementById("create").querySelectorAll('label').forEach((item) => {
                        item.classList.add("hidden")
                    })
                    document.getElementById("create").querySelectorAll(`label[name*=${e.target.value}]`).forEach((item) => {
                        item.classList.remove("hidden")
                    })
                } catch(e) {
                    document.getElementById("create").querySelectorAll('label').forEach((item) => {
                        item.classList.remove("hidden")
                    })
                    document.getElementById("create").querySelectorAll('label[class*="name"]').forEach((item) => {
                        item.classList.add("hidden")
                    })
                }
            });
        document.getElementById("modifySearch").addEventListener("keyup", function(e) {
            try {
                document.getElementById("modify").querySelectorAll('label').forEach((item) => {
                    item.classList.add("hidden")
                })
                document.getElementById("modify").querySelectorAll(`label[name*=${e.target.value}]`).forEach((item) => {
                    item.classList.remove("hidden")
                })
            } catch(e) {
                document.getElementById("modify").querySelectorAll('label').forEach((item) => {
                    item.classList.remove("hidden")
                })
                document.getElementById("modify").querySelectorAll('label[class*="name"]').forEach((item) => {
                    item.classList.add("hidden")
                })
            }
        });
    }, [])
    const popHide = "pop-hide"
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
                        <input id={"createSearch"} placeholder={"Sök anställd"} type={"text"}/>
                        <div id={"create"}>
                            <label>
                                <input className={"selectAll"} type={"checkbox"} onClick={function(e) {
                                    document.getElementById("create").querySelectorAll('input[type="checkbox"]').forEach((item) => {
                                        item.checked = e.target.checked
                                    })
                                    document.getElementById("createSelected").querySelectorAll('input[type="checkbox"]').forEach((item) => {
                                        item.checked = e.target.checked
                                    })
                                    document.getElementById("createSelected").querySelectorAll('input[type="checkbox"],label').forEach((item) => {
                                        if (e.target.checked) {
                                            item.classList.remove("hidden")
                                        } else {
                                            item.classList.add("hidden")
                                        }
                                    })
                                }}/> All </label>
                            {lunchgroups.map((item, i) => (
                                <div key={i} className={"ml-4"}>
                                        <label htmlFor={`createGroup${item.id}`}>
                                        <input className={"mr-2"} id={`createGroup${item.id}`} type={"checkbox"} onClick={function(e) {
                                            document.getElementById(`create${item.id}`).querySelectorAll('input[type="checkbox"]').forEach((user) => {
                                                user.checked = e.target.checked
                                            })
                                            item.users.forEach((user) => {
                                                const u = document.getElementById(`createSelected${user.email}`)
                                                const label = document.getElementById("createSelected").querySelector(`label[name=${CSS.escape(user.email)}]`)
                                                u.checked = e.target.checked
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
                                    <div id={`create${item.id}`}>
                                        {item.users.map((user, i) => (
                                            <div key={i}>
                                                <label name={`${user.firstname} ${user.lastname}`} className={`hidden name`} htmlFor={`create${user.email}`} >
                                                    <input className={"name mr-2"} id={`create${user.email}`} type={"checkbox"} onClick={function(e) {
                                                        const u = document.getElementById(`createSelected${user.email}`)
                                                        const label = document.getElementById("createSelected").querySelector(`label[name=${CSS.escape(user.email)}]`)
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
                        <div id={"createSelected"}>
                            {allUsers.map((user,i) => (
                                <div key={i} className={`ml-4`}>
                                    <label className={"hidden"} name={user.email} htmlFor={`createSelected${user.email}`}>
                                        <input className={"mr-2"} id={`createSelected${user.email}`} name={`users`} value={user.id} type={"checkbox"} onClick={function(e) {
                                            document.getElementById(`create${user.email}`).checked = e.target.checked
                                            const label = document.getElementById("createSelected").querySelector(`label[name=${CSS.escape(user.email)}]`)
                                            label.classList.add("hidden")
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
                        <div className={"flex flex-col"} onClick={function() {
                            let background = document.getElementById("popup");
                            let window = document.getElementById("modifyNotif");
                            document.getElementById("modifyId").value = item.id
                            document.getElementById("modifyTitle").value = item.title
                            document.getElementById("modifyDesc").innerText = item.text
                            document.getElementById("modifyDate").valueAsDate = new Date(item.endDate)
                            item.users.forEach((user) => {
                                const email = user.user.email
                                document.getElementById(`modifySelected${email}`).checked = true
                                document.getElementById("modifySelected").querySelector(`label[name=${CSS.escape(email)}]`).classList.remove("hidden")
                            })
                            background.classList.remove(popHide);
                            window.classList.remove(popHide);
                        }}>
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
        <div
            id="popup"
            className={`popup ${popHide}`}
            onClick={function () {
                document.getElementById("popup").classList.add(popHide);
                document.getElementById("modifyNotif").classList.add(popHide);
            }}
        ></div>
        <div className={`${popHide} window-pop `} id={"modifyNotif"}>
            <form className={"flex flex-row p-2 h-64 bg-white"} action={"../../api/admin/modifyNotification"} method={"POST"}>
                <input type={"hidden"} name={"notifId"} id={"modifyId"}/>
                <div className={"flex flex-row"}>
                    <div className={"flex flex-col w-72 "}>
                        <input type={"hidden"} name={"id"} value={user.id}/>
                        <input className={"m-1"} type={"date"} id={"modifyDate"} name={"date"}/>
                        <input className={"m-1"} type={"title"} id={"modifyTitle"} name={"title"} placeholder={"Titel"}/>
                        <textarea className={"m-1"} rows={2} id={"modifyDesc"} name={"text"} placeholder={"Text"}/>
                        <button className={"m-2 w-full font-medium transition-all duration-200 hover:text-green-700"} type={"submit"}> Ändra </button>
                    </div>
                    <div className={"w-72 m-2 p-2 overflow-y-scroll"}>
                        <input id={"modifySearch"} placeholder={"Sök anställd"} type={"text"}/>
                        <div id={"modify"}>
                            <label>
                                <input className={"selectAll"} type={"checkbox"} onClick={function(e) {
                                    document.getElementById("modify").querySelectorAll('input[type="checkbox"]').forEach((item) => {
                                        item.checked = e.target.checked
                                    })
                                    document.getElementById("modifySelected").querySelectorAll('input[type="checkbox"]').forEach((item) => {
                                        item.checked = e.target.checked
                                    })
                                    document.getElementById("modifySelected").querySelectorAll('label').forEach((item) => {
                                        if (e.target.checked) {
                                            item.classList.remove("hidden")
                                        } else {
                                            item.classList.add("hidden")
                                        }
                                    })
                                }}/> All </label>
                            {lunchgroups.map((item, i) => (
                                <div key={i} className={"ml-4"}>
                                    <label htmlFor={`modifyGroup${item.id}`}>
                                        <input className={"mr-2"} id={`modifyGroup${item.id}`} type={"checkbox"} onClick={function(e) {
                                            document.getElementById(`modify${item.id}`).querySelectorAll('input[type="checkbox"]').forEach((user) => {
                                                user.checked = e.target.checked
                                            })
                                            item.users.forEach((user) => {
                                                const u = document.getElementById(`modifySelected${user.email}`)
                                                const label = document.getElementById("modifySelected").querySelector(`label[name=${CSS.escape(user.email)}]`)
                                                u.checked = e.target.checked
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
                                    <div id={`modify${item.id}`}>
                                        {item.users.map((user, i) => (
                                            <div key={i}>
                                                <label name={`${user.firstname} ${user.lastname}`} className={`hidden name`} htmlFor={`modify${user.email}`} >
                                                    <input className={"name mr-2"} id={`modify${user.email}`} type={"checkbox"} onClick={function(e) {
                                                        const u = document.getElementById(`modifySelected${user.email}`)
                                                        const label = document.getElementById("modifySelected").querySelector(`label[name=${CSS.escape(user.email)}]`)
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
                        <div id={"modifySelected"}>
                            {allUsers.map((user,i) => (
                                <div key={i} className={`ml-4`}>
                                    <label className={"hidden"} name={user.email} htmlFor={`modifySelected${user.email}`}>
                                        <input className={"mr-2"} id={`modifySelected${user.email}`} name={`users`} value={user.id} type={"checkbox"} onClick={function(e) {
                                            document.getElementById(`modify${user.email}`).checked = e.target.checked
                                            const label = document.getElementById("modifySelected").querySelector(`label[name=${CSS.escape(user.email)}]`)
                                            label.classList.add("hidden")
                                        }}/>
                                        {user.firstname} {user.lastname}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div>
                        <HiXMark
                            style={{ cursor: "pointer" }}
                            onClick={function () {
                                document.getElementById("popup").classList.add(popHide);
                                document.getElementById("modifyNotif").classList.add(popHide);
                            }}
                        />
                    </div>
                </div>
            </form>
        </div>
    </LayoutIntranet>
  );
}
