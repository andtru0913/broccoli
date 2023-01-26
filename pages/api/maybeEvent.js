import {maybeEvent} from "../../Database";
import checkUser from "./admin/checkAdmin";

export default async function handler(req, res) {
    if(req.method !== 'POST') {
        res.redirect(302, '../intranet')
    }
    let user = JSON.parse(checkUser(req.cookies['token']) || null)
    if (req.body.eventid !== "" && user !== null) {
        await maybeEvent(user.id, req.body.eventid)
    }
    res.redirect(302, '../intranet/calendar');
}