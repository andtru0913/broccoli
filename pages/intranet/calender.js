import FullCalendar from "@fullcalendar/react";
import interactionPlugin from "@fullcalendar/interaction";
import dayGridPlugin from '@fullcalendar/daygrid';
import calendarStyles from "./calendar.module.css";
import styles from "../../styles/Home.module.css";
import Head from "next/head";
import * as Database from "../../Database";
import popupStyles from "./popup.module.css"
import LayoutIntranet from "../../components/layout/layoutIntranet";

export async function getServerSideProps(context) {
    let cookies = context.req.cookies['userid']
    let user = await Database.getUserinfo(cookies)
    let events = await Database.getEvents(undefined);
    if (user === undefined || user === null) {
        return {
            redirect: {
                permanent: false,
                destination: "/intranet",
            },
            props: {},
        };
    }
    else {
        return {
            props: {
                user: user,
                allEvents: events
            }
        }
    }
}

const Calender = ({ user, allEvents }) => {
    return (
        <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            selectable
            editable={user.admin}
            height={'80vh'}
            longPressDelay={1}
            select={function (e) {
                if (user.admin) {
                    e.start.setDate(e.start.getDate() + 1)
                    let background = document.getElementById('popup')
                    let window = document.getElementById('createevent')
                    background.classList.remove(popupStyles.hide)
                    window.classList.remove(popupStyles.hide)
                    window.getElementsByClassName('start')[0].valueAsDate = e.start
                    window.getElementsByClassName('end')[0].valueAsDate = e.end
                }
            }}
            eventClick={function (e) {
                let background = document.getElementById('popup')
                let checkevent = document.getElementById('checkevent')
                let modifyevent = document.getElementById('modifyevent')
                let description = e.event._def.extendedProps.description
                let title = e.event._def.title
                let id = e.event._def.publicId
                background.classList.remove(popupStyles.hide)
                if (user.admin) {
                    modifyevent.getElementsByClassName('title')[0].value = title
                    modifyevent.getElementsByClassName('description')[0].value = description
                    modifyevent.getElementsByClassName('id')[0].value = id
                    modifyevent.getElementsByClassName('id')[1].value = id
                    modifyevent.classList.remove(popupStyles.hide)
                } else {
                    checkevent.getElementsByClassName('title')[0].innerText = title
                    checkevent.getElementsByClassName('description')[0].innerText = description
                    checkevent.classList.remove(popupStyles.hide)
                }
            }}
            eventDrop={function (e) {
                let id = e.event._def.publicId
                let delta = e.delta.days
                let xhr = new XMLHttpRequest();
                xhr.open("POST", "../../api/modifyEventDate", true);
                xhr.setRequestHeader('Content-Type', 'application/json');
                xhr.send(JSON.stringify({
                    id: id,
                    delta: delta
                }));
            }

            }
            eventResize={function (e) {
                let id = e.event._def.publicId
                let delta = e.endDelta.days
                console.log(delta);
                let xhr = new XMLHttpRequest();
                xhr.open("POST", "../../api/resizeEvent", true);
                xhr.setRequestHeader('Content-Type', 'application/json');
                xhr.send(JSON.stringify({
                    id: id,
                    delta: delta
                }));
            }}
            events={allEvents}
        />

    );
};

export default function Home({ user, allEvents }) {
    const popUpstyle = "h-full w-screen bg-black absolute z-20 bg-opacity-60"
    const windowstyle = "z-30 absolute w-screen p-4  top-1/3 md:left-1/4 flex flex-col md:w-1/2 -translate-1/2 "

    return (
        <div className="">
            <div id='popup' className={`${popUpstyle} ${popupStyles.hide}`} onClick={function () {
                document.getElementById('popup').classList.add(popupStyles.hide);
                document.getElementById('checkevent').classList.add(popupStyles.hide);
                document.getElementById('modifyevent').classList.add(popupStyles.hide);
                document.getElementById('createevent').classList.add(popupStyles.hide);
            }}>
            </div>
            <div id='createevent' className={`${windowstyle}  ${popupStyles.hide}`}>
                <div className="bg-white rounded p-5">
                    <h3 className="text-darkest"> Create Event</h3>
                    <form action="../../api/createEvent" method="POST">
                        <div className="flex flex-row py-4">
                            <div className="flex flex-row">


                                <p className="pr-2"> Från</p>
                                <input className='start hover:bg-zinc-300 rounded' type="date" name="start" />
                            </div>


                            <div className="flex flex-row px-2">
                                <p className="px-2">till </p>
                                <input className='end hover:bg-zinc-300 rounded' type="date" name="end" />
                            </div>

                        </div>
                        <div className="flex flex-col">
                            <input className="p-2 border rounded mb-2" type="text" name="title" placeholder="Titel" />
                            <input className="p-2 border rounded mb-2" type="text" name="description" placeholder="Beskrivning" />
                            <button className="shadow btn btn-create" type="submit"> Skapa </button>
                        </div>


                    </form>
                </div>

            </div>
            <div id='modifyevent' className={`${windowstyle} ${popupStyles.hide}`}>
                <div className="bg-white rounded p-5">
                    <h1> Modify Event</h1>
                    <form action="../../api/modifyEvent" method="POST">
                   
                        <div className="flex flex-row">
                            Från <input className='start' type="date" name="start" /> till <input className='end' type="date" name="end" />
                        </div>
                        <input className="id p-2" type="hidden" name="id" />
                        <input className="title p-2 " type="text" name="title" placeholder="Titel" />
                        <input className="description p-2" type="text" name="description" placeholder="Beskrivning" />
                        <button className="shadow btn btn-create" type="submit"> Ändra händelse</button>
                    </form>
                    <form action="../../api/deleteEvent" method="POST">
                    
                        <input className="id p-2 border rounded mb-2" type="hidden"  name="id" />
                        <button className="btn btn-delete" type="submit"> Radera händelse</button>
                    </form>
                </div>

            </div>
            <div id='checkevent' className={`${windowstyle} ${popupStyles.hide}`}>
                <div className="bg-white rounded p-5">
                    <h1> Check Event</h1>
                    <h2 className={'title'}></h2>
                    <p className={'description'}></p>
                </div>
            </div>

            <Head>
                <title>Admin</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/public/favicon.ico" />
            </Head>


            <LayoutIntranet>

                <main >
                    <div className='layout py-12  flex flex-col items-center'>

                        <div className="w-screen p-2 md:w-4/5">
                            {Calender({ user, allEvents })}
                        </div>
                    </div>
                </main>
            </LayoutIntranet>
        </div>
    )
}
