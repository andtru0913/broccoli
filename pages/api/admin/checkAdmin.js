import {isAdmin, isUser} from "../../../Database";
import {verify} from "../../../tokens";

export async function checkAdmin(token) {
    const user_id = await verify(JSON.parse(token || null))
    return !!user_id ? await isAdmin(user_id) : false
}

export async function checkUser(token) {
    const user_id = await verify(JSON.parse(token || null))
    return !!user_id ? await isUser(user_id) : false
}