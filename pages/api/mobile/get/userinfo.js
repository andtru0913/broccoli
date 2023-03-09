import {getAllUsersEmail, getUserinfo} from "../../../../Database";
import {checkAdmin} from "../../../../tokens";

export default async function handler(req, res) {
    if(req.method !== 'POST') {
        res.status(403).json({ error: `Not a POST request, received a ${req.method} request` })
    }
    try {
        res.status(200).send((await getUserinfo(await verify(req.cookies['token']))))
    } catch (e) {
        res.status(500).json({ error: e })
    }

}


