import { SMTPClient } from 'emailjs';
import formidable from "formidable";


export default async function handler(req, res) {
    const form = new formidable.IncomingForm({
        maxFileSize: Infinity,
        multiples: true
    });

    form.parse(req, async (err, fields, files) => {
        try {
            let attachments = [];
            if (files.file) {
                if (Array.isArray(files.file)) {
                    attachments = Object.values(files.file).map(f => ({
                        path: f.filepath,
                        name: f.originalFilename
                    }));
                } else {
                    attachments = [{
                        path: files.file.filepath,
                        name: files.file.originalFilename
                    }];
                }
            }

            const client = new SMTPClient({
                user: 'intresse@broccoli.se',
                password: process.env.EMAIL_PASSWORD,
                host: 'smtp01.levonline.com',
                tsl: true,
                port: 587
            });
            let text = ""
            text += fields.freetext + "\n\nHälsningar: "
            text += fields.first + " " + fields.last + "\nEmail: "
            text += fields.email + "\nTelefon: "
            text += fields.phone + "\n"
            client.send(
                {
                    text: text,
                    from: 'intresse@broccoli.se',
                    to: 'intresse@broccoli.se',
                    subject: `Intresseanmälan hos '${fields.pagetitle}'`,
                    attachment: attachments
                },
                (err, _) => {
                    if (!!err) {throw Error}
                })
            client.send(
                {
                    text: "Tack för din intresseanmälan till Broccoli, vi svarar inom kort! \n\n" + text,
                    from: 'intresse@broccoli.se',
                    to: fields.email,
                    subject: `Intresseanmälan till Broccoli`,
                },
                (err, _) => {
                    if (!!err) {throw Error}
                })
            res.redirect(302, `${fields.redirect}`);
            } catch (e) {
                res.status(500).send("Something went wrong, mail not sent");
            }
        }
    )
}

export const config = {
    api: {
        bodyParser: false
    },
};