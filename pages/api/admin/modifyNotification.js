import {checkAdmin} from "../../../tokens";
import {modifyNotification} from "../../../Database";

export default async function handler(req, res) {
    if(req.method !== 'POST') {
        res.redirect(302, '../intranet')
    }
    try {
        if (await checkAdmin(JSON.parse(req.cookies['token'] || null))) {
            const start = new Date()
            const end = new Date(req.body.date)
            if (req.body.title !== "" && req.body.text !== "" && req.body.date !== "" && start < end) {
                await modifyNotification(req.body.notifId, req.body.title, req.body.text, end, req.body.users)
                    .catch(e => {
                        throw e
                    })
                if(!!req.body.redirect) {
                    res.redirect(302, req.body.redirect);
                } else {
                    res.redirect(200, "Done!");
                }
            } else {
                res.status(400).send("Bad request");
            }
        } else {
            res.status(401).send("Unauthorized");
        }
    } catch {
        res.status(500).send("Error");
    }

}