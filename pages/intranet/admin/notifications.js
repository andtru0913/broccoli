import * as Database from "../../../Database";
import { authenticate } from "./authenticate";
import LayoutIntranet from "../../../components/layout/layoutIntranet";

export async function getServerSideProps(context) {
  let authentication = await authenticate(context);
  if (authentication !== undefined) return authentication;

  let user = await Database.getAllUsers();
  return {
    props: { user: user },
  };
}

export default function Home({ user }) {
  return (
    <LayoutIntranet admin={true}>
      Notifikationer
      <form>
        <input type={"date"}/>
        <input type={"textarea"}/>
      </form>
    </LayoutIntranet>
  );
}
