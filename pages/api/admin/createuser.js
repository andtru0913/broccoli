// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import {createNewUser} from "../../../Database";
import checkAdmin from "./checkAdmin";

export default async function handler(req, res) {
    if(req.method !== 'POST') {
        res.redirect(302, '../intranet')
    }
    if (await checkAdmin(req.cookies['token'])) {
        await createNewUser(req.body.username, req.body.password, req.body.firstname, req.body.lastname, req.body.gender, req.body.email, req.body.address, req.body.privatenumber, req.body.worknumber, req.body.company, req.body.admin, req.body.role)
            .catch(e => {
                console.error(e.message)
            })
    }
    res.redirect(302, '../../intranet/admin/employees');
}

