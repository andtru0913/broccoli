import * as Database from "../../Database";

export default async function handler(req, res) {
    if (await Database.isAdmin(req.cookies['userid'])) {
        await Database.deleteEvent(req.body.id)
            .catch(e => {
                console.error(e.message)
            })
    }
    res.redirect(302, '../intranet/calendar');
}