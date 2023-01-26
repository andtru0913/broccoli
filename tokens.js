import jwt from "jsonwebtoken";

export async function getToken(id) {
    const payload = {
        user_id: id
    }
    return new Promise((resolve, reject) => {
        jwt.sign(payload, process.env.JWT_KEY, { expiresIn: '1h' }, (err, token) => {
            if(err) {
                reject(err);
            } else {
                resolve(token);
            }
        });
    });
}

export async function verify(token) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_KEY, {algorithm: 'HS256'}, (err, decoded) => {
            if(err) {
                reject(err);
            } else {
                resolve(decoded.user_id);
            }
        });
    });
}