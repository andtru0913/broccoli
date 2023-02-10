// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {editProfile} from "../../Database";
import {verify} from "../../tokens";

export default async function handler(req, res) {
    if(req.method !== 'POST') {
        res.redirect(302, '../intranet')
    }
    try {
        let cookies = JSON.parse(req.cookies["token"] || null)
        if(!!cookies) {
            if (await verify(cookies) === req.body.id) {
                await editProfile(req.body.id, req.body.username, req.body.password, req.body.email, req.body.address, req.body.privatenumber, req.body.worknumber, req.body.myImage, req.body.description,  new Date(req.body.birthdate))
                    .catch(e => {
                        console.error(e.message)
                    })
            } else {
                res.status(403).send("Unauthorized")
            }
        } else {
            res.status(403).send("Token not found")
        }
    } catch (e) {
        res.status(500).json({ error: e })
    }


    res.redirect(302, '../intranet/profile');
}

