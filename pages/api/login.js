import {login} from '../../Database'
import {serialize} from 'cookie'
import {getToken} from "../../tokens";

export default async function handler(req, res) {
    if(req.method !== 'POST') {
        res.redirect(302, '../intranet')
    }
    const query = await login(req.body.username, req.body.password)
    if (!!query) {
        res.setHeader('Set-Cookie', serialize('token', JSON.stringify(await getToken(query)), { path: '/' }));
    }
    res.redirect(302, '../intranet/')
}
