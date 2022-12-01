import Page from "../components/page";
import { authenticate } from "./intranet/admin/authenticate";
import { getPage } from "../Database";
import { underconsultants } from "../defaultIDs";
import Layout from "../components/layout/layout";

export async function getServerSideProps(context) {
  const pageId = underconsultants;
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

export default function Underconsultants({ authentication, page }) {
  return (
    <Layout>
      <Page
        authentication={authentication}
        page={page}
        redirect="../underconsultants"
        formTitle="ANSÖKAN"
      ></Page>
    </Layout>
  );
}
