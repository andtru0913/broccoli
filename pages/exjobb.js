import Page from "../components/page";
import {authenticate} from "./intranet/admin/authenticate";
import {getPage} from "../Database";

export async function getServerSideProps(context) {
    const pageId = "635a8ee6e3adbba25c8b22ec"
    let authentication = await authenticate(context)
    const page = (await getPage(pageId))[0];
    return {
        props: {authentication: authentication === undefined ? null : authentication, pageId: pageId, page: page}
    }
}

export default function Exjobb({authentication, page}) {
   return (
        <Page authentication={authentication} page={page} redirect="../exjobb"></Page>
    );
}