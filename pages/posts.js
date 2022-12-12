import { getPage } from "../Database";
import Page from "../components/page";
import { posts } from "../defaultIDs";
import Layout from "../components/layout/layout";

export async function getServerSideProps(context) {
  const pageId = posts;
  const pageName = "posts"
  let cookies = JSON.parse(context.req.cookies["user"] || null);
  const page = (await getPage(pageId))[0];
  return {
    props: {
      admin: !!cookies ? cookies.admin : false,
      page: page,
      pageName: pageName
    },
  };
}

export default function Posts({ admin, page, pageName }) {
  return (
    <Layout>
      <Page
        classname=""
        authentication={admin}
        page={page}
        image={pageName}
        redirect={pageName}
        formTitle="ANSÖKAN"
      ></Page>
    </Layout>
  );
}
