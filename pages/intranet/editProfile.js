import LayoutIntranet from "../../components/layout/layoutIntranet";
import {getNotifications, getUserProfile} from "../../Database";
import { FileAdder } from "../../components/FileAdder";
import ProfilePicture from "../../components/ProfilePicture";
import {verify} from "../../tokens";

export async function getServerSideProps(context) {
  const user_id = await verify(JSON.parse(context.req.cookies["token"] || null))
  const user = await getUserProfile(user_id);
  return !user ?
      {
        redirect: {
          permanent: false,
          destination: "/intranet",
        },
        props: {},
      }
      :
      {
        props: {
          userString: JSON.stringify(user),
          notifications: JSON.stringify(await getNotifications(user.id))
        }
      }
}

const profile = ({ userString, notifications }) => {
  const user = JSON.parse(userString)
  const file = new FileAdder();
  return (
    <LayoutIntranet notifications={notifications} admin={user.admin || null}>
      <section className="bg-secondary-1 h-screen overflow-scroll lg:overflow-visible w-full pb-24  lg:pb-12">
        <div className="relative px-2 bg-secondary-1">
          <h2 className="py-8 uppercase text-center">Redigera Profil</h2>
          <form action="../../api/editProfile" method="POST">
            <div className="flex flex-col  w-full gap-2">
              <div className=" w-full  md:p-12 bg-secondary-1">
                <div className="w-1/4 pb-2">
                  <ProfilePicture image={user.image} />
                </div>
                <div className="relative flex flex-wrap flex-col md:flex-row ">
                  <div className="flex flex-1 flex-col md:p-2 w-full">
                    <input
                      className="form-control block px-3 py-1.5  text-base font-normal text-muted  solid    focus:text-muted focus:border-dashed hover:border-dashed"
                      type="file"
                      name="myImage"
                      onChange={file.uploadToClient}
                    />
                    <input
                      className="id"
                      type="hidden"
                      name="id"
                      value={user.id}
                    />
                  </div>
                </div>
                {/**Beskrivning*/}
                <div className="relative flex flex-wrap flex-col md:flex-row  ">
                  <div className="flex flex-1 flex-col md:p-2">
                    <label className="text-base pb-1" htmlFor="first">
                      Beskrivning
                    </label>
                    <textarea
                      className="description text-sm p-2 border   appearance-none  leading-tight hover:border-dashed autofill:bg-primary-1 autofill:focus:bg-primary-1"
                      name="description"
                      placeholder="Beskriv lite om dig själv"
                      defaultValue={user.description}
                    />
                  </div>
                </div>
                {/**Username and mail */}
                <div className="relative flex flex-wrap flex-col md:flex-row ">
                  <div className="flex flex-1 flex-col md:p-2">
                    <label className="text-base pb-1" htmlFor="first">
                      Användarnamn
                    </label>

                    <input
                      className="username text-sm p-2 border   appearance-none  leading-tight hover:border-dashed autofill:bg-primary-1 autofill:focus:bg-primary-1"
                      type="text"
                      name="username"
                      placeholder="Användarnamn"
                      defaultValue={user.username}
                    />
                  </div>
                  <div className="flex flex-1 flex-col md:p-2">
                    <label className="text-base pb-1" htmlFor="last">
                      Mail
                    </label>
                    <input
                      className="email text-sm p-2 border   appearance-none  leading-tight focus:border-dashed hover:border-dashed  "
                      type="text"
                      name="email"
                      placeholder="Email"
                      defaultValue={user.email}
                    />
                  </div>
                </div>

                {/**private and work number*/}
                <div className="relative flex flex-wrap flex-col md:flex-row  ">
                  <div className="flex flex-1 flex-col md:p-2">
                    <label className="text-base pb-1" htmlFor="first">
                      Privatnummer
                    </label>
                    <input
                      className="privatenumber text-sm p-2 border   appearance-none  leading-tight hover:border-dashed autofill:bg-primary-1 autofill:focus:bg-primary-1"
                      type="text"
                      name="privatenumber"
                      placeholder="Privattelefon"
                      defaultValue={user.privatenumber}
                    />
                  </div>
                  <div className="flex flex-1 flex-col md:p-2">
                    <label className="text-base pb-1" htmlFor="last">
                      Jobbnummer
                    </label>
                    <input
                      className="worknumber text-sm p-2 border    appearance-none  leading-tight focus:border-dashed hover:border-dashed  "
                      type="text"
                      name="worknumber"
                      placeholder="Arbetstelefon"
                      defaultValue={user.worknumber}
                    />
                  </div>
                </div>
                <div className="relative flex flex-wrap flex-col md:flex-row  ">
                  <div className="flex flex-1 flex-col md:p-2">
                <label className="text-base pb-1" htmlFor="first">
                  Födelsedatum
                </label>
                <input
                    className="adress text-sm p-2 border   appearance-none  leading-tight hover:border-dashed autofill:bg-primary-1 autofill:focus:bg-primary-1"
                    type="Date"
                    name="birthdate"
                />
                  </div>
                </div>
                {/**Address*/}
                <div className="relative flex flex-wrap flex-col md:flex-row  ">
                  <div className="flex flex-1 flex-col md:p-2">
                    <label className="text-base pb-1" htmlFor="first">
                      Address
                    </label>
                    <input
                      className="adress text-sm p-2 border   appearance-none  leading-tight hover:border-dashed autofill:bg-primary-1 autofill:focus:bg-primary-1"
                      type="text"
                      name="address"
                      placeholder="Address"
                      defaultValue={user.address}
                    />
                  </div>
                </div>
                {/**Change password*/}
                <div className="relative flex flex-wrap flex-col md:flex-row ">
                  <div className="flex flex-1 flex-col md:p-2">
                    <div className="flex flex-row gap-8">
                      <label className="text-base pb-1" htmlFor="first">
                        Byt lösenord
                      </label>
                      <input
                        id="changePassBox"
                        type="checkbox"
                        name="changePass"
                        onChange={function () {
                          document.getElementById("changePassText").disabled =
                            !document.querySelector("#changePassBox:checked");
                          document.getElementById("changePassText").value = "";
                        }}
                      />
                    </div>
                    <input
                      id="changePassText"
                      disabled={true}
                      className="password p-2 border   mb-2"
                      type="text"
                      name="password"
                      placeholder="Lösenord"
                    />
                  </div>
                </div>

                {/**Save button*/}
                <div className="relative flex flex-wrap flex-col md:flex-row items-end pt-2 w-full">
                  <div className="flex flex-1 flex-col md:p-2 w-1/2">
                    <button
                      className="btn btn-primary"
                      onClick={function () {
                        file
                          .uploadToServer(`profiles/${user.email}`)
                      }}
                      type="submit"
                    >
                      Spara
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
          {/**Delete profile img*/}
          <form action="../../api/deleteProfilePic" method="POST">
            <input className="id" type="hidden" name="id" value={user.id} />

            <div className="absolute top-32 right-2 md:right-12 md:top-60 flex flex-1 flex-col md:p-2">
              <button className="btn btn-empty text-xs md:text-base">
                Radera profilbild
              </button>
            </div>
          </form>
        </div>
      </section>
    </LayoutIntranet>
  );
};

export default profile;
