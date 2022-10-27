import * as Database from '../../Database'
import {serialize} from 'cookie'

export default async function handler(req, res) {
    console.log(req.body.username)
    const query = await Database.login(req.body.username, req.body.password)
    console.log("query ")
    if (query != null) {
        res.setHeader('Set-Cookie', serialize('userid', query, { path: '/' }));
        console.log("in here!")
    }
   
    res.redirect(302, '../intranet/')
}
