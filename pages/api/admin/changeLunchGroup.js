import checkAdmin from "./checkAdmin";
import {setLunchgroup} from "../../../Database";

export default async function handler(req, res) {
    if(req.method !== 'POST') {
        res.redirect(302, '../intranet')
    }
    if (await checkAdmin(req.cookies['token'])) {
        setLunchgroup(req.body.userid, req.body.lunchid)
            .catch(e => {
                console.error(e.message)
            })
    }
    res.redirect(302, '../../intranet/admin/lunchgroups');
}