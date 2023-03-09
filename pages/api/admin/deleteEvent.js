import {checkAdmin} from "../../../tokens";
import {deleteEvent} from "../../../Database";

export default async function handler(req, res) {
    if(req.method !== 'POST') {
        res.redirect(302, '../intranet')
    }
    try {
        if (await checkAdmin(JSON.parse(req.cookies['token'] || null))) {
            await deleteEvent(req.body.id)
                .catch(e => {
                    throw e
                })
            res.redirect(302, req.body.redirect);
        } else {
            res.status(401).send("Unauthorized")
        }

    } catch {
        res.status(500).send("Error")
    }



}