import FullCalendar from "@fullcalendar/react";
import interactionPlugin from "@fullcalendar/interaction";
import dayGridPlugin from '@fullcalendar/daygrid';
import calendarStyles from "./calendar.module.css";
import styles from "../../styles/Home.module.css";
import Head from "next/head";
import * as Database from "../../Database";

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
            props:{},
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

const Calendar = ({user, allEvents}) => {
    return (
        <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            selectable
            height={'80vh'}
            select={function (e) {
                if(user.admin) {
                    e.start.setDate(e.start.getDate()+1)
                    let background = document.getElementById('popup')
                    let window = document.getElementById('createevent')
                    background.classList.remove(calendarStyles.hide)
                    window.classList.remove(calendarStyles.hide)
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
                background.classList.remove(calendarStyles.hide)
                if (user.admin) {
                    modifyevent.getElementsByClassName('title')[0].value = title
                    modifyevent.getElementsByClassName('description')[0].value = description
                    modifyevent.getElementsByClassName('id')[0].value = id
                    modifyevent.getElementsByClassName('id')[1].value = id
                    modifyevent.classList.remove(calendarStyles.hide)

                } else {
                    checkevent.getElementsByClassName('title')[0].innerText = title
                    checkevent.getElementsByClassName('description')[0].innerText = description
                    checkevent.classList.remove(calendarStyles.hide)
                }
            }}
            events={allEvents}
        />
    );
};

export default function Home({user,allEvents}) {
    return (
        <div className={styles.container}>
            <div id='popup' className={`${calendarStyles.popUp} ${calendarStyles.hide}`} onClick={function() {
                document.getElementById('popup').classList.add(calendarStyles.hide);
                document.getElementById('checkevent').classList.add(calendarStyles.hide);
                document.getElementById('modifyevent').classList.add(calendarStyles.hide);
                document.getElementById('createevent').classList.add(calendarStyles.hide);
            }}>
            </div>
            <div id='createevent' className={`${calendarStyles.window}  ${calendarStyles.hide}`}>
                <h1> Create Event</h1>
                <form action="../../api/createEvent" method="POST">
                    <div className={calendarStyles.dateForm}>
                        Från <input className='start' type="date" name="start"/> till <input className='end' type="date" name="end"/>
                    </div>
                    <input type="text" name="title" placeholder="Titel"/>
                    <input type="text" name="description" placeholder="Beskrivning"/>
                    <button type="submit"> Skapa </button>
                </form>
            </div>
            <div id='modifyevent' className={`${calendarStyles.window} ${calendarStyles.hide}`}>
                <h1> Modify Event</h1>
                <form action="../../api/modifyEvent" method="POST">
                    <input className={`id  ${calendarStyles.hide}`} type="text" name="id"/>
                    <input className="title" type="text" name="title" placeholder="Titel"/>
                    <input className="description" type="text" name="description" placeholder="Beskrivning"/>
                    <button type="submit"> Ändra händelse</button>
                </form>
                <form action="../../api/deleteEvent" method="POST">
                    <input className={`id  ${calendarStyles.hide}`} type="text" name="id"/>
                    <button type="submit"> Radera händelse</button>
                </form>
            </div>
            <div id='checkevent' className={`${calendarStyles.window} ${calendarStyles.hide}`}>
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
                    {Calendar({user, allEvents})}
                </div>
            </main>
        </div>
    )
}
