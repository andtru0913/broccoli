import checkAdmin from "./checkAdmin";
import {createDocument} from "../../../Database";

export default async function handler(req, res) {
    if(req.method !== 'POST') {
        res.redirect(302, '../intranet')
    }
    if (await checkAdmin(req.cookies['user'])) {
        if (req.body.title !== "" || req.body.filename !== "") {
            await createDocument(req.body.title, req.body.filename, new Date().toISOString().split('T')[0])
                .catch(e => {
                    console.error(e.message)
                })
        }
    }
    res.redirect(302, '../../intranet/dokument');
}