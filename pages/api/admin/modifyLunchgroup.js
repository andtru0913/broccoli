import {checkAdmin} from "../../../tokens";
import {modifyLunchgroup} from "../../../Database";

export default async function handler(req, res) {
    if(req.method !== 'POST') {
        res.redirect(302, '../intranet')
    }
    if (await checkAdmin(req.cookies['token']) && req.body.title !== "") {
        await modifyLunchgroup(req.body.id, req.body.title)
            .catch(e => {
                console.error(e.message)
            })
    }
    res.redirect(302, `../../intranet/admin/lunchgroups`);
}