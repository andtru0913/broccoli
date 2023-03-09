import {checkAdmin} from "../../../tokens";
import {createNotification} from "../../../Database";

export default async function handler(req, res) {
    if(req.method !== 'POST') {
        res.redirect(302, '../intranet')
    }
    try {
        if (await checkAdmin(req.cookies['token'])) {
            const start = new Date()
            const end = new Date(req.body.date)
            if (req.body.title !== "" && req.body.text !== "" && req.body.date !== "" && start < end) {
                await createNotification(req.body.id, req.body.title, req.body.text, start, end, req.body.users)
                    .catch(e => {
                        throw e
                    })
                res.status(200).send("Done!")
            } else {
                res.status(400).send("Bad request")
            }
        } else {
            res.status(401).send("Unauthorized")
        }
    } catch {
        res.status(500).send("Internal server error")
    }
    if(!!req.body.redirect) {
        res.redirect(302, req.body.redirect);
    } else {
        res.redirect(200, "Done!");
    }
}