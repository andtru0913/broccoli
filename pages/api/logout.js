import {serialize} from "swr/dist/utils/serialize";

export default async function handler(req, res) {
    res.setHeader('Set-Cookie', serialize('userid', '', {
        path: '/',
        maxAge: -1
    }));
    res.redirect(302, '../intranet/')
}
