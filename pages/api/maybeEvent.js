import {maybeEvent} from "../../Database";
import {checkUser, verify} from "../../tokens";
export default async function handler(req, res) {
    if (req.method !== "POST") {
        res.redirect(302, "../intranet");
    }
    const [user, user_id] = await Promise.all([JSON.parse(await checkUser(JSON.parse(req.cookies['token'] || null))), verify(JSON.parse(req.cookies['token']))])

    try {
        if (!!req.body.eventid) {
            if(!!user) {
                await maybeEvent(user_id, req.body.eventid);
            } else {
                res.status(400).send("Unauthorized")
            }
        } else {
            res.status(400).send("Bad request")
        }
    } catch {
        res.status(500).send("Internal server error");
    }
    if(!!req.body.redirect) {
        res.redirect(302, req.body.redirect);
    } else {
        res.status(200).send("Done!")
    }
}