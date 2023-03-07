import {login} from '../../Database'
import {serialize} from 'cookie'
import {getToken} from "../../tokens";

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        if (!!req.body.redirect) {
            res.redirect(302, '../intranet')
        } else {
            res.status(403).json({ error: 'Not a POST request' })
        }
    } else {
        const query = await login(req.body.username, req.body.password)
        if (!!query) {
            const token = await getToken(query);
            res.setHeader('Set-Cookie', serialize('token', JSON.stringify(token), { path: '/' }));
            if (!!req.body.redirect) {
                res.redirect(302, '../intranet/')
            } else {
                res.status(200).send(token)
            }
        } else {
            res.status(401).json({ error: 'Wrong username or password' })
        }
    }
}