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
            res.setHeader('Set-Cookie', serialize('token', JSON.stringify(await getToken(query)), { path: '/' }));
            if (!!req.body.redirect) {
                res.redirect(302, '../intranet/')
            } else {
                res.status(200).send(await getToken(query))
            }
        } else {
            res.status(401).json({ error: 'Wrong username or password' })
        }
    }
}