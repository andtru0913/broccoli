import formidable from 'formidable';
import fs from 'fs';
import {editProfile} from "../../Database";

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
                    if (err) {
                        res.status(500).json({error: err});
                    }
                    try {
                        console.log(files.file)
                        if(!!files.file.originalFilename) {
                            const data = fs.readFileSync(files.file.filepath)
                            const newFilename = `${fields.id}.${files.file.originalFilename.split(".").pop()}`
                            fs.writeFileSync(`./public/uploads/profiles/${newFilename}`, data)
                            await editProfile(fields.id, fields.username, fields.password, fields.email, fields.address, fields.privatenumber, fields.worknumber, newFilename, fields.description, !!fields.birthdate?new Date(fields.birthdate):null)
                        } else {
                            await editProfile(fields.id, fields.username, fields.password, fields.email, fields.address, fields.privatenumber, fields.worknumber, null, fields.description, !!fields.birthdate?new Date(fields.birthdate):null)
                        }
                        res.redirect(302, '../intranet/profile');
                    } catch(e) {
                        res.status(500).json({ error: e });
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






