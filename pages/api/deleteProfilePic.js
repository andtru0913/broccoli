import {deleteProfilePic} from "../../Database";
import {verify} from "../../tokens";

export default async function handler(req, res) {
    if(req.method !== 'POST') {
        res.redirect(302, '../intranet')
    }
    let cookies = JSON.parse(req.cookies["token"] || null)
    if(!!cookies) {
        if (await verify(cookies) === req.body.id) {

            await deleteProfilePic(req.body.id)
                .catch(e => {
                    console.error(e.message)
                })
        }
    }

    res.redirect(302, '../intranet/editProfile');
}
