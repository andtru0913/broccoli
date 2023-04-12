import { joinEvent } from "../../../Database";
import { checkUser, verify } from "../../../tokens";
export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(400).send("not a post");
  }
  const [user, user_id] = await Promise.all([
    JSON.parse(await checkUser(req.cookies["token"])),
    verify(req.cookies["token"]),
  ]);
  try {
    if (!!req.body.eventid) {
      if (!!user) {
        await joinEvent(user_id, req.body.eventid);
        res.status(200).send("Done");
      } else {
        res.status(400).send("Unauthorized");
      }
    } else {
      res.status(400).send("Bad request");
    }
  } catch {
    res.status(500).send("Internal server error");
  }
}
