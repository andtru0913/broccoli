import * as Database from "../../../Database";
import checkAdmin from "./checkAdmin";

export default async function handler(req, res) {
    if(req.method !== 'POST') {
        res.redirect(302, '../intranet')
    }
    if (await checkAdmin(req.cookies['user']) && req.body.title !== "") {
        await Database.modifyLunchgroup(req.body.id, req.body.title)
            .catch(e => {
                console.error(e.message)
            })
    }
    res.redirect(302, `../../intranet/admin/lunchgroups`);
}