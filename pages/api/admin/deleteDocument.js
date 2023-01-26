import checkAdmin from "./checkAdmin";
import {deleteDocument} from "../../../Database";

export default async function handler(req, res) {
    if(req.method !== 'POST') {
        res.redirect(302, '../intranet')
    }
    if (await checkAdmin(req.cookies['token'])) {
        await deleteDocument(req.body.id)
            .catch(e => {
                console.error(e.message)
            })
    }
    res.redirect(302, '../../intranet/dokument');
}