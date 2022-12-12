import {getEventNotReplied} from "../../../Database";

export default async function handler(req, res) {
    if(req.method !== 'POST') {
        res.redirect(302, '../intranet')
    }
    res.json(await getEventNotReplied(req.body.id));
}