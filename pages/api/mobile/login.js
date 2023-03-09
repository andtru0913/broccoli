import {login} from "../../../Database";
import {getToken} from "../../../tokens";

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        res.status(403).json({ error: `Not a POST request, received a ${req.method} request` })
    } else {
        const query = await login(req.body.username, req.body.password)
        if (!!query) {
            const token = await getToken(query);
            res.status(200).send(token)
        } else {
            res.status(401).json({ error: 'Wrong username or password' })
        }
    }
}