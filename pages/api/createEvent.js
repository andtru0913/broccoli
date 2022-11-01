import * as Database from "../../Database";
import {SMTPClient} from "emailjs";

export default async function handler(req, res) {
    if (await Database.isAdmin(req.cookies['userid'])) {
        let start = Date.parse(req.body.start)
        let end = new Date(req.body.end)
        end.setDate(end.getDate() + 1)
        if (req.body.title !== "" && start <= end) {
            await Database.createEvent(req.body.title, req.body.description, req.body.start, end.toISOString().split('T')[0])
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
    res.redirect(302, '../../intranet/calendar');
}