import * as Database from "../../../Database";
import checkAdmin from "./checkAdmin";

export default async function handler(req, res) {
    if(req.method !== 'POST') {
        res.redirect(302, '../intranet')
    }
    if (req.body.id !== "" || await checkAdmin(req.cookies['user'])) {
        let event = (await Database.getEvents(req.body.id))[0];
        let end = new Date(event.end)
        end.setDate(end.getDate() + req.body.delta)
        await Database.updateEventDate(req.body.id, event.start, end.toISOString().split('T')[0]).then()
    }
    res.redirect(302, '../intranet/fullcalender');
}