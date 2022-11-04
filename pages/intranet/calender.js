import FullCalendar from "@fullcalendar/react";
import interactionPlugin from "@fullcalendar/interaction";
import dayGridPlugin from '@fullcalendar/daygrid';
import styles from "../../styles/Home.module.css";
import Head from "next/head";
import * as Database from "../../Database";
import popupStyles from "./popup.module.css"
import LayoutIntranet from "../../components/layout/layoutIntranet";

export async function getServerSideProps(context) {
    let cookies = JSON.parse(context.req.cookies['user'] || null)
    let admin = await Database.isAdmin(cookies.id)
    if (cookies !== {}) {
        let events = await Database.getEvents(undefined);

        return {
            props: {
                admin: admin,
                allEvents: events
            }
        }
    }
    return {
        redirect: {
            permanent: false,
            destination: "/intranet",
        },
        props:{},
    };
}

const Calender = ({ admin, allEvents }) => {
    return (
        <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            selectable
            editable={admin}
            height={'80vh'}
            select={function (e) {
                if(admin) {
                    e.start.setDate(e.start.getDate()+1)
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
                if (admin) {
                    modifyevent.getElementsByClassName('title')[0].value = title
                    modifyevent.getElementsByClassName('description')[0].value = description
                    modifyevent.getElementsByClassName('id')[0].value = id
                    modifyevent.getElementsByClassName('id')[1].value = id
                    modifyevent.classList.remove(popupStyles.hide)
                } else {
                    checkevent.getElementsByClassName('title')[0].innerText = title
                    checkevent.getElementsByClassName('description')[0].innerText = description
                    checkevent.getElementsByClassName('eventid')[0].value = id
                    checkevent.getElementsByClassName('eventid')[1].value = id
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

export default function Home({admin,allEvents}) {
    const windowstyle = "z-30 absolute w-screen p-4  top-1/3 md:left-1/4 flex flex-col md:w-1/2 -translate-1/2 "

    return (
        <div className={styles.container}>
            <div id='popup' className={`${popupStyles.popUp} ${popupStyles.hide}`} onClick={function() {
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
                    <input  className="p-2 border rounded mb-2" type="text" name="description" placeholder="Beskrivning" />
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
                    <form action="../../api/joinEvent" method="POST">
                        <input className="eventid" type="hidden" name="eventid"/>
                        <button type="Submit">Gå med</button>
                    </form>
                    <form action="../../api/leaveEvent" method="POST">
                        <input className="eventid" type="hidden" name="eventid"/>
                        <button type="Submit">Lämna</button>
                    </form>
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
                            {Calender({ admin, allEvents })}
                        </div>
                    </div>
                </main>
            </LayoutIntranet>
        </div>
    )
}
