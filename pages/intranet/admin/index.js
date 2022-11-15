import Head from "next/head";
import styles from "../../../styles/Home.module.css";
import * as Database from "../../../Database";
import { authenticate } from "./authenticate";
import LayoutIntranet from "../../../components/layout/layoutIntranet";

export async function getServerSideProps(context) {
  let authentication = await authenticate(context);
  if (authentication !== undefined) return authentication;
  let cookies = JSON.parse(context.req.cookies["user"] || null);
  let user = await Database.getUserinfo(cookies.id);
  return {
    props: { user: user },
  };
}

export default function Home({ user }) {
  return (
    <LayoutIntranet>
      <main className="">
        <div className="layout py-20 md:py-12  flex flex-col items-center">
          <h1>Välkommen {user.firstname} till admin</h1>

          <section>
            <div className="theme-test flex flex-1 flex-col lg:flex-row justify-center py-12"></div>
          </section>
        </div>
      </main>
    </LayoutIntranet>
  );
}
