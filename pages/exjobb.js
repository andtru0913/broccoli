import Page from "../components/page";
import { getPage } from "../Database";
import { exjobb } from "../defaultIDs";
import Layout from "../components/layout/layout";

export async function getServerSideProps(context) {
  const pageId = exjobb;
  const pageName = "exjobb";
  let cookies = JSON.parse(context.req.cookies["user"] || null);
  const page = (await getPage(pageId))[0];
  return {
    props: {
      admin: !!cookies ? cookies.admin : false,
      page: page,
      pageName: pageName,
    },
  };
}

export default function Exjobb({ admin, page, pageName }) {
  return (
    <Layout>
      <Page
        authentication={admin}
        page={page}
        image={pageName}
        redirect={pageName}
        formTitle="EXJOBBSANSÖKAN"
      ></Page>
    </Layout>
  );
}
