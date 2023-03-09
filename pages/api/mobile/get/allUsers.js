import {getAllUsersEmail} from "../../../../Database";
import {checkAdmin} from "../../../../tokens";

export default async function handler(req, res) {
    try {
        if (await checkAdmin(req.cookies['token'])) {
                res.status(200).send((await getAllUsersEmail()))
        } else {
            res.status(401).json({ error: 'Unauthorized' })
        }
    } catch (e) {
        res.status(500).json({ error: e })
    }

}


