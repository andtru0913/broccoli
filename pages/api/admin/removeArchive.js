import {removeArchive} from "../../../Database";
import {checkAdmin} from "../../../tokens";

export default async function handler(req, res) {
    if(req.method !== 'POST') {
        res.redirect(302, '../intranet')
    }
    if (await checkAdmin(req.cookies['token'])) {
        await removeArchive(req.body.id)
            .catch(e => {
                console.error(e.message)
            })
    }
    res.redirect(302, req.body.redirect);
}