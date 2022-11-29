import LayoutIntranet from "../../components/layout/layoutIntranet";
import {getUserProfile} from "../../Database";
import {FileAdder} from "../../components/FileAdder";
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
    const file = new FileAdder()
  return (
    <LayoutIntranet>
      <section className="">
        <div className="layout  py-12">
          <h3>Ändra Profil</h3>
            <form action="../../api/editProfile" method="POST">
                <input className="id" type="hidden" name="id" value={user.id} />
                <div>

                    <input
                        id="changePassText"
                        disabled={true}
                        className="password"
                        type="text"
                        name="password"
                        placeholder="Lösenord"
                    />
                    <label> Byt lösenord</label>
                    <input
                        id="changePassBox"
                        type="checkbox"
                        name="changePass"
                        onChange={function () {
                            document.getElementById("changePassText").disabled =
                                !document.querySelector("#changePassBox:checked");
                            document.getElementById("changePassText").value = ""
                        }}
                    />
                </div>
                <input
                    className="username"
                    type="text"
                    name="username"
                    placeholder="Användarnamn"
                    defaultValue={user.username}
                />
                <input
                    className="email"
                    type="text"
                    name="email"
                    placeholder="Email"
                    defaultValue={user.email}
                />
                <input
                    className="address"
                    type="text"
                    name="address"
                    placeholder="Address"
                    defaultValue={user.address}
                />
                <input
                    className="privatenumber"
                    type="text"
                    name="privatenumber"
                    placeholder="Privattelefon"
                    defaultValue={user.privatenumber}
                />
                <input
                    className="worknumber"
                    type="text"
                    name="worknumber"
                    placeholder="Arbetstelefon"
                    defaultValue={user.worknumber}
                />
                <input
                    className="description"
                    type="text"
                    name="description"
                    placeholder="Beskriv lite om dig själv"
                    defaultValue={user.description}
                />
                <ProfilePicture image={user.image}/>
                <input type="file" name="myImage" onChange={file.uploadToClient} />
                <button onClick={function() {file.uploadToServer(`profiles/${user.email}`).then(_ => {})}} type="submit">Spara</button>
            </form>
            <form action="../../api/deleteProfilePic" method="POST">
                <input className="id" type="hidden" name="id" value={user.id} />
                <button>
                    Radera profilbild
                </button>
            </form>
        </div>
      </section>
    </LayoutIntranet>
  );
};

export default profile;
