import {authenticate} from "./intranet/admin/authenticate";
import {getPage} from "../Database";
import Page from "../components/page";
import {career} from "../defaultIDs";

export async function getServerSideProps(context) {
    const pageId = career
    const redirect = "../career"
    let authentication = await authenticate(context)
    const page = (await getPage(pageId))[0];
    return {
        props: {authentication: authentication === undefined ? null : authentication, page: page, redirect: redirect}
    }
}

export default function Career({authentication, page, redirect}) {
    return (
        <Page authentication={authentication} page={page} redirect={redirect}></Page>
    );
}