import { checkAdmin } from "../../../tokens";
import { createCard } from "../../../Database";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.redirect(302, "../intranet");
  }
  if (await checkAdmin(JSON.parse(req.cookies['token'] || null))) {
    if (req.body.title !== "") {
      await createCard(
        req.body.pageId,
        req.body.title,
        req.body.description,
        req.body.requirements,
        req.body.location,
        new Date(req.body.startdate),
        new Date(req.body.enddate),
        req.body.contact,
        req.body.exjobbare
      ).catch((e) => {
        console.error(e.message);
      });
    }
  }
  res.redirect(302, `../../${req.body.redirect}`);
}
