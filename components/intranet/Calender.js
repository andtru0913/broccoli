import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import List from "../userlist";
import ReactDOM from "react-dom/client";
import { HiXMark } from "react-icons/hi2";
import { useState } from "react";

const Component = ({ user, allEvents, setIscoming }) => {
  const popHide = "pop-hide";
  const admin = user.admin;

  return (
    <FullCalendar
      plugins={[dayGridPlugin, interactionPlugin]}
      selectable
      editable={admin}
      height={"80vh"}
      select={function (e) {
        if (admin) {
          e.start.setDate(e.start.getDate() + 1);
          let background = document.getElementById("popup");
          let window = document.getElementById("createevent");
          background.classList.remove(popHide);
          window.classList.remove(popHide);
          window.getElementsByClassName("start")[0].valueAsDate = e.start;
          window.getElementsByClassName("end")[0].valueAsDate = e.end;
        }
      }}
      eventClick={function (e) {
        let id = e.event._def.publicId;
        if (!!id) {
          let background = document.getElementById("popup");
          let description = e.event._def.extendedProps.description;
          let title = e.event._def.title;
          let users = e.event._def.extendedProps.users;
          let start = e.event.start;
          let end = e.event.end || start;

          background.classList.remove(popHide);
          if (admin) {
            let modifyevent = document.getElementById("modifyevent");
            modifyevent.getElementsByClassName("title")[0].value = title;
            modifyevent.getElementsByClassName("description")[0].value =
              description;

            modifyevent.getElementsByClassName("id")[0].value = id;
            modifyevent.getElementsByClassName("id")[1].value = id;
            modifyevent.getElementsByClassName("eventid")[0].value = id;
            modifyevent.getElementsByClassName("eventid")[1].value = id;
            document.getElementById("modifyStart").valueAsDate = new Date(
              start
            );
            document.getElementById("modifyEnd").valueAsDate = new Date(end);
            const root = ReactDOM.createRoot(
              document.getElementById("modifyRoot")
            );
            root.render(<List key={id} users={users} />);
            modifyevent.classList.remove(popHide);
          } else {
            users.map((usr) =>
              user.id === usr.user.id ? setIscoming(usr.coming) : ""
            );

            let checkevent = document.getElementById("checkevent");
            checkevent.getElementsByClassName("title")[0].innerText = title;
            checkevent.getElementsByClassName("description")[0].innerText =
              description;
            checkevent.getElementsByClassName("start")[0].innerText = start;
            checkevent.getElementsByClassName("end")[0].innerText = end;
            checkevent.getElementsByClassName("eventid")[0].value = id;
            checkevent.getElementsByClassName("eventid")[1].value = id;
            const root = ReactDOM.createRoot(
              document.getElementById("checkRoot")
            );
            root.render(<List key={id} users={users} user={user} />);

            checkevent.classList.remove(popHide);
          }
        }
      }}
      eventDrop={function (e) {
        let id = e.event._def.publicId;
        let delta = e.delta.days;
        let xhr = new XMLHttpRequest();
        xhr.open("POST", "../../api/admin/modifyEventDate", true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(
          JSON.stringify({
            id: id,
            delta: delta,
          })
        );
      }}
      eventResize={function (e) {
        let id = e.event._def.publicId;
        let delta = e.endDelta.days;
        let xhr = new XMLHttpRequest();
        xhr.open("POST", "../../api/admin/resizeEvent", true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(
          JSON.stringify({
            id: id,
            delta: delta,
          })
        );
      }}
      events={allEvents}
      displayEventTime={false}
      eventDisplay={"block"}
    />
  );
};

const Calender = ({ user, allEvents, cal }) => {
  const popHide = "pop-hide" || "";
  const [iscoming, setIscoming] = useState(undefined);
  return (
    <div className="flex justify-center bg-scondary-1">
      <div
        id="popup"
        className={`popup ${popHide}`}
        onClick={function () {
          document.getElementById("checkevent").classList.add(popHide);
          document.getElementById("modifyevent").classList.add(popHide);
          document.getElementById("createevent").classList.add(popHide);
          document.getElementById("popup").classList.add(popHide);
        }}
      ></div>
      <div></div>

      <div id="createevent" className={` window-pop ${popHide}`}>
        <div className="relative rounded p-5 m-2 bg-secondary-1 ">
          <div className=" flex flex-row justify-between">
            <h3 className="uppercase text-lg md:h1"> Skapa Event</h3>
            <button
              type=""
              onClick={function () {
                document.getElementById("popup").classList.add(popHide);
                document.getElementById("createevent").classList.add(popHide);
              }}
            >
              <div className="absolute top-0 right-0 p-3 hover:text-muted">
                <HiXMark />
              </div>
            </button>
          </div>
          <form action="../../api/admin/createEvent" method="POST">
            <input
              type="hidden"
              name="redirect"
              value={"../../intranet/fullcalender"}
            />
            <div className="flex flex-col md:flex-row  py-4">
              <div className="flex flex-row">
                <p className="pr-2"> Från</p>
                <input
                  className="start px-2 hover:bg-tiertary-1 rounded"
                  type="date"
                  name="start"
                />
              </div>
              <div className="flex flex-row px-2">
                <p className="px-2">Till </p>
                <input
                  className="end px-2 hover:bg-tiertary-1 rounded"
                  type="date"
                  name="end"
                />
              </div>
            </div>
            <div className="flex flex-col">
              <input
                className="p-2 border rounded mb-2"
                type="text"
                name="title"
                placeholder="Titel"
              />
              <input
                className="p-2 border rounded mb-2"
                type="text"
                name="description"
                placeholder="Beskrivning"
              />
              <button className="shadow btn btn-create" type="submit">
                Skapa
              </button>
            </div>
          </form>
        </div>
      </div>
      <div id="modifyevent" className={`window-pop ${popHide}`}>
        <div className="relative bg-secondary-1 rounded  m-2 overflow-auto ">
          <div className=" flex flex-row justify-between sticky top-0 bg-secondary-1 p-5 shadow-md">
            <h4 className="uppercase font-bold text-lg md:h1 "> Ändra Event</h4>
            <button
              type=""
              onClick={function () {
                document.getElementById("popup").classList.add(popHide);
                document.getElementById("modifyevent").classList.add(popHide);
              }}
            >
              <div className="absolute top-0 right-0 p-3 hover:text-muted">
                <HiXMark size={20} />
              </div>
            </button>
          </div>
          <div className="flex flex-col md:flex-row flex-1 p-5">
            <div className="flex flex-col md:flex-row gap-2 py-4">
              <div className="flex flex-col">
                <form action="../../api/admin/modifyEvent" method="POST">
                  <input
                    type={"hidden"}
                    name={"redirect"}
                    value={"../../intranet/fullcalender"}
                  />
                  <div className="flex flex-col md:flex-row gap-2 py-4">
                    <div className="flex flex-row">
                      <p className="pr-2 text-muted"> Från</p>
                      <input
                        className="start px-2 hover:bg-tiertary-1 rounded"
                        type="date"
                        id={"modifyStart"}
                        name="start"
                      />
                    </div>

                    <div className="flex flex-row ">
                      <p className="px-2 text-muted">Till </p>
                      <input
                        className="end px-2 hover:bg-tiertary-1 rounded"
                        type="date"
                        name="end"
                        id={"modifyEnd"}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row gap-2 py-4">
                    <div className="flex flex-col ">
                      <p>Titel</p>
                      <input className="id p-2" type="hidden" name="id" />
                      <input
                        className="title p-2 rounded"
                        type="text"
                        name="title"
                        placeholder="Titel"
                      />
                    </div>

                    <div className="flex flex-col ">
                      <p>Beskrivning</p>
                      <textarea
                        className="description p-2 rounded"
                        name="description"
                        placeholder="Beskrivning"
                      />
                    </div>
                  </div>
                  <button className="shadow btn btn-modify" type="submit">
                    Ändra händelse
                  </button>
                </form>
                <div className="pt-2">
                  <form action="../../api/admin/deleteEvent" method="POST" onSubmit={function (e) {
                    if (!confirm("Är du säker?")) {
                      e.preventDefault()
                    }
                  }}>
                    <input
                      type={"hidden"}
                      name={"redirect"}
                      value={"../../intranet/fullcalender"}
                    />
                    <input
                      className="id p-2 border rounded mb-2"
                      type="hidden"
                      name="id"
                    />
                    <button className="btn btn-delete" type="submit">
                      Radera händelse
                    </button>
                  </form>
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex flex-row h-auto gap-2 p-4 md:pr-0 items-center md:items-start justify-center">
                <form action="../../api/joinEvent" method="POST">
                  <input className="eventid" type="hidden" name="eventid" />
                  <input
                    type="hidden"
                    name="redirect"
                    value={"../intranet/calendar"}
                  />
                  <button className=" btn btn-create" type="Submit">
                    Kommer
                  </button>
                </form>

                <form action="../../api/leaveEvent" method="POST">
                  <input className="eventid" type="hidden" name="eventid" />
                  <input
                    type="hidden"
                    name="redirect"
                    value={"../intranet/calendar"}
                  />
                  <button className="btn btn-delete" type="Submit">
                    Kommer inte
                  </button>
                </form>
              </div>
              <div className="flex flex-col flex-1 gap-2 p-4 md:pr-0 items-center w-full">
                <div className="w-full" id="modifyRoot" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="checkevent" className={`window-pop ${popHide}`}>
        <div className="relative bg-secondary-1 rounded  overflow-auto h-full">
          <div className=" flex flex-row justify-between sticky top-0 bg-secondary-1 p-5 shadow-md">
            <h4> </h4>
            <button
              type=""
              onClick={function () {
                document.getElementById("popup").classList.add(popHide);
                document.getElementById("checkevent").classList.add(popHide);
              }}
            >
              <div className="absolute top-0 right-0 p-3 hover:text-muted">
                <HiXMark size={20} />
              </div>
            </button>
          </div>
          <div className="bg-secondary-1 rounded p-2 md:p-5">
            <h1 className={"title"}> </h1>
            <p className={"description"}></p>

            <div className="flex flex-col md:flex-row gap-2 py-4">
              <div className="flex flex-row">
                <p className="pr-2 text-muted"> Från</p>
                <p className="start px-2 hover:bg-tiertary-1 rounded" />
              </div>

              <div className="flex flex-row ">
                <p className="px-2 text-muted">Till </p>
                <p className="end px-2 hover:bg-tiertary-1 rounded" />
              </div>
            </div>

            <div className="flex flex-col">
              <div className="flex flex-row flex-1 h-auto gap-1 md:gap-2 mb-4 md:py-4 md:pl-4 items-center md:items-start justify-center">
                <form action="../../api/joinEvent" method="POST">
                  <input className="eventid" type="hidden" name="eventid" />

                  <button
                    className={`btn btn-empty normal-case  text-xs md:text-base ${
                      iscoming ? "bg-primary-1 " : ""
                    }`}
                    type="Submit"
                  >
                    Kommer
                  </button>
                </form>

                <form action="../../api/leaveEvent" method="POST">
                  <input className="eventid" type="hidden" name="eventid" />
                  <button
                    className={`btn btn-empty normal-case text-xs md:text-base ${
                      iscoming ? " " : "bg-primary-1"
                    }`}
                    type="Submit"
                  >
                    Kommer ej
                  </button>
                </form>
              </div>
              <div className="flex flex-col flex-1 gap-2md:py-4 md:pl-4 items-center w-full">
                <div className="w-full" id="checkRoot" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="layout    flex flex-col md:items-center h-screen w-full">
        <div className="grid grid-cols-2 w-full justify-start">
          <a
            className={`p-4 font-medium  ${
              cal === "mine"
                ? ""
                : "bg-fill-3 hover:bg-fill-1 text-secondary-d1"
            } `}
            href={"./calendar"}
          >
            Mina händelser
          </a>

          <a
            className={`p-4 font-medium  ${
              cal === "all"
                ? ""
                : "bg-fill-3 hover:bg-fill-1 text-secondary-d1 "
            } `}
            href={"./fullcalender"}
          >
            Alla händelser
          </a>
        </div>
        <div className="w-screen p-2 md:w-4/5">
          {Component({ user, allEvents, setIscoming })}
        </div>
      </div>
    </div>
  );
};

export default Calender;
