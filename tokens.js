import jwt from "jsonwebtoken";

export async function getToken(id) {
    const payload = {
        user_id: id
    }
    return new Promise((resolve, reject) => {
        jwt.sign(payload, process.env.JWT_KEY, { }, (err, token) => {
            if(err) {
                reject(err);
            } else {
                resolve(token);
            }
        });
    });
}

export async function verify(token) {
        return !!token? new Promise((resolve, _) => {
            jwt.verify(token, process.env.JWT_KEY, {algorithm: 'HS256'}, (err, decoded) => {
                if(err) {
                    resolve(null);
                } else {
                    resolve(decoded.user_id);
                }
            });
        }): null;
}