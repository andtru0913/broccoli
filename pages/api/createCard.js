import * as Database from "../../Database";

export default async function handler(req, res) {
    if (await Database.isAdmin(req.cookies['userid'])) {
        if (req.body.name !== "") {
            await Database.createCard(req.body.pageId, req.body.title, req.body.description, req.body.base64)
                .catch(e => {
                    console.error(e.message)
                })
        }
    }
    res.redirect(302, req.body.redirect);
}