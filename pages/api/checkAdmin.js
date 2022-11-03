import {isAdmin} from "../../Database";

export default async function checkAdmin(cookies) {
    let user = JSON.parse(cookies || null)
    if (user != null)  {
        return await isAdmin(user.id)
    } else {
        return false
    }
}