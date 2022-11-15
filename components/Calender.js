import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import LayoutIntranet from "./layout/layoutIntranet";
import popupStyles from "/styles/popup.module.css";
import List from "./userlist";
import ReactDOM from "react-dom/client";
import { useState } from "react";
import Modal from "./modal";
import { HiXMark } from "react-icons/hi2";

const Component = ({ admin, allEvents }) => {
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
          background.classList.remove(popupStyles.hide);
          window.classList.remove(popupStyles.hide);
          window.getElementsByClassName("start")[0].valueAsDate = e.start;
          window.getElementsByClassName("end")[0].valueAsDate = e.end;
        }
      }}
      eventClick={function (e) {
        let background = document.getElementById("popup");
        let description = e.event._def.extendedProps.description;
        let title = e.event._def.title;
        let id = e.event._def.publicId;
        let users = e.event._def.extendedProps.users;
        background.classList.remove(popupStyles.hide);
        if (admin) {
          let modifyevent = document.getElementById("modifyevent");
          modifyevent.getElementsByClassName("title")[0].value = title;
          modifyevent.getElementsByClassName("description")[0].value =
            description;
          modifyevent.getElementsByClassName("id")[0].value = id;
          modifyevent.getElementsByClassName("id")[1].value = id;
          modifyevent.getElementsByClassName("eventid")[0].value = id;
          modifyevent.getElementsByClassName("eventid")[1].value = id;
          modifyevent.getElementsByClassName("eventid")[2].value = id;
          const root = ReactDOM.createRoot(
            document.getElementById("modifyRoot")
          );
          root.render(<List key={id} users={users} />);
          modifyevent.classList.remove(popupStyles.hide);
        } else {
          let checkevent = document.getElementById("checkevent");
          checkevent.getElementsByClassName("title")[0].innerText = title;
          checkevent.getElementsByClassName("description")[0].innerText =
            description;
          checkevent.getElementsByClassName("eventid")[0].value = id;
          checkevent.getElementsByClassName("eventid")[1].value = id;
          checkevent.getElementsByClassName("eventid")[2].value = id;
          const root = ReactDOM.createRoot(
            document.getElementById("checkRoot")
          );
          root.render(<List key={id} users={users} />);
          checkevent.classList.remove(popupStyles.hide);
        }
      }}
      eventDrop={function (e) {
        let id = e.event._def.publicId;
        let delta = e.delta.days;
        let xhr = new XMLHttpRequest();
        xhr.open("POST", "../../api/modifyEventDate", true);
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
        xhr.open("POST", "../../api/resizeEvent", true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(
          JSON.stringify({
            id: id,
            delta: delta,
          })
        );
      }}
      events={allEvents}
    />
  );
};

const Calender = ({ admin, allEvents }) => {
  return (
    <LayoutIntranet>
      <div
        id="popup"
        className={`popup ${popupStyles.hide}`}
        onClick={function () {
          document.getElementById("checkevent").classList.add(popupStyles.hide);
          document
            .getElementById("modifyevent")
            .classList.add(popupStyles.hide);

          document
            .getElementById("createevent")
            .classList.add(popupStyles.hide);
          document.getElementById("popup").classList.add(popupStyles.hide);
        }}
      ></div>
      <div></div>

      <div id="createevent" className={`window-pop ${popupStyles.hide}`}>
        <div className="relative bg-skin-fill rounded p-5 m-2 ">
          <div className=" flex flex-row justify-between">
            <h3 className="uppercase text-lg md:h1"> Skapa Event</h3>
            <button
              type=""
              onClick={function () {
                document
                  .getElementById("popup")
                  .classList.add(popupStyles.hide);
                document
                  .getElementById("createevent")
                  .classList.add(popupStyles.hide);
              }}
            >
              <div className="absolute top-0 right-0 p-3 hover:text-skin-muted">
                <HiXMark />
              </div>
            </button>
          </div>
          <form action="../../api/createEvent" method="POST">
            <div className="flex flex-col md:flex-row  py-4">
              <div className="flex flex-row">
                <p className="pr-2"> Från</p>
                <input
                  className="start px-2 hover:bg-zinc-300 rounded"
                  type="date"
                  name="start"
                />
              </div>

              <div className="flex flex-row px-2">
                <p className="px-2">till </p>
                <input
                  className="end px-2 hover:bg-zinc-300 rounded"
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
      <div id="modifyevent" className={`window-pop ${popupStyles.hide}`}>
        <div className="relative bg-skin-fill rounded p-5 m-2 ">
          <div className=" flex flex-row justify-between">
            <h4 className="uppercase text-lg md:h1"> Ändra Event</h4>
            <button
              type=""
              onClick={function () {
                document
                  .getElementById("popup")
                  .classList.add(popupStyles.hide);
                document
                  .getElementById("modifyevent")
                  .classList.add(popupStyles.hide);
              }}
            >
              <div className="absolute top-0 right-0 p-3 hover:text-skin-muted">
                <HiXMark />
              </div>
            </button>
          </div>
          <div className="flex flex-col md:flex-row flex-1 scroll-auto">
            <div className="flex flex-col md:flex-row gap-2 py-4">
              <div className="flex flex-col">
                <form action="../../api/modifyEvent" method="POST">
                  <div className="flex flex-col md:flex-row gap-2 py-4">
                    <div className="flex flex-row">
                      <p className="pr-2"> Från</p>
                      <input
                        className="start px-2 hover:bg-zinc-300 rounded"
                        type="date"
                        name="start"
                      />
                    </div>

                    <div className="flex flex-row ">
                      <p className="px-2">Till </p>
                      <input
                        className="end px-2 hover:bg-zinc-300 rounded"
                        type="date"
                        name="end"
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
                      <input
                        className="description p-2 rounded"
                        type="text"
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
                  <form action="../../api/deleteEvent" method="POST">
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
            <div className="flex flex-col md:flex-row gap-2 p-4 md:pr-0 items-center md:items-start justify-center">
              <form action="../../api/joinEvent" method="POST">
                <input className="eventid" type="hidden" name="eventid" />
                <button className="btn btn-create" type="Submit">
                  Kommer
                </button>
              </form>

              <form action="../../api/maybeEvent" method="POST">
                <input className="eventid" type="hidden" name="eventid" />
                <button className="btn btn-modify" type="Submit">
                  Kanske
                </button>
              </form>
              <form action="../../api/leaveEvent" method="POST">
                <input className="eventid" type="hidden" name="eventid" />
                <button className="btn btn-delete" type="Submit">
                  Kommer inte
                </button>
              </form>
            </div>
          </div>
          <div id="modifyRoot" />
        </div>
      </div>
      <div id="checkevent" className={`window-pop ${popupStyles.hide}`}>
        <div className="bg-white rounded p-5">
          <h1> Check Event</h1>
          <h2 className={"title"}></h2>
          <p className={"description"}></p>
          <form action="../../api/joinEvent" method="POST">
            <input className="eventid" type="hidden" name="eventid" />
            <button type="Submit">Gå med</button>
          </form>
          <form action="../../api/leaveEvent" method="POST">
            <input className="eventid" type="hidden" name="eventid" />
            <button type="Submit">Lämna</button>
          </form>
          <form action="../../api/maybeEvent" method="POST">
            <input className="eventid" type="hidden" name="eventid" />
            <button type="Submit">Kanske</button>
          </form>
        </div>
      </div>

      <div className="layout py-8 md:py-12  flex flex-col items-center">
        <div className="flex flex-row gap-4">
          <a
            className="p-2 bg-skin-button-accent text-skin-inverted rounded-sm"
            href={"./calendar"}
          >
            Mina händelser
          </a>

          <a
            className="p-2 bg-skin-button-accent text-skin-inverted rounded-sm"
            href={"./fullcalender"}
          >
            Alla händelser
          </a>
        </div>
        <div className="w-screen p-2 md:w-4/5">
          {Component({ admin, allEvents })}
        </div>
      </div>
    </LayoutIntranet>
  );
};

export default Calender;
