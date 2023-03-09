import {checkAdmin} from "../../../tokens";
import {deleteNews} from "../../../Database";

export default async function handler(req, res) {
    if(req.method !== 'POST') {
        res.redirect(302, '../intranet')
    }
    if (await checkAdmin(JSON.parse(req.cookies['token'] || null))) {
        await deleteNews(req.body.id)
            .catch(e => {
                console.error(e.message)
            })
    }
    res.redirect(302, req.body.redirect);
}