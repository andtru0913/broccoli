import {checkAdmin} from "../../../tokens";
import {updateEvent} from "../../../Database";

export default async function handler(req, res) {
    if(req.method !== 'POST') {
        res.redirect(302, '../intranet')
    }
    try {
        if (await checkAdmin(req.cookies['token']) && req.body.title !== "") {
            await updateEvent(req.body.id, req.body.title, req.body.description, new Date(req.body.start), new Date(req.body.end))
                .catch(e => {
                    throw e
                })
            res.status(200).send("Done!");
        } else {
            res.status(401).send("Unauthorized");
        }

    } catch {
        res.status(500).send("Error")
    }

}