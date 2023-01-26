import { IncomingForm } from 'formidable';
import fs from 'fs';

export default async (req, res) => {
    const form = new IncomingForm();
    form.uploadDir = './public/uploads/dokument';
    form.keepExtensions = true;

    await form.parse(req, (err, fields, files) => {
        fs.writeFile(files.file.path, form.uploadDir + '/' + files.file.name, (err) => {
            if (err) {
                return res.json({ success: false, err });
            }
            return res.json({ success: true });
        });
    })
    res.redirect(302, '../intranet/dokument');
}