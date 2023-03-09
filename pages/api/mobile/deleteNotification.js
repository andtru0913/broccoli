import {checkAdmin} from "../../../tokens";
import {deleteNotification} from "../../../Database";

export default async function handler(req, res) {
    if(req.method !== 'POST') {
        res.redirect(302, '../intranet')
    }
    try {
        if (await checkAdmin(req.cookies['token'])) {
            await deleteNotification(req.body.id)
                .catch(e => {
                    throw e
                })
            res.redirect(200, "Done!");
        }  else {
            res.status(401, "Unauthorized")
        }
    } catch {
        res.status(500, "Internal server error")
    }

}