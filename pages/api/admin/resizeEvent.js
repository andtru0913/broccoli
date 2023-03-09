import {getEvents, updateEventDate} from "../../../Database";
import {checkAdmin} from "../../../tokens";

export default async function handler(req, res) {
    if(req.method !== 'POST') {
        res.redirect(302, '../intranet')
    }
    if (req.body.id !== "" || await checkAdmin(JSON.parse(req.cookies['token'] || null))) {
        let event = (await getEvents(req.body.id))[0];
        let end = new Date(event.end)
        end.setDate(end.getDate() + req.body.delta)
        await updateEventDate(req.body.id, event.start).then()
    }
    res.redirect(302, '../../intranet/fullcalender');
}