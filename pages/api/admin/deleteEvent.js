import {checkAdmin} from "./checkAdmin";
import {deleteEvent} from "../../../Database";

export default async function handler(req, res) {
    if(req.method !== 'POST') {
        res.redirect(302, '../intranet')
    }
    try {
        if (await checkAdmin(req.cookies['token'])) {
            await deleteEvent(req.body.id)
                .catch(e => {
                    throw e
                })
        } else {
            res.status(401).send("Unauthorized")
        }
        if(!!req.body.redirect) {
            res.redirect(302, req.body.redirect);
        } else {
            res.redirect(200, "Done!");
        }
    } catch {
        res.status(500).send("Error")
    }



}