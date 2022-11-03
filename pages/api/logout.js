import {serialize} from "cookie"

export default async function handler(req, res) {
    res.setHeader('Set-Cookie', serialize('user', '{}', {
        path: '/',
        maxAge: -1
    }));
    res.redirect(302, '../intranet/')
}
