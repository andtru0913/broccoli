import {authenticate} from "./intranet/admin/authenticate";
import {getPage} from "../Database";
import Page from "../components/page";


export async function getServerSideProps(context) {
    const pageId = "63565f0c84e06df6ad9d4c43"
    let authentication = await authenticate(context)
    const page = (await getPage(pageId))[0];
    return {
        props: {authentication: authentication === undefined ? null : authentication, page: page}
    }
}

export default function Career({authentication, page}) {
    return (
        <Page authentication={authentication} page={page}></Page>
    );
}