import LayoutIntranet from "../../../components/layout/layoutIntranet";
import { getAllUsers, getNotifications, getUserinfo } from "../../../Database";

export async function getServerSideProps(context) {
  const cookies = JSON.parse(context.req.cookies["user"] || null);
  const user = !!cookies ? await getUserinfo(cookies.id) : null;
  return !user || !user.admin
    ? {
        redirect: {
          permanent: false,
          destination: "/intranet",
        },
        props: {},
      }
    : {
        props: {
          user: await getAllUsers(),
          notifications: JSON.stringify(await getNotifications(user.id)),
        },
      };
}
export default function Home({ user, notifications }) {
 const popHide = "pop-hide";
  return (
    <LayoutIntranet admin={true} notifications={notifications}>
      <div id="popup" className={`${popHide} h-screen w-screen bg-black fixed z-20 bg-opacity-60 top-0 left-0 z-30`} onClick={function () {
        document.getElementById("popup").classList.add(popHide)
        document.getElementById("createuser").classList.add(popHide)
        document.getElementById("modifyuser").classList.add(popHide)
      }}>
      </div>
      <main className="">
        <div className="layout py-20 md:py-12 ">
          <h1 className="text-center">Anställda</h1>
          <div className=" flex flex-1 flex-col lg:flex-row justify-center">
            <div id="modifyuser" className={`${popHide} z-30 absolute w-screen p-8 rounded flex flex-col bg-white w-96 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2`}>
              <h3 className="text-skin-base"> Edit User</h3>
              <form className={"flex flex-col"} action="../../api/modifyuser" method="POST">
                <input className="id" type="hidden" name="id" />
                <input
                  className="username m-1"
                  type="text"
                  name="username"
                  placeholder="Användarnamn"
                />
                <div>
                  <input
                    id="changePassText"
                    disabled={true}
                    className="password m-1"
                    type="text"
                    name="password"
                    placeholder="Lösenord"
                  />
                  <label> Byt lösenord</label>
                  <input
                      className={"m-1"}
                    id="changePassBox"
                    type="checkbox"
                    name="changePass"
                    onChange={function () {
                      document.getElementById("changePassText").disabled =
                        !document.querySelector("#changePassBox:checked");
                    }}
                  />
                </div>
                <input
                  className="firstname m-1"
                  type="text"
                  name="firstname"
                  placeholder="Förnamn"
                />
                <input
                  className="lastname m-1"
                  type="text"
                  name="lastname"
                  placeholder="Efternamn"
                />
                <div className={"flex flex-row justify-between"}>
                  <div>
                    <input className={"m-1"} type="radio" id="man" name="gender" value="man" />
                    <label htmlFor="man">Man</label>
                  </div>
                  <div>
                    <input className={"m-1"} type="radio" id="woman" name="gender" value="woman" />
                    <label htmlFor="woman">Kvinna</label>
                  </div>
                  <div>
                    <input className={"m-1"} type="radio" id="none" name="gender" value="" />
                    <label htmlFor="none">Vill ej ange</label>
                  </div>
                </div>
                <input
                  className="email m-1"
                  type="text"
                  name="email"
                  placeholder="Email"
                />
                <input
                  className="address m-1"
                  type="text"
                  name="address"
                  placeholder="Address"
                />
                <input
                  className="privatenumber m-1"
                  type="text"
                  name="privatenumber"
                  placeholder="Privattelefon"
                />
                <input
                  className="worknumber m-1"
                  type="text"
                  name="worknumber"
                  placeholder="Arbetstelefon"
                />

                <input
                  className="company m-1"
                  type="text"
                  name="company"
                  placeholder="Bolag"
                />
                <input
                  className="assignment m-1"
                  type="text"
                  name="assignment"
                  placeholder="Uppdrag"
                />
                <div className={"m-1"}>
                  <label> Administratör</label>
                  <input
                    className="admin m-1"
                    type="checkbox"
                    name="admin"
                    value="true"
                  />
                </div>
                <input
                  className="role m-1"
                  type="text"
                  name="role"
                  placeholder="Roll"
                />

                <button type="submit">Ändra anställd</button>
              </form>
              <form
                onSubmit={function () {
                  if (!confirm("Är du säker?")) {
                    document
                      .getElementById("modifyuser")
                      .getElementsByClassName("id")[1].value = "";
                  }
                }}
                action="../../api/deleteUser"
                method="POST"
              >
                <input className="id" type="hidden" name="id" />
                <button type="submit">Radera anställd</button>
              </form>
            </div>
            <div id="createuser" className={`${popHide} z-30 absolute w-screen p-8 rounded flex flex-col bg-white w-96 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2`}>
              <h3 className={"text-skin-base"}>Lägg till anställd</h3>
              <form className={"flex flex-col"} action="../../api/admin/createuser" method="POST">
                <input className={"m-1"} type="text" name="username" placeholder="Användarnamn" />
                <input className={"m-1"} type="text" name="password" placeholder="Lösenord" />
                <input className={"m-1"} type="text" name="firstname" placeholder="Förnamn" />
                <input className={"m-1"} type="text" name="lastname" placeholder="Efternamn" />
                <div className={"m-1 flex flex-row justify-between"}>
                  <div>
                    <input type="radio" id="man" name="gender" value="man" />
                    <label htmlFor="man">Man</label>
                  </div>
                  <div>
                    <input type="radio" id="woman" name="gender" value="woman" />
                    <label htmlFor="woman">Kvinna</label>
                  </div>
                  <div>
                    <input type="radio" id="none" name="gender" value="" />
                    <label htmlFor="none">Vill ej ange</label>
                  </div>

                </div>

                <input className={"m-1"} type="text" name="email" placeholder="Email" />
                <input className={"m-1"} type="text" name="address" placeholder="Address" />
                <input
                    className={"m-1"}
                  type="text"
                  name="privatenumber"
                  placeholder="Privattelefon"
                />
                <input
                    className={"m-1"}
                  type="text"
                  name="worknumber"
                  placeholder="Arbetstelefon"
                />
                <input className={"m-1"} type="text" name="company" placeholder="Bolag" />
                <div className={"m-1"}>
                  <label> Administratör</label>
                  <input className={"m-1"} type="checkbox" name="admin" value="true" />
                </div>
                <input className={"m-1"} type="text" name="role" placeholder="Roll" />
                <button type="submit">Lägg till anställd</button>
              </form>
            </div>

            <div className="layout py-12  flex flex-col">
              <div className="grid grid-cols-1 gap-4 md:hidden">
                {user.map((u, i) => (
                  <div
                    key={i}
                    onClick={function () {
                      document
                        .getElementById("popup")
                        .classList.remove(popHide);
                      let window = document.getElementById("modifyuser");
                      window.getElementsByClassName("id")[0].value = u.id;
                      window.getElementsByClassName("id")[1].value = u.id;
                      window.getElementsByClassName("password")[0].value = "";
                      window.getElementsByClassName("username")[0].value =
                        u.username;
                      window.getElementsByClassName("firstname")[0].value =
                        u.firstname;
                      window.getElementsByClassName("lastname")[0].value =
                        u.lastname;
                      window.getElementsByClassName("email")[0].value = u.email;
                      window.getElementsByClassName("address")[0].value =
                        u.address;
                      window.getElementsByClassName("privatenumber")[0].value =
                        u.privatenumber;
                      window.getElementsByClassName("worknumber")[0].value =
                        u.worknumber;
                      window.getElementsByClassName("company")[0].value =
                        u.company;
                      window.getElementsByClassName("admin")[0].checked =
                        u.admin;
                      window.getElementsByClassName("assignment")[0].value =
                        u.assignment;
                      window.getElementsByClassName("role")[0].value = u.role;
                      if (!!u.gender) {
                        document.getElementById(u.gender).checked = true;
                      }
                      window.classList.remove(popHide);
                    }}
                    className="grid grid-flow-row gap-4 items-left text-sm p-4 rounded-lg shadow bg-skin-primary"
                  >
                    <h4>{u.username}</h4>
                  </div>
                ))}
                <div className="flex justify-end">
                  <button
                    className=" btn btn-create"
                    onClick={function () {
                      document
                        .getElementById("popup")
                        .classList.remove(popHide);
                      document
                        .getElementById("createuser")
                        .classList.remove(popHide);
                    }}
                  >
                    Lägg till anställd
                  </button>
                </div>
              </div>

              <div className="hidden md:block overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                  <div className="overflow-hidden"></div>

                  <table className="min-w-full">
                    <thead className="border-b-2 border-skin-secondary">
                      <tr>
                        <th className="text-sm font-medium text-skin-base px-6 py-4 text-left">
                          Användarnamn
                        </th>
                        <th className="text-sm font-medium text-skin-base px-6 py-4 text-left">
                          Förnamn
                        </th>
                        <th className="text-sm font-medium text-skin-base px-6 py-4 text-left">
                          Efternamn
                        </th>
                        <th className="text-sm font-medium text-skin-base px-6 py-4 text-left">
                          Email
                        </th>
                        <th className="text-sm font-medium text-skin-base px-6 py-4 text-left">
                          Address
                        </th>
                        <th className="text-sm font-medium text-skin-base px-6 py-4 text-left">
                          Privatnummer
                        </th>
                        <th className="text-sm font-medium text-skin-base px-6 py-4 text-left">
                          Arbetsnummer
                        </th>
                        <th className="text-sm font-medium text-skin-base px-6 py-4 text-left">
                          Bolag
                        </th>
                        <th className="text-sm font-medium text-skin-base px-6 py-4 text-left">
                          Uppdrag
                        </th>
                        <th className="text-sm font-medium text-skin-base px-6 py-4 text-left">
                          Roll
                        </th>
                        <th className="text-sm font-medium text-skin-base px-6 py-4 text-left">
                          Admin
                        </th>
                      </tr>
                    </thead>
                    <tbody className="">
                      {user.map((u, i) => (
                        <tr
                          className="border-b border-skin-primary"
                          key={i}
                          onClick={function () {
                            document
                              .getElementById("popup")
                              .classList.remove(popHide);
                            let window = document.getElementById("modifyuser");
                            window.getElementsByClassName("id")[0].value = u.id;
                            window.getElementsByClassName("id")[1].value = u.id;
                            window.getElementsByClassName("password")[0].value =
                              "";
                            window.getElementsByClassName("username")[0].value =
                              u.username;
                            window.getElementsByClassName(
                              "firstname"
                            )[0].value = u.firstname;
                            window.getElementsByClassName("lastname")[0].value =
                              u.lastname;
                            window.getElementsByClassName("email")[0].value =
                              u.email;
                            window.getElementsByClassName("address")[0].value =
                              u.address;
                            window.getElementsByClassName(
                              "privatenumber"
                            )[0].value = u.privatenumber;
                            window.getElementsByClassName(
                              "worknumber"
                            )[0].value = u.worknumber;
                            window.getElementsByClassName("company")[0].value =
                              u.company;
                            window.getElementsByClassName("admin")[0].checked =
                              u.admin;
                            window.getElementsByClassName(
                              "assignment"
                            )[0].value = u.assignment;
                            if (!!u.gender) {
                              document.getElementById(u.gender).checked = true;
                            }
                            window.getElementsByClassName("role")[0].value =
                              u.role;
                            window.classList.remove(popHide);
                          }}
                        >
                          <td className="text-sm text-skin-muted px-6 py-4 whitespace-nowrap">
                            {u.username}
                          </td>
                          <td className="text-sm text-skin-muted px-6 py-4 whitespace-nowrap">
                            {u.firstname}
                          </td>
                          <td className="text-sm text-skin-muted px-6 py-4 whitespace-nowrap">
                            {u.lastname}
                          </td>
                          <td className="text-sm text-skin-muted px-6 py-4 whitespace-nowrap">
                            {u.email}
                          </td>
                          <td className="text-sm text-skin-muted px-6 py-4 whitespace-nowrap">
                            {u.address}
                          </td>
                          <td className="text-sm text-skin-muted px-6 py-4 whitespace-nowrap">
                            {u.privatenumber}
                          </td>
                          <td className="text-sm text-skin-muted px-6 py-4 whitespace-nowrap">
                            {u.worknumber}
                          </td>
                          <td className="text-sm text-skin-muted px-6 py-4 whitespace-nowrap">
                            {u.company}
                          </td>
                          <td className="text-sm text-skin-muted px-6 py-4 whitespace-nowrap">
                            {u.assignment}
                          </td>
                          <td className="text-sm text-skin-muted px-6 py-4 whitespace-nowrap">
                            {u.role}
                          </td>
                          <td className="text-sm text-skin-muted px-6 py-4 whitespace-nowrap">
                            {String(u.admin)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  <div className="flex justify-end my-2">
                    <button className=" btn btn-create" onClick={function () {
                        document.getElementById("popup").classList.remove(popHide);
                        document.getElementById("createuser").classList.remove(popHide);
                      }}
                    >
                      Lägg till anställd
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </LayoutIntranet>
  );
}
