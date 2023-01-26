import {checkAdmin} from "./checkAdmin";
import {modifyNotification} from "../../../Database";

export default async function handler(req, res) {
    if(req.method !== 'POST') {
        res.redirect(302, '../intranet')
    }
    if (await checkAdmin(req.cookies['token'])) {
        const start = new Date()
        const end = new Date(req.body.date)
        if (req.body.title !== "" && req.body.text !== "" && req.body.date !== "" && start < end) {
                await modifyNotification(req.body.notifId, req.body.title, req.body.text, end, req.body.users)
                .catch(e => {
                    console.error(e.message)
                })
        }
    }
    res.redirect(302, '../../intranet/admin/notifications');
}