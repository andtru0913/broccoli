import checkAdmin from "./checkAdmin";
import {createNews} from "../../../Database";

export default async function handler(req, res) {
    if(req.method !== 'POST') {
        res.redirect(302, '../intranet')
    }
    if (await checkAdmin(req.cookies['user'])) {
        if (req.body.title !== "" && req.body.filename !== "") {
            await createNews(req.body.title, req.body.filename, new Date(), req.body.id)
                .catch(e => {
                    console.error(e.message)
                })
        }
    }
    res.redirect(302, '../../intranet/dokument');
}