import Page from "../components/page";
import {authenticate} from "./intranet/admin/authenticate";
import {getPage} from "../Database";

export async function getServerSideProps(context) {
    const pageId = "63565f0d84e06df6ad9d4c44"
    let authentication = await authenticate(context)
    const page = (await getPage(pageId))[0];
    return {
        props: {authentication: authentication === undefined ? null : authentication, pageId: pageId, page: page}
    }
}

export default function Underconsultants({authentication, page}) {
   return (
        <Page authentication={authentication} page={page}></Page>
    );
}