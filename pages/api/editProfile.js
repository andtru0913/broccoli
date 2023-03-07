import formidable from 'formidable';
import fs from 'fs';
import path from 'path';
import {editProfile, isAdmin} from "../../Database";
import {verify} from "../../tokens";

export default async function handler(req, res) {
    if(req.method !== 'POST') {
        res.redirect(302, '../intranet');
    } else {
        try {
            let cookies = JSON.parse(req.cookies["token"] || null)
            if(!!cookies) {
                const form = new formidable.IncomingForm({
                    maxFileSize: Infinity
                });
                form.parse(req, async (err, fields, files) => {
                    let user = await verify(cookies)
                    if (!err && (user === fields.id || await isAdmin(user))) {
                        try {
                            if(!!files.file.originalFilename) {
                                const data = fs.readFileSync(files.file.filepath)

                                const newFilename = `${fields.id}.${files.file.originalFilename.split(".").pop()}`
                                const uploadsDir = path.join(process.cwd(), 'public', 'uploads', 'profiles');
                                const newFilePath = path.join(uploadsDir, newFilename);
                                fs.writeFileSync(newFilePath, data);
                                await editProfile(fields.id, fields.username, fields.password, fields.email, fields.address, fields.privatenumber, fields.worknumber, newFilename, fields.description, !!fields.birthdate?new Date(fields.birthdate):null)
                            } else {
                                await editProfile(fields.id, fields.username, fields.password, fields.email, fields.address, fields.privatenumber, fields.worknumber, null, fields.description, !!fields.birthdate?new Date(fields.birthdate):null)
                            }
                            res.redirect(302, fields.redirect);
                        } catch(e) {
                            res.status(500).json({ error: e.message });
                        }
                    } else {
                        res.status(500).json({error: err || "Unauthorized"});
                    }
                });
            } else {
                res.status(403).send("Token not found")
            }
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }
}

export const config = {
    api: {
        bodyParser: false
    },
};






