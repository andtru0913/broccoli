import Page from "../components/page";
import { getPage } from "../Database";
import { underconsultants } from "../defaultIDs";
import Layout from "../components/layout/layout";

export async function getServerSideProps(context) {
  const pageId = underconsultants;
  const pageName = "underconsultants";
  let cookies = JSON.parse(context.req.cookies["user"] || null);
  const page = (await getPage(pageId))[0];
  return {
    props: {
      admin: !!cookies ? cookies.admin : false,
      pageId: pageId,
      page: page,
      pageName: pageName,
    },
  };
}

export default function Underconsultants({ admin, page, pageName }) {
  return (
    <Layout>
      <Page
        authentication={admin}
        page={page}
        image={pageName}
        redirect={pageName}
        formTitle="ANSÖK OM ATT BLI UNDERKONSULT"
      ></Page>
    </Layout>
  );
}
