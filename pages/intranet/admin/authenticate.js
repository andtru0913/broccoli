import {isAdmin} from "../../../Database";

export async function authenticate(context) {
    let userid = await context.req.cookies['userid']
    if (await isAdmin(userid)) {
        return undefined
    }
    else {
        return {
            redirect: {
                permanent: false,
                destination: "/intranet",
            },
            props:{},
        };
    }
}