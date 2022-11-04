import checkAdmin from "./checkAdmin";
import {updateCard} from "../../Database";

export default async function handler(req, res) {
    if(req.method !== 'POST') {
        res.redirect(302, '../intranet')
    }
    if (await checkAdmin(req.cookies['user']) && req.body.title !== "") {
        await updateCard(req.body.id, req.body.title, req.body.description, req.body.base64)
            .catch(e => {
                console.error(e.message)
            })
    }
    res.redirect(302, req.body.redirect);
}