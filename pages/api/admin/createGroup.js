
import {checkAdmin} from "../../../tokens";
import {createGroup} from "../../../Database";

export default async function handler(req, res) {
    if(req.method !== 'POST') {
        res.redirect(302, '../intranet')
    }
    if (await checkAdmin(req.cookies['token'])) {
        if (req.body.name !== "") {
            await createGroup(req.body.name)
                .catch(e => {
                    console.error(e.message)
                })
        }
    }
    res.redirect(302, '../../intranet/admin/lunchgroups');
}