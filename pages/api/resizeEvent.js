import * as Database from "../../Database";

export default async function handler(req, res) {
    if (await Database.isAdmin(req.cookies['userid']) && req.body.id !== "") {
        let event = (await Database.getEvents(req.body.id))[0];
        let end = new Date(event.end)
        end.setDate(end.getDate() + req.body.delta)
        await Database.updateEventDate(req.body.id, event.start, end.toISOString().split('T')[0]).then()
    }
    res.redirect(302, '../intranet/calender');
}