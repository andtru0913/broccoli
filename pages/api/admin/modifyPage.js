import {updatePage} from "../../../Database";
import {checkAdmin} from "../../../tokens";

export default async function handler(req, res) {
    if(req.method !== 'POST') {
        res.redirect(302, '../intranet')
    }
    if (await checkAdmin(JSON.parse(req.cookies['token'] || null)) && req.body.title !== "") {
        await updatePage(req.body.id, req.body.title, req.body.description)
            .catch(e => {
                console.error(e.message)
            })
    }
    res.redirect(302, `../../${req.body.redirect}`);
}