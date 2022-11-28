import {leaveEvent} from "../../Database";

export default async function handler(req, res) {
    if(req.method !== 'POST') {
        res.redirect(302, '../intranet')
    }
    let user = JSON.parse(req.cookies['user'] || null)
    if (req.body.eventid !== "" && user !== null) {
        await leaveEvent(user.id, req.body.eventid)
    }
    res.redirect(302, '../intranet/calendar');
}