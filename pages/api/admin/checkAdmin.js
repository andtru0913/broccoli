import {isAdmin} from "../../../Database";

export default async function checkAdmin(cookies) {
    let user = JSON.parse(cookies || null)
    return !!user ? await isAdmin(user.id) : false
}