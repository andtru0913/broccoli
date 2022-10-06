import * as Database from '../../Database'

export default async function handler(req, res) {

    const query = await Database.login(req.body.username, req.body.password)
    res.status(200).json({result: query});
}
