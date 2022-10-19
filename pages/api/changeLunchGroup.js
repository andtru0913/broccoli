import * as Database from "../../Database";
export default async function handler(req, res) {
    if (await Database.isAdmin(req.cookies['userid'])) {
        Database.setLunchgroup(req.body.userid, req.body.lunchid)
            .catch(e => {
                console.error(e.message)
            })
    }
    res.redirect(302, '../intranet/admin/lunchgroups');
}