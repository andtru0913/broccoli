import checkAdmin from "./checkAdmin";
import {deleteEvent} from "../../../Database";

export default async function handler(req, res) {
    if(req.method !== 'POST') {
        res.redirect(302, '../intranet')
    }
    if (await checkAdmin(req.cookies['token'])) {
        await deleteEvent(req.body.id)
            .catch(e => {
                console.error(e.message)
            })
    }
    res.redirect(302, '../../intranet/fullcalender');
}