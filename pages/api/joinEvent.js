import checkAdmin from "./checkAdmin";
import {createCard} from "../../Database";

export default async function handler(req, res) {
    if(req.method !== 'POST') {
        res.redirect(302, '../intranet')
    }
    if (req.body.id !== "") {
        console.log(req.body.id);
    }
    res.redirect(302, req.body.redirect);
}