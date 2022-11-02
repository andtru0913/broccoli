import FullCalendar from "@fullcalendar/react";
import interactionPlugin from "@fullcalendar/interaction";
import dayGridPlugin from '@fullcalendar/daygrid';
import calendarStyles from "./calendar.module.css";
import styles from "../../styles/Home.module.css";
import Head from "next/head";
import * as Database from "../../Database";
import popupStyles from "./popup.module.css"

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

const Calendar = ({admin, allEvents}) => {
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
                    checkevent.classList.remove(popupStyles.hide)
                }
            }}
            eventDrop={function(e) {
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

export default function Home({admin,allEvents}) {
    return (
        <div className={styles.container}>
            <div id='popup' className={`${popupStyles.popUp} ${popupStyles.hide}`} onClick={function() {
                document.getElementById('popup').classList.add(popupStyles.hide);
                document.getElementById('checkevent').classList.add(popupStyles.hide);
                document.getElementById('modifyevent').classList.add(popupStyles.hide);
                document.getElementById('createevent').classList.add(popupStyles.hide);
            }}>
            </div>
            <div id='createevent' className={`${popupStyles.window}  ${popupStyles.hide}`}>
                <h1> Create Event</h1>
                <form action="../../api/createEvent" method="POST">
                    <div className={popupStyles.dateForm}>
                        Från <input className='start' type="date" name="start"/> till <input className='end' type="date" name="end"/>
                    </div>
                    <input type="text" name="title" placeholder="Titel"/>
                    <input type="text" name="description" placeholder="Beskrivning"/>
                    <button type="submit"> Skapa </button>
                </form>
            </div>
            <div id='modifyevent' className={`${popupStyles.window} ${popupStyles.hide}`}>
                <h1> Modify Event</h1>
                <form action="../../api/modifyEvent" method="POST">
                    <input className={"id"} type="hidden" name="id"/>
                    <input className="title" type="text" name="title" placeholder="Titel"/>
                    <input className="description" type="text" name="description" placeholder="Beskrivning"/>
                    <button type="submit"> Ändra händelse</button>
                </form>
                <form action="../../api/deleteEvent" method="POST">
                    <input className={"id"} type="hidden" name="id"/>
                    <button type="submit"> Radera händelse</button>
                </form>
            </div>
            <div id='checkevent' className={`${popupStyles.window} ${popupStyles.hide}`}>
                <h1> Check Event</h1>
                <h2 className={'title'}></h2>
                <p className={'description'}></p>
            </div>

            <Head>
                <title>Admin</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/public/favicon.ico" />
            </Head>
            <main className={styles.main}>
                <div className={calendarStyles.main}>
                    {Calendar({admin, allEvents})}
                </div>
            </main>
        </div>
    )
}
