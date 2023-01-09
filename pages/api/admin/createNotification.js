import checkAdmin from "./checkAdmin";
import {createNotification} from "../../../Database";

export default async function handler(req, res) {
    if(req.method !== 'POST') {
        res.redirect(302, '../intranet')
    }
    if (await checkAdmin(req.cookies['user'])) {
        const start = new Date()
        const end = new Date(req.body.date)
        if (req.body.title !== "" && req.body.text !== "" && req.body.date !== "" && start < end) {
                await createNotification(req.body.id, req.body.title, req.body.text, start, end, req.body.users)
                .catch(e => {
                    console.error(e.message)
                })
        }
    }
    res.redirect(302, '../../intranet/admin/notifications');
}