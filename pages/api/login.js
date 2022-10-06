import * as Database from '../../Database'
import {setCookie} from "cookies-next";

export default async function handler(req, res) {

    const query = await Database.login(req.body.username, req.body.password)
    if (query == null) {
        alert("Wrong username or password");
        res.redirect(302, '../intranet/');
    } else {
        setCookie('userid', query);
        res.redirect(302, '../intranet/admin/');
    }

}
