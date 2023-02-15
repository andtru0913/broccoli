import LayoutIntranet from "../../../components/layout/layoutIntranet";
import {
  getAllNotifications,
  getGroups,
  getNotifications,
  getUserinfo,
  getUserNotifications,
} from "../../../Database";
import { useEffect } from "react";
import { HiXMark } from "react-icons/hi2";
import { verify } from "../../../tokens";

export async function getServerSideProps(context) {
    const user_id = await verify(JSON.parse(context.req.cookies["token"] || null))
    const user = await getUserinfo(user_id);
  return (!user || !user.admin) ?
      {
        redirect: {
          permanent: false,
          destination: "/intranet",
        },
        props: {},
      }
    : {
        props: {
          user: user,
          notifications: JSON.stringify(await getAllNotifications()),
          relevantNotifs: JSON.stringify(await getNotifications(user.id)),
          groups: JSON.stringify(await getGroups()),
          allUsers: await getUserNotifications(),
        },
      };
}

export default function Home({ user, notifications, relevantNotifs, groups, allUsers }) {
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
      <div className="">
        <div className="flex flex-col  p-12 bg-secondary-d1">
          <h2 className=" flex justify-center md:justify-start uppercase font-bold">
            Notifikationer
          </h2>
          <h4 className=" flex justify-self-center md:justify-start py-5">
            Här kan du skapa och redigera notifikationer som visas för de
            anställda
          </h4>
        </div>
        <div className="flex flex-col md:flex-row">
          <div className="realtive flex-col bg-secondary-1">
            <svg
              className="absolute left-0 md:w-auto w-11/12 fill-secondary-l2 z-10"
              width="583"
              height="300"
              viewBox="0 0 583 300"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M226.041 260.709C184.025 273.974 2.33933 365.684 0.920135 208.794V19.9005C56.4885 -44.8465 110.155 74.6943 175.519 51.0007C261.316 19.9001 299.577 73.0311 372.138 83.2664C444.7 93.5018 500.556 62.8707 550.228 83.2664C599.9 103.662 579.96 163.921 571.09 183.532C562.22 203.144 567.907 219.22 527.741 231.904C494.871 242.284 517.027 219.794 408.369 269.965C299.711 320.136 268.058 247.443 226.041 260.709Z" />
            </svg>

            <div className="relative z-20">
              <h5 className="uppercase flex justify-center md:justify-start md:pl-14 mt-5 font-bold ">
                Skapa ny notifikation
              </h5>
            </div>
            <div className="flex flex-col ">
              <form
                className={
                  "relative flex flex-row justify-center md:justify-start z-20 "
                }
                action={"../../api/admin/createNotification"}
                method={"POST"}
              >
                <input
                  type="hidden"
                  name="redirect"
                  value={"../../intranet/admin/notifications"}
                />

                <div className="flex flex-col md:flex-row md:pl-12">
                  <div className={"flex flex-col m-2"}>
                    <input type={"hidden"} name={"id"} value={user.id} />
                    <input className={"m-1 p-1"} type={"date"} name={"date"} />
                    <input
                      className={"m-1 p-1"}
                      type={"title"}
                      name={"title"}
                      placeholder={"Titel"}
                    />
                    <textarea
                      className={"m-1 p-1"}
                      rows={2}
                      name={"text"}
                      placeholder={"Text"}
                    />
                  </div>
                  <div className={"flex flex-col m-1 p-1 overflow-y-scroll"}>
                    <input
                      id={"createSearch"}
                      placeholder={"Sök anställd"}
                      type={"text"}
                      className={"m-1 p-1 "}
                    />
                    <div id={"create"}>
                      <label>
                        <input
                          className={"selectAll m-1 p-2 "}
                          type={"checkbox"}
                          onClick={function (e) {
                            document
                              .getElementById("create")
                              .querySelectorAll('input[type="checkbox"]')
                              .forEach((item) => {
                                item.checked = e.target.checked;
                              });
                            document
                              .getElementById("createSelected")
                              .querySelectorAll('input[type="checkbox"]')
                              .forEach((item) => {
                                item.checked = e.target.checked;
                              });
                            document
                              .getElementById("createSelected")
                              .querySelectorAll('input[type="checkbox"],label')
                              .forEach((item) => {
                                if (e.target.checked) {
                                  item.classList.remove("hidden");
                                } else {
                                  item.classList.add("hidden");
                                }
                              });
                          }}
                        />
                        All
                      </label>
                      {lunchgroups.map((item, i) => (
                        <div key={i} className={"ml-4"}>
                          <label htmlFor={`createGroup${item.id}`}>
                            <input
                              className={"mr-2"}
                              id={`createGroup${item.id}`}
                              type={"checkbox"}
                              onClick={function (e) {
                                document
                                  .getElementById(`create${item.id}`)
                                  .querySelectorAll('input[type="checkbox"]')
                                  .forEach((user) => {
                                    user.checked = e.target.checked;
                                  });
                                item.users.forEach((user) => {
                                  const u = document.getElementById(
                                    `createSelected${user.email}`
                                  );
                                  const label = document
                                    .getElementById("createSelected")
                                    .querySelector(
                                      `label[name=${CSS.escape(user.email)}]`
                                    );
                                  u.checked = e.target.checked;
                                  if (e.target.checked) {
                                    u.classList.remove("hidden");
                                    label.classList.remove("hidden");
                                  } else {
                                    u.classList.add("hidden");
                                    label.classList.add("hidden");
                                  }
                                });
                              }}
                            />
                            {item.title}
                          </label>
                          <div id={`create${item.id}`}>
                            {item.users.map((user, i) => (
                              <div key={i}>
                                <label
                                  name={`${user.firstname} ${user.lastname}`}
                                  className={`hidden name`}
                                  htmlFor={`create${user.email}`}
                                >
                                  <input
                                    className={"name mr-2"}
                                    id={`create${user.email}`}
                                    type={"checkbox"}
                                    onClick={function (e) {
                                      const u = document.getElementById(
                                        `createSelected${user.email}`
                                      );
                                      const label = document
                                        .getElementById("createSelected")
                                        .querySelector(
                                          `label[name=${CSS.escape(
                                            user.email
                                          )}]`
                                        );
                                      u.checked = e.target.checked;
                                      if (e.target.checked) {
                                        u.classList.remove("hidden");
                                        label.classList.remove("hidden");
                                      } else {
                                        u.classList.add("hidden");
                                        label.classList.add("hidden");
                                      }
                                    }}
                                  />
                                  {user.firstname} {user.lastname}
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col m-1 p-1 ">
                    <h5 className="uppercase">Valda anställda</h5>
                    <div className="w-72 p-1 overflow-y-scroll h-36 md:h-56">
                      <div id={"createSelected"}>
                        {allUsers.map((user, i) => (
                          <div key={i} className={`ml-4 `}>
                            <label
                              className={"hidden"}
                              name={user.email}
                              htmlFor={`createSelected${user.email}`}
                            >
                              <input
                                className={"mr-2 "}
                                id={`createSelected${user.email}`}
                                name={`users`}
                                value={user.id}
                                type={"checkbox"}
                                onClick={function (e) {
                                  document.getElementById(
                                    `create${user.email}`
                                  ).checked = e.target.checked;
                                  const label = document
                                    .getElementById("createSelected")
                                    .querySelector(
                                      `label[name=${CSS.escape(user.email)}]`
                                    );
                                  label.classList.add("hidden");
                                }}
                              />
                              {user.firstname} {user.lastname}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                    <button
                      className="btn btn-create md:m-2 md:mr-4"
                      type={"submit"}
                    >
                      Lägg till
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="flex justify-center">
            <div
              className={
                "flex   justify-center  md:justify-start flex-col md:pb-6 pb-20  px-3 md:pl-6 mt-4 "
              }
            >
              <div className=" pt-2 pb-1 pl-4 flex justify-center md:justify-start">
                <h5 className="uppercase  font-bold">Aktiva notifikationer</h5>
              </div>
              <div className=" overflow-y-auto h-56 md:h-72">
                {list.map((item, i) => (
                  <div
                    className={"flex flex-row bg-secondary-1 w-80 p-2"}
                    key={i}
                  >
                    <div
                      className={"flex flex-col"}
                      onClick={function () {
                        let background = document.getElementById("popup");
                        let window = document.getElementById("modifyNotif");
                        document.getElementById("modifyId").value = item.id;
                        document.getElementById("modifyTitle").value =
                          item.title;
                        document.getElementById("modifyDesc").innerText =
                          item.text;
                        document.getElementById("modifyDate").valueAsDate =
                          new Date(item.endDate);
                        item.users.forEach((user) => {
                          const email = user.user.email;
                          document.getElementById(
                            `modifySelected${email}`
                          ).checked = true;
                          document
                            .getElementById("modifySelected")
                            .querySelector(`label[name=${CSS.escape(email)}]`)
                            .classList.remove("hidden");
                        });
                        background.classList.remove(popHide);
                        window.classList.remove(popHide);
                      }}
                    >
                      <p className={"font-bold"}>{item.title}</p>
                      <p>{item.text}</p>
                      <p>
                        {item.startDate} - {item.endDate}
                      </p>
                    </div>
                    <form
                      className={"flex flex-row"}
                      action={"../../api/admin/deleteNotification"}
                      method={"POST"}
                    >
                      <input
                        type="hidden"
                        name="redirect"
                        value={"../../intranet/admin/notifications"}
                      />
                      <input type={"hidden"} name={"id"} value={item.id} />
                      <button type={"submit"}>&#10060;</button>
                    </form>
                  </div>
                ))}
              </div>
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
          <div className={`${popHide} window-pop`} id={"modifyNotif"}>
            <div className=" bg-secondary-1 flex flex-col ">
              <svg
                className="absolute  md:w-auto w-11/12 fill-secondary-l2 z-10"
                width="583"
                height="300"
                viewBox="0 0 583 300"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M226.041 260.709C184.025 273.974 2.33933 365.684 0.920135 208.794V19.9005C56.4885 -44.8465 110.155 74.6943 175.519 51.0007C261.316 19.9001 299.577 73.0311 372.138 83.2664C444.7 93.5018 500.556 62.8707 550.228 83.2664C599.9 103.662 579.96 163.921 571.09 183.532C562.22 203.144 567.907 219.22 527.741 231.904C494.871 242.284 517.027 219.794 408.369 269.965C299.711 320.136 268.058 247.443 226.041 260.709Z" />
              </svg>

              <div className="relative z-10 flex flex-row justify-between">
                <h5 className="uppercase flex justify-center md:justify-start md:pl-12 m-1 pl-8 mt-5 font-bold ">
                  Redigera notifikation
                </h5>
                <div className="md:pl-5 mt-5 mr-6 ">
                  <HiXMark
                    size={20}
                    style={{ cursor: "pointer" }}
                    onClick={function () {
                      document.getElementById("popup").classList.add(popHide);
                      document
                        .getElementById("modifyNotif")
                        .classList.add(popHide);
                    }}
                  />
                </div>
              </div>
              <div className="">
                <form
                  className={"relative z-10"}
                  action={"../../api/admin/modifyNotification"}
                  method={"POST"}
                >
                  <input
                    type="hidden"
                    name="redirect"
                    value={"../../intranet/admin/notifications"}
                  />
                  <div className=" ">
                    <div
                      className={
                        "flex flex-col md:flex-row justify-center md:justify-start md:pl-12 pl-4 mt-5  m-1"
                      }
                    >
                      <input type={"hidden"} name={"notifId"} id={"modifyId"} />
                      <div className={"flex flex-row"}>
                        <div className={"flex flex-col w-72 "}>
                          <input type={"hidden"} name={"id"} value={user.id} />
                          <input
                            className={"m-1 p-1"}
                            type={"date"}
                            id={"modifyDate"}
                            name={"date"}
                          />
                          <input
                            className={"m-1 p-1"}
                            type={"title"}
                            id={"modifyTitle"}
                            name={"title"}
                            placeholder={"Titel"}
                          />
                          <textarea
                            className={"m-1 p-1"}
                            rows={2}
                            id={"modifyDesc"}
                            name={"text"}
                            placeholder={"Text"}
                          />
                        </div>
                      </div>
                      <div
                        className={
                          "flex flex-col p-1 md:ml-4 overflow-y-scroll"
                        }
                      >
                        <input
                          id={"modifySearch"}
                          placeholder={"Sök anställd"}
                          type={"text"}
                          className={" p-1 mr-4"}
                        />
                        <div id={"modify"}>
                          <label>
                            <input
                              className={"selectAll p-2 m-2"}
                              type={"checkbox"}
                              onClick={function (e) {
                                document
                                  .getElementById("modify")
                                  .querySelectorAll('input[type="checkbox"]')
                                  .forEach((item) => {
                                    item.checked = e.target.checked;
                                  });
                                document
                                  .getElementById("modifySelected")
                                  .querySelectorAll('input[type="checkbox"]')
                                  .forEach((item) => {
                                    item.checked = e.target.checked;
                                  });
                                document
                                  .getElementById("modifySelected")
                                  .querySelectorAll("label")
                                  .forEach((item) => {
                                    if (e.target.checked) {
                                      item.classList.remove("hidden");
                                    } else {
                                      item.classList.add("hidden");
                                    }
                                  });
                              }}
                            />
                            All
                          </label>
                          {lunchgroups.map((item, i) => (
                            <div key={i} className={"ml-4"}>
                              <label htmlFor={`modifyGroup${item.id}`}>
                                <input
                                  className={"mr-2"}
                                  id={`modifyGroup${item.id}`}
                                  type={"checkbox"}
                                  onClick={function (e) {
                                    document
                                      .getElementById(`modify${item.id}`)
                                      .querySelectorAll(
                                        'input[type="checkbox"]'
                                      )
                                      .forEach((user) => {
                                        user.checked = e.target.checked;
                                      });
                                    item.users.forEach((user) => {
                                      const u = document.getElementById(
                                        `modifySelected${user.email}`
                                      );
                                      const label = document
                                        .getElementById("modifySelected")
                                        .querySelector(
                                          `label[name=${CSS.escape(
                                            user.email
                                          )}]`
                                        );
                                      u.checked = e.target.checked;
                                      if (e.target.checked) {
                                        u.classList.remove("hidden");
                                        label.classList.remove("hidden");
                                      } else {
                                        u.classList.add("hidden");
                                        label.classList.add("hidden");
                                      }
                                    });
                                  }}
                                />
                                {item.title}
                              </label>
                              <div id={`modify${item.id}`}>
                                {item.users.map((user, i) => (
                                  <div key={i}>
                                    <label
                                      name={`${user.firstname} ${user.lastname}`}
                                      className={`hidden name`}
                                      htmlFor={`modify${user.email}`}
                                    >
                                      <input
                                        className={"name mr-2"}
                                        id={`modify${user.email}`}
                                        type={"checkbox"}
                                        onClick={function (e) {
                                          const u = document.getElementById(
                                            `modifySelected${user.email}`
                                          );
                                          const label = document
                                            .getElementById("modifySelected")
                                            .querySelector(
                                              `label[name=${CSS.escape(
                                                user.email
                                              )}]`
                                            );
                                          u.checked = e.target.checked;
                                          if (e.target.checked) {
                                            u.classList.remove("hidden");
                                            label.classList.remove("hidden");
                                          } else {
                                            u.classList.add("hidden");
                                            label.classList.add("hidden");
                                          }
                                        }}
                                      />
                                      {user.firstname} {user.lastname}
                                    </label>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="flex flex-col m-1 ">
                        <h5 className="uppercase">Valda anställda</h5>
                        <div className="w-72 p-1 overflow-y-scroll h-36 md:h-48">
                          <div id={"modifySelected"}>
                            {allUsers.map((user, i) => (
                              <div key={i} className={`ml-4`}>
                                <label
                                  className={"hidden"}
                                  name={user.email}
                                  htmlFor={`modifySelected${user.email}`}
                                >
                                  <input
                                    className={"mr-2"}
                                    id={`modifySelected${user.email}`}
                                    name={`users`}
                                    value={user.id}
                                    type={"checkbox"}
                                    onClick={function (e) {
                                      document.getElementById(
                                        `modify${user.email}`
                                      ).checked = e.target.checked;
                                      const label = document
                                        .getElementById("modifySelected")
                                        .querySelector(
                                          `label[name=${CSS.escape(
                                            user.email
                                          )}]`
                                        );
                                      label.classList.add("hidden");
                                    }}
                                  />
                                  {user.firstname} {user.lastname}
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <button
                        className={"btn btn-create m-4 mr-6 "}
                        type={"submit"}
                      >
                        Ändra
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LayoutIntranet>
  );
}
