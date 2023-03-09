import {getUserinfo} from "../../../../Database";
import {verify} from "../../../../tokens";

export default async function handler(req, res) {
    if(req.method !== 'GET') {
        res.status(403).json({ error: `Not a GET request, received a ${req.method} request` })
    }
    try {
        const result = JSON.stringify(await getUserinfo(await verify(JSON.parse(req.cookies["token"]))))
        res.status(200).send(result)
    } catch (e) {
        res.status(500).json({ error: e.message })
    }
}


