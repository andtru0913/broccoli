import {SMTPClient} from "emailjs";
import checkAdmin from "./checkAdmin";
import {createEvent} from "../../../Database";

export default async function handler(req, res) {
    if(req.method !== 'POST') {
        res.redirect(302, '../intranet')
    }
    if (await checkAdmin(req.cookies['user'])) {
        let end = new Date(req.body.end)
        let start = new Date(req.body.start)
        if (req.body.title !== "" && start <= end) {
            const client = new SMTPClient({
                user: 'anders.truong@broccoli.se',
                password: 'gFga2mDGz&',
                host: 'smtp01.levonline.com',
                tsl: true,
                port: 587
            });
            const ics = require('ics')
            ics.createEvent( {
                start: [start.getFullYear(), (start.getMonth()+1)%12, start.getUTCDay(),0,0],
                end: [end.getFullYear(), (start.getMonth()+1)%12, end.getUTCDay(),0,0],
                title: req.body.title,
                description: req.body.description,
                organizer: {name: "Broccoli", email: "anders.truong@broccoli.se"}
            } ,(err, value) => {
                if (!err) {
                    client.send(
                        {
                            text: `${req.body.title}\n${start.toLocaleString("default", {day: "numeric", month: "long",})} - ${end.toLocaleString("default", {day: "numeric", month: "long",})}\n${req.body.description}`,
                            from: 'anders.truong@broccoli.se',
                            to: 'andtru0913@gmail.com',
                            subject: req.body.title,
                            attachment: [{
                                data: value,
                                name: "event.ics"
                            }]
                        },
                        async (err, _) => {
                            if (!err) {
                                await createEvent(req.body.title, req.body.description, start, end).catch(e => {
                                    console.error(e.message)
                                })
                            }
                        })
                } else {
                    console.log(err)
                }
            })
        }
        }


    res.redirect(302, '../../intranet/fullcalender');
}