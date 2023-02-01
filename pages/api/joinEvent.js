import { joinEvent } from "../../Database";
import checkUser from "./admin/checkAdmin";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.redirect(302, "../intranet");
  }
  let user = JSON.parse(checkUser(req.cookies['token']) || null)
  try {
    if (!!req.body.eventid) {
      if(!!user) {
        await joinEvent(user.id, req.body.eventid);
      } else {
        res.status(400).send("Unauthorized")
      }
    } else {
      res.status(400).send("Bad request")
    }
  } catch {
    res.status(500).send("Internal server error");
  }
  if(!!req.body.redirect) {
    res.redirect(302, req.body.redirect);
  } else {
    res.status(200).send("Done!")
  }

}
