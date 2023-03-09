import { SMTPClient } from "emailjs";
import {checkAdmin} from "../../../tokens";
import {createEvent, getAllUsers} from "../../../Database";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.redirect(404, "../intranet");
  }
  try {
    if (await checkAdmin(JSON.parse(req.cookies['token'] || null))) {
      const allUsers = (await getAllUsers()).map(u => u.email)
      let end = new Date(req.body.end);
      let start = new Date(req.body.start);
      if (req.body.title !== "" && start <= end) {
        await createEvent(
            req.body.title,
            req.body.description,
            start,
            end
        );
        const client = new SMTPClient({
          user: "notiser@broccoli.se",
          password: process.env.EMAIL_PASSWORD,
          host: "smtp01.levonline.com",
          tsl: true,
          port: 587,
        });
        const ics = require("ics");
        ics.createEvent(
            {
              start: [
                start.getFullYear(),
                (start.getMonth() + 1) % 12,
                start.getUTCDay(),
                0,
                0,
              ],
              end: [
                end.getFullYear(),
                (start.getMonth() + 1) % 12,
                end.getUTCDay(),
                0,
                0,
              ],
              title: req.body.title,
              description: req.body.description,
              organizer: { name: "Broccoli", email: "notiser@broccoli.se" },
            },
            async (err, value) => {
              if (!err) {
                try {
                  await client.send(
                      {
                        text: `${req.body.title}\n${start.toLocaleString("default", {
                          day: "numeric",
                          month: "long",
                        })} - ${end.toLocaleString("default", {
                          day: "numeric",
                          month: "long",
                        })}\n${req.body.description}`,
                        from: "notiser@broccoli.se",
                        to: allUsers,
                        subject: req.body.title,
                        attachment: [
                          {
                            data: value,
                            name: "event.ics",
                          },
                        ],
                      },
                  );
                } catch (e) {
                  throw e;
                }
              } else {
                throw err;
              }
            }
        );
          res.redirect(302, req.body.redirect);
      }
    } else {
      res.status(401).json({ error: "Unauthorized" });
    }


  } catch (e) {
    res.status(500).json({ error: e });
  }
}