import {checkAdmin} from "../../../tokens";
import {updateEvent} from "../../../Database";

export default async function handler(req, res) {
    if(req.method !== 'POST') {
        res.redirect(302, '../intranet')
    }
    try {
        if (await checkAdmin(JSON.parse(req.cookies['token'] || null)) && req.body.title !== "") {
            await updateEvent(req.body.id, req.body.title, req.body.description, new Date(req.body.start), new Date(req.body.end))
                .catch(e => {
                    throw e
                })
        } else {
            res.status(401).send("Unauthorized");
        }
        if (!!req.body.redirect) {
            res.redirect(302, req.body.redirect);
        } else {
            res.status(200).send("Done!");
        }

    } catch {
        res.status(500).send("Error")
    }

}