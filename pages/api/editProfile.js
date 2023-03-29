import formidable from "formidable";
import fs from "fs";
import path from "path";
import { editProfile, isAdmin } from "../../Database";
import { verify } from "../../tokens";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.redirect(302, "../intranet");
  } else {
    try {
      let cookies = JSON.parse(req.cookies["token"] || null);
      if (!!cookies) {
        const result = await asyncParse(req);
        let user = await verify(cookies);
        if (!result.err && (user === result.id || (await isAdmin(user)))) {
          try {
            if (!!result.data) {
              await editProfile(
                result.fields.id,
                result.fields.username,
                result.fields.password,
                result.fields.email,
                result.fields.address,
                result.fields.privatenumber,
                result.fields.worknumber,
                result.data,
                result.fields.description,
                !!result.fields.birthdate
                  ? new Date(result.fields.birthdate)
                  : null
              );
            } else {
              await editProfile(
                result.fields.id,
                result.fields.username,
                result.fields.password,
                result.fields.email,
                result.fields.address,
                result.fields.privatenumber,
                result.fields.worknumber,
                null,
                result.fields.description,
                !!result.fields.birthdate
                  ? new Date(result.fields.birthdate)
                  : null
              );
            }
            res.redirect(302, result.fields.redirect);
          } catch (e) {
            res.status(500).json({ error: e.message });
          }
        } else {
          res.status(500).json({ error: err || "Unauthorized" });
        }
      } else {
        res.status(403).send("Token not found");
      }
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
}

const asyncParse = (req) =>
  new Promise((resolve, reject) => {
    const form = new formidable.IncomingForm({
      maxFileSize: Infinity,
    });
    form.parse(req, (err, fields, files) => {
      if (err) return reject(err);
      const data = fs.readFileSync(files.file.filepath, { encoding: "base64" });

      resolve({ fields, data });
    });
  });

export const config = {
  api: {
    bodyParser: false,
  },
};

/** 
import formidable from "formidable";
import fs from "fs";
import path from "path";
import { editProfile, isAdmin } from "../../Database";
import { verify } from "../../tokens";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.redirect(302, "../intranet");
  } else {
    try {
      let cookies = JSON.parse(req.cookies["token"] || null);
      if (!!cookies) {
        const form = new formidable.IncomingForm({
          maxFileSize: Infinity,
        });
        const {
          id,
          username,
          password,
          email,
          address,
          privatenumber,
          worknumber,
          image,
          description,
          birthdate,
        } = req.body;

        let user = await verify(cookies);
        if (!err && (user === id || (await isAdmin(user)))) {
          try {
            await editProfile(
              id,
              username,
              password,
              email,
              address,
              privatenumber,
              worknumber,
              image,
              description,
              !!birthdate ? new Date(birthdate) : null
            );

            res.redirect(302, fields.redirect);
          } catch (e) {
            res.status(500).json({ error: e.message });
          }
        } else {
          res.status(500).json({ error: err || "Unauthorized" });
        }
      } else {
        res.status(403).send("Token not found");
      }
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
}
const toBase64 = (file) => {
  var reader = new FileReader();
  reader.onload = function (file) {
    console.log(file);
    console.log("before something");
    const encoded = reader.result;
    console.log(encoded);
  };
  return encoded;
};

export const config = {
  api: {
    bodyParser: false,
  },
};

*/

/**import formidable from 'formidable';
import fs from 'fs';
import path from 'path';
import {editProfile, isAdmin} from "../../Database";
import {verify} from "../../tokens";


 const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };
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
const base64 = await convertbase64(files.file)
                                const newFilename = `${fields.id}.${files.file.originalFilename.split(".").pop()}`
                                const uploadsDir = path.join(process.cwd(), 'public', 'uploads', 'profiles');
                                const newFilePath = path.join(uploadsDir, newFilename);
                                fs.writeFileSync(newFilePath, data);
                                await editProfile(fields.id, fields.username, fields.password, fields.email, fields.address, fields.privatenumber, fields.worknumber, base64, fields.description, !!fields.birthdate?new Date(fields.birthdate):null)
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






 */
