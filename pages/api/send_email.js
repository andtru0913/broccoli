import { SMTPClient } from 'emailjs';


export default async function handler(req, res) {
    /*
    const client = new SMTPClient({
        user: 'anders.truong@broccoli.se',
        password: 'gFga2mDGz&',
        host: 'smtp01.levonline.com',
        tsl: true,
        port: 587
    });
    let text = ""
    text += req.body.freetext + "\n\n"
    text += req.body.first + " " + req.body.last + "\n"
    text += req.body.email + "\n"
    text += req.body.phone + "\n"
    let data = req.body.base64.match(/base64,(.+)$/);
    let base64String = data[inledning];
    client.send(
        {
            text: text,
            from: 'anders.truong@broccoli.se',
            to: 'anders.truong@broccoli.se',
            subject: 'Mail från spontanansökan',
            attachment: [{
                data: base64String,
                encoded: true,
                name: req.body.file
            }]
        },
        (err, message) => {
            //console.log(err || message);
        }
    )
*/

    res.redirect(302, '../carreer');
}