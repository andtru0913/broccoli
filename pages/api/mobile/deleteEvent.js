import {checkAdmin} from "../../../tokens";
import {deleteEvent} from "../../../Database";

export default async function handler(req, res) {
    if(req.method !== 'POST') {
        res.redirect(302, '../intranet')
    }
    try {
        if (await checkAdmin(Jreq.cookies['token'])) {
            await deleteEvent(req.body.id)
                .catch(e => {
                    throw e
                })
            res.redirect(200, "Done!");
        } else {
            res.status(401).send("Unauthorized")
        }

    } catch {
        res.status(500).send("Error")
    }



}