import checkAdmin from "./checkAdmin";
import {createNews} from "../../../Database";

export default async function handler(req, res) {
    if(req.method !== 'POST') {
        res.redirect(302, '../intranet')
    }
    if (await checkAdmin(req.cookies['user'])) {
        if (req.body.title !== "" && req.body.text !== "" && req.body.date !== "") {

            await createNews(req.body.id, req.body.title, req.body.text, new Date().toISOString().split('T')[0], new Date(req.body.date))
                .catch(e => {
                    console.error(e.message)
                })
        }
    }
    res.redirect(302, '../../intranet/dokument');
}