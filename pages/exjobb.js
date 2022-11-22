import Page from "../components/page";
import { authenticate } from "./intranet/admin/authenticate";
import { getPage } from "../Database";
import { exjobb } from "../defaultIDs";
import Layout from "../components/layout/layout";

export async function getServerSideProps(context) {
  const pageId = exjobb;
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

export default function Exjobb({ authentication, page }) {
  return (
    <Layout>
      <Page
        authentication={authentication}
        page={page}
        redirect="../exjobb"
        formTitle="EXJOBBSANSÖKAN"
      ></Page>
    </Layout>
  );
}
