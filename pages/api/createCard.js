import checkAdmin from "./checkAdmin";
import {createCard} from "../../Database";

export default async function handler(req, res) {
    if (await checkAdmin(req.cookies['user'])) {
        if (req.body.name !== "") {
            await createCard(req.body.pageId, req.body.title, req.body.description, req.body.base64)
                .catch(e => {
                    console.error(e.message)
                })
        }
    }
    res.redirect(302, req.body.redirect);
}