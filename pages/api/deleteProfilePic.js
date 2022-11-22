import {deleteProfilePic} from "../../Database";

export default async function handler(req, res) {
    if(req.method !== 'POST') {
        res.redirect(302, '../intranet')
    }
    let cookies = JSON.parse(req.cookies["user"] || null)
    if(!!cookies) {
        if (cookies.id === req.body.id) {

            await deleteProfilePic(req.body.id)
                .catch(e => {
                    console.error(e.message)
                })
        }
    }

    res.redirect(302, '../intranet/editProfile');
}
