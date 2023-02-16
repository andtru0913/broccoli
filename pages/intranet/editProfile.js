import LayoutIntranet from "../../components/layout/layoutIntranet";
import { getNotifications, getUserProfile } from "../../Database";
import ProfilePicture from "../../components/ProfilePicture";
import { verify } from "../../tokens";

export async function getServerSideProps(context) {
  const user_id = await verify(
    JSON.parse(context.req.cookies["token"] || null)
  );
  const user = await getUserProfile(user_id);
  return !user
    ? {
        redirect: {
          permanent: false,
          destination: "/intranet",
        },
        props: {},
      }
    : {
        props: {
          userString: JSON.stringify(user),
          notifications: JSON.stringify(await getNotifications(user.id)),
        },
      };
}

const profile = ({ userString, notifications }) => {
  const user = JSON.parse(userString);
  return (
    <LayoutIntranet notifications={notifications} admin={user.admin || null}>
      <section className="bg-secondary-1 overflow-scroll lg:overflow-visible w-full ">
        <div className="relative bg-secondary-1">
          <div>
            <form action="../../api/editProfile" method="POST">
              <div className=" grid  grid-cols-1 grid-rows-3 md:grid-cols-3 md:grid-rows-1  h-full  md:px-12 bg-secondary-1  overflow-hidden">
                <div className=" relative col-span-1 pt-12 pl-2 ">
                  <svg
                    className="absolute left-0 md:-left-64 lg:-left-36 top-0 fill-primary-l1  "
                    width="504"
                    height="773"
                    viewBox="0 0 504 773"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M-44.0344 254.118C-49.6575 195.249 -196.249 -116.979 101.387 -79.973L503.761 -1.50977C482.005 26.0719 375.757 188.448 355.905 252.598C344.757 288.623 316.518 433.246 267.67 467.135C210.686 506.668 223.748 665.422 176.438 726.495C129.129 787.567 64.5561 775.547 28.9269 758.877C-6.70237 742.206 -67.2963 725.933 -82.805 671.058C-95.2119 627.157 -55.7542 551.868 -43.2952 456.607C-30.8362 361.347 -38.4113 312.988 -44.0344 254.118Z" />
                  </svg>

                  <div className=" mr-10 mt-16   justify-center flex flex-col">
                    <div className="w-56 h-64 mb-6 self-center relative z-10 ">
                      <ProfilePicture image={user.image} />
                    </div>
                    <div className="relative flex flex-wrap flex-col md:flex-row  items-end z-10 ">
                      <div className="flex flex-1 flex-col p-2 items-center  w-fit">
                        <p className="text-base pb-2 uppercase font-semibold ">
                          Ladda upp en profilbild
                        </p>
                        <input
                          className="form-control w-1/2  block px-3 py-1.5  text-base font-normal text-muted  solid    focus:text-muted focus:border-dashed hover:border-dashed"
                          type="file"
                          name="file"
                        />
                        <input
                          className="id"
                          type="hidden"
                          name="id"
                          value={user.id}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="md:col-span-2 row-span-2 relative z-10 ">
                  <h2 className="  pt-8 p-2 uppercase font-bold z-10">
                    Redigera Profil
                  </h2>

                  {/**Birthday*/}
                  <div className="relative flex flex-wrap flex-col md:flex-row  ">
                    <div className="flex flex-1 flex-col p-2">
                      <label
                        className="text-base pb-1 uppercase font-semibold"
                        htmlFor="first"
                      >
                        Födelsedatum
                      </label>
                      <input
                        className="adress text-sm p-2 border   appearance-none  leading-tight hover:border-dashed autofill:bg-primary-1 autofill:focus:bg-primary-1"
                        type="Date"
                        name="birthdate"
                      />
                    </div>
                  </div>
                  {/**Username and mail */}
                  <div className="relative flex flex-wrap flex-col md:flex-row ">
                    <div className="flex flex-1 flex-col p-2">
                      <label
                        className="text-base pb-1 uppercase font-semibold"
                        htmlFor="last"
                      >
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
                    <div className="flex flex-1 flex-col p-2">
                      <label
                        className="text-base uppercase pb-1 font-semibold"
                        htmlFor="first"
                      >
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
                  </div>

                  {/**private and work number*/}
                  <div className="relative flex flex-wrap flex-col md:flex-row  ">
                    <div className="flex flex-1 flex-col p-2">
                      <label
                        className="text-base pb-1 uppercase font-semibold"
                        htmlFor="first"
                      >
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
                    <div className="flex flex-1 flex-col p-2">
                      <label
                        className="text-base pb-1 uppercase font-semibold"
                        htmlFor="last"
                      >
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
                  {/**Beskrivning*/}
                  <div className="relative flex flex-wrap flex-col md:flex-row  ">
                    <div className="flex flex-1 flex-col p-2 ">
                      <label
                        className="text-base uppercase pb-1 font-semibold"
                        htmlFor="first"
                      >
                        Beskrivning
                      </label>
                      <textarea
                        className="description text-sm p-2 border   appearance-none  leading-tight hover:border-dashed autofill:bg-primary-d1 autofill:focus:bg-primary-d2"
                        name="description"
                        placeholder="Beskriv lite om dig själv"
                        defaultValue={user.description}
                      />
                    </div>
                  </div>

                  {/**Address
                  <div className="relative flex flex-wrap flex-col md:flex-row  ">
                    <div className="flex flex-1 flex-col p-2">
                      <label
                        className="text-base pb-1 uppercase font-semibold"
                        htmlFor="first"
                      >
                        Adress
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
                  */}
                  {/**Change password*/}
                  <div className="relative flex flex-wrap flex-col md:flex-row ">
                    <div className="flex flex-1 flex-col p-2">
                      <div className="flex flex-row ">
                        <label
                          className="text-base mb-2 uppercase font-semibold"
                          htmlFor="first"
                        >
                          Byt lösenord
                        </label>
                        <input
                          className="mt-2 ml-2"
                          id="changePassBox"
                          type="checkbox"
                          name="changePass"
                          onChange={function () {
                            document.getElementById("changePassText").disabled =
                              !document.querySelector("#changePassBox:checked");
                            document.getElementById("changePassText").value =
                              "";
                          }}
                        />
                      </div>
                      <input
                        id="changePassText"
                        disabled={true}
                        className="password p-2    mb-2"
                        type="text"
                        name="password"
                        placeholder="Nytt lösenord"
                      />
                    </div>
                  </div>

                  {/**Save button*/}
                  <div className=" flex justify-end p-2 pt-2 md:pb-12 pb-24 ">
                    <button className="btn btn-primary" type="submit">
                      Spara
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
          {/**Delete profile img*/}
          <div className=" relative flex -top-24 md:ml-4 justify-center w-1/3 z-10 ">
            <form action="../../api/deleteProfilePic" method="POST">
              <input className="id" type="hidden" name="id" value={user.id} />
              <button className="  btn btn-delete  ">Radera profilbild</button>
            </form>
          </div>
        </div>
      </section>
    </LayoutIntranet>
  );
};

export default profile;
