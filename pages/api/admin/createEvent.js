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
            await createEvent(req.body.title, req.body.description, start, end)
                .catch(e => {
                    console.error(e.message)
                })
        }
        /*
        const client = new SMTPClient({
            user: 'anders.truong@broccoli.se',
            password: 'gFga2mDGz&',
            host: 'smtp01.levonline.com',
            tsl: true,
            port: 587
        });

        client.send(
            {
                text: "<p style=\"font-family: times, serif;\">"+req.body.description+"</p>",
                from: 'anders.truong@broccoli.se',
                to: 'andtru0913@gmail.com',
                subject: req.body.title
            },
            (err, message) => {
                //console.log(err || message);
            }
        )
        */

    }
    res.redirect(302, '../../intranet/fullcalender');
}