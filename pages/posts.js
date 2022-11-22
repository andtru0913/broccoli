import { authenticate } from "./intranet/admin/authenticate";
import { getPage } from "../Database";
import Page from "../components/page";
import { posts } from "../defaultIDs";
import Layout from "../components/layout/layout";

export async function getServerSideProps(context) {
  const pageId = posts;
  let authentication = await authenticate(context);
  const page = (await getPage(pageId))[0];
  return {
    props: {
      authentication: authentication === undefined ? null : authentication,
      pageId: pageId,
      page: page,
    },
  };
}

export default function Posts({ authentication, page }) {
  return (
    <Layout>
      <Page classname=""
        authentication={authentication}
        page={page}
        redirect="../posts"
        formTitle="ANSÖKAN"
      ></Page>
    </Layout>
  );
}
