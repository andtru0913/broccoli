import {getUserinfo} from "../../../../Database";
import {verify} from "../../../../tokens";

export default async function handler(req, res) {
    if(req.method !== 'GET') {
        res.status(403).json({ error: `Not a GET request, received a ${req.method} request` })
    }
    try {
        const token = JSON.parse(req.cookies["token"])
        const userid = await verify(token)
        const result = JSON.stringify(await getUserinfo(userid))
        res.status(200).send(await verify(token))
    } catch (e) {
        res.status(500).json({ error: e.message })
    }

}


