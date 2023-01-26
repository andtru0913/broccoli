import {isAdmin} from "../../../Database";
import {verify} from "../../../tokens";

export default async function checkAdmin(token) {
    const user_id = await verify(JSON.parse(token || null))
    return !!user_id ? await isAdmin(user_id) : false
}