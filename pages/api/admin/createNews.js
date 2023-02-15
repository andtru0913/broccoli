import {checkAdmin} from "../../../tokens";
import {createNews} from "../../../Database";
import formidable from "formidable";
import fs from "fs";

export default async function handler(req, res) {
    if(req.method !== 'POST') {
        res.redirect(302, '../intranet');
    } else {
        try {
            if(await checkAdmin(req.cookies["token"])) {
                const form = new formidable.IncomingForm({
                    maxFileSize: Infinity
                });
                form.parse(req, async (err, fields, files) => {
                    try {
                        if(!!files.file.originalFilename) {
                            const data = fs.readFileSync(files.file.filepath)
                            fs.writeFileSync(`./public/uploads/news/${files.file.originalFilename}`, data)
                            await createNews(fields.title, files.file.originalFilename, new Date(), fields.id)
                            res.redirect(302, '../../intranet/news');
                        } else {
                            res.status(500).json({ error: "No file found" });
                        }
                    } catch (e) {
                        res.status(500).json({ error: e.message });
                    }

                });
            } else {
                res.status(403).send("Token not found")
            }
        } catch (e) {
            res.status(500).json({ error: e });
        }
    }
}

export const config = {
    api: {
        bodyParser: false
    },
};


