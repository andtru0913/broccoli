import checkAdmin from "./checkAdmin";
import {createCard} from "../../../Database";

export default async function handler(req, res) {
    if(req.method !== 'POST') {
        res.redirect(302, '../intranet')
    }
    if (await checkAdmin(req.cookies['user'])) {
        if (req.body.title !== "") {
            await createCard(req.body.pageId, req.body.title, req.body.description)
                .catch(e => {
                    console.error(e.message)
                })
        }
    }
    res.redirect(302, `../../${req.body.redirect}`);
}