import * as Database from "../../Database";
import checkAdmin from "./checkAdmin";

export default async function handler(req, res) {
    if (await checkAdmin(req.cookies['user'])) {
        if (req.body.name !== "") {
            await Database.createGroup(req.body.name)
                .catch(e => {
                    console.error(e.message)
                })
        }
    }
    res.redirect(302, '../intranet/admin/lunchgroups');
}