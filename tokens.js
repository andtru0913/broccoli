import jwt from "jsonwebtoken";
import {isAdmin, isUser} from "./Database";

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

export async function checkAdmin(token) {
    const user_id = await verify(token)
    return !!user_id ? await isAdmin(user_id) : false
}

export async function checkUser(token) {
    const user_id = await verify(token)
    return !!user_id ? await isUser(user_id) : false
}