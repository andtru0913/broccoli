// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import {modifyUser} from "../../Database";
import checkAdmin from "./checkAdmin";

export default async function handler(req, res) {
    if(req.method !== 'POST') {
        res.redirect(302, '../intranet')
    }
    if (await checkAdmin(req.cookies['user'])) {
        await modifyUser(req.body.id, req.body.email, req.body.username, req.body.password, req.body.firstname, req.body.lastname, req.body.gender, req.body.address, req.body.privatenumber, req.body.worknumber, req.body.company, req.body.admin)
            .catch(e => {
                console.error(e.message)
            })
    }
    res.redirect(302, '../intranet/admin/employees');
}

