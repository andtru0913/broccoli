import LayoutIntranet from "../../components/layout/layoutIntranet";
import {getUserProfile} from "../../Database";
import ProfilePicture from "../../components/ProfilePicture";
export async function getServerSideProps(context) {
    let cookies = JSON.parse(context.req.cookies["user"] || null);
    if (cookies !== null) {
        let user = await getUserProfile(cookies.id);
        return {
            props: {
                user: user
            }
        }
    }
    return {
        redirect: {
            permanent: false,
            destination: "/intranet",
        },
        props: {},
    };
}

const profile = ({user}) => {
  return (
    <LayoutIntranet>
      <section className="">
        <div className="layout  py-12">
          <h3>Profil</h3>
            <ProfilePicture image={user.image}/>
            {JSON.stringify(user)}
            <a href="./editProfile">Ändra profil</a>
        </div>
      </section>
    </LayoutIntranet>
  );
};

export default profile;
