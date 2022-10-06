import * as Database from '../../Database'
import { serialize } from 'cookie';

export default async function handler(req, res) {
    const query = await Database.login(req.body.username, req.body.password)
    if (query != null) {
        res.setHeader('Set-Cookie', serialize('userid', query, { path: '/' }));
    }
    res.redirect(302, '../intranet/')
}
