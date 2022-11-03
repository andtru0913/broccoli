import {isAdmin} from "../../../Database";

export async function authenticate(context) {
    let user = JSON.parse(context.req.cookies['user'] || null)
    if (user == null || !(await isAdmin(user.id))) {
        return {
            redirect: {
                permanent: false,
                destination: "/intranet",
            },
            props: {},
        };
    } else {
        return undefined
    }
}