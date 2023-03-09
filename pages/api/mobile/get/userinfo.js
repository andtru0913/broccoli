import {getUserinfo} from "../../../../Database";
import {verify} from "../../../../tokens";

export default async function handler(req, res) {
    if(req.method !== 'GET') {
        res.status(403).json({ error: `Not a GET request, received a ${req.method} request` })
    }
    try {
        const token = req.cookies["token"]
        res.status(200).send(token)
    } catch (e) {
        res.status(500).json({ error: e.message })
    }

}


