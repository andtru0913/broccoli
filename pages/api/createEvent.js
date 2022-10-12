import * as Database from "../../Database";

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
    }
    res.redirect(302, '../intranet/calendar');
}