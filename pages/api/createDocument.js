import checkAdmin from "./checkAdmin";
import {createDocument} from "../../Database";

export default async function handler(req, res) {
    if(req.method !== 'POST') {
        res.redirect(302, '../intranet')
    }
    if (await checkAdmin(req.cookies['user'])) {
        if (req.body.title !== "" || req.body.base64 !== "") {
            await createDocument(req.body.title, req.body.file, req.body.base64, new Date().toISOString().split('T')[0])
                .catch(e => {
                    console.error(e.message)
                })
        }
    }
    res.redirect(302, '../../intranet/dokument');
}

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '16mb'
        }
    }
}