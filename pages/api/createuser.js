// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import * as Database from '../../Database'

export default function handler(req, res) {

  Database.createNewUser(req.body.username,req.body.password,req.body.firstname,req.body.lastname, req.body.address, req.body.privatenumber, req.body.worknumber, req.body.company, req.body.admin)
      .catch(e => {
        console.error(e.message)
      })
  res.redirect(302, '../intranet/admin/');
}
