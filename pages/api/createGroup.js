import * as Database from "../../Database";

export default async function handler(req, res) {
    if (await Database.isAdmin(req.cookies['userid'])) {
        if (req.body.name !== "") {
            await Database.createGroup(req.body.name)
                .catch(e => {
                    console.error(e.message)
                })
        }
    }
    res.redirect(302, '../intranet/admin/lunchgroups');
}