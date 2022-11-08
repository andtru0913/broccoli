import checkAdmin from "./checkAdmin";
import {updateEventDesc} from "../../Database";

export default async function handler(req, res) {
    if(req.method !== 'POST') {
        res.redirect(302, '../intranet')
    }
    if (await checkAdmin(req.cookies['user']) && req.body.title !== "") {
        await updateEventDesc(req.body.id, req.body.title, req.body.description)
            .catch(e => {
                console.error(e.message)
            })
    }
    res.redirect(302, '../intranet/fullcalender');
}