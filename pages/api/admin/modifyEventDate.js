import {checkAdmin} from "../../../tokens";
import {getEvents, updateEventDate} from "../../../Database";

export default async function handler(req, res) {
    if(req.method !== 'POST') {
        res.redirect(302, '../intranet')
    }
    if (await checkAdmin(req.cookies['token']) && req.body.id !== "") {
        let event = (await getEvents(req.body.id))[0];
        let start = new Date(event.start)
        let end = new Date(event.end)
        start.setDate(start.getDate() + req.body.delta)
        end.setDate(end.getDate() + req.body.delta)
        await updateEventDate(req.body.id, start, end).then()
    }
    res.redirect(302, '../../intranet/fullcalender');
}