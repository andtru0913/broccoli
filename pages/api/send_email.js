import { SMTPClient } from 'emailjs';

export default async function handler(req, res) {

    const client = new SMTPClient({
        user: 'anders.truong@broccoli.se',
        password: 'gFga2mDGz&',
        host: 'smtp01.levonline.com',
        tsl: true,
        port: 587
    });
    client.send(
        {
            text: 'i hope this works',
            from: 'anders.truong@broccoli.se',
            to: 'anders.truong@broccoli.se',
            subject: 'testing emailjs',
        },
        (err, message) => {
            console.log(err || message);
        }
    )
}