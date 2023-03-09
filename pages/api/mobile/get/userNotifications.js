import {getNotifications} from "../../../../Database";
import {checkUser, verify} from "../../../../tokens";

export default async function handler(req, res) {
    if(req.method !== 'POST') {
        res.redirect(302, '../intranet')
    }
    try {
        if (await checkUser(req.cookies['token'])) {
            res.status(200).send(await getNotifications(verify(req.cookies['token'])))
        } else {
            res.status(401).json({ error: 'Unauthorized' })
        }
    } catch (e) {
        res.status(500).json({ error: e })
    }

}


