import formidable from "formidable";
import fs from "fs";
import checkAdmin from "./checkAdmin";

export const config = {
    api: {
        bodyParser: false
    }
}

const post = async (req, res) => {
    const form = new formidable.IncomingForm();
    form.parse(req, async function (err, fields, files) {
        await saveFile(files.file, fields.newFilename);
        return res.status(201).send("");
    });
};

const saveFile = async (file, filename) => {
    try {
        const data = fs.readFileSync(file.filepath);
        fs.writeFileSync(`./public/uploads/${filename}`, data);
        await fs.unlinkSync(file.filepath);
    } catch (_) {

    }
};

export default async function handler(req, res) {
    if (await checkAdmin(req.cookies['user'])) {
        if (req.method === "POST") {
            try {
                post(req, res).then(_ => {
                })

            } catch (e) {
            }
        }
    }
};
