import {getEvents} from "../../../../Database";
import {checkUser} from "../../../../tokens";

export default async function handler(req, res) {
    try {
        if (await checkUser(req.cookies['token'])) {
                res.status(200).send((await getEvents(undefined)))
        } else {
            res.status(401).json({ error: 'Unauthorized' })
        }
    } catch (e) {
        res.status(500).json({ error: e })
    }

}


