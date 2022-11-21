import * as Database from "../../../Database";
import { authenticate } from "./authenticate";
import popupStyles from "../../../components/popup.module.css";
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
  const popUpstyle = "h-screen w-screen bg-black absolute z-20 bg-opacity-60";
  const windowstyle =
    "z-30 absolute w-screen bg-skin-fill p-8 rounded top-inledning/3 md:left-inledning/4 flex flex-col md:w-inledning/2 -translate-inledning/2 ";
  return (
    <LayoutIntranet>
      <main className="">
        <div className="layout py-20 md:py-12 ">
          <h1 className="text-center">Anställda</h1>
          <div className=" flex flex-1 flex-col lg:flex-row justify-center">
            <div
              id="modifyuser"
              className={`${popupStyles.window} ${popupStyles.hide}`}
            >
              <h3 className="text-skin-base"> Edit User</h3>
              <form action="../../api/modifyuser" method="POST">
                <input className="id" type="hidden" name="id" />
                <input
                  className="username"
                  type="text"
                  name="username"
                  placeholder="Användarnamn"
                />
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
                    }}
                  />
                </div>
                <input
                  className="firstname"
                  type="text"
                  name="firstname"
                  placeholder="Förnamn"
                />
                <input
                  className="lastname"
                  type="text"
                  name="lastname"
                  placeholder="Efternamn"
                />
                <input type="radio" id="man" name="gender" value="man"/>
                <label htmlFor="man">Man</label>
                <input type="radio" id="woman" name="gender" value="woman"/>
                <label htmlFor="woman">Kvinna</label>
                <input type="radio" id="none" name="gender" value=""/>
                <label htmlFor="none">Vill ej ange</label>
                <input
                  className="email"
                  type="text"
                  name="email"
                  placeholder="Email"
                />
                <input
                  className="address"
                  type="text"
                  name="address"
                  placeholder="Address"
                />
                <input
                  className="privatenumber"
                  type="text"
                  name="privatenumber"
                  placeholder="Privattelefon"
                />
                <input
                  className="worknumber"
                  type="text"
                  name="worknumber"
                  placeholder="Arbetstelefon"
                />
                <input
                  className="company"
                  type="text"
                  name="company"
                  placeholder="Bolag"
                />
                <div>
                  <label> Administratör</label>
                  <input
                    className="admin"
                    type="checkbox"
                    name="admin"
                    value="true"
                  />
                </div>

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
            <div
              id="popup"
              className={`${popupStyles.popUp} ${popupStyles.hide}`}
              onClick={function () {
                document
                  .getElementById("popup")
                  .classList.add(popupStyles.hide);
                document
                  .getElementById("createuser")
                  .classList.add(popupStyles.hide);
                document
                  .getElementById("modifyuser")
                  .classList.add(popupStyles.hide);
              }}
            ></div>
            <div
              id="createuser"
              className={`${popupStyles.window} ${popupStyles.hide}`}
            >
              <form action="../../api/createuser" method="POST">
                <input type="text" name="username" placeholder="Användarnamn" />
                <input type="text" name="password" placeholder="Lösenord" />
                <input type="text" name="firstname" placeholder="Förnamn" />
                <input type="text" name="lastname" placeholder="Efternamn" />
                <input type="radio" id="man" name="gender" value="man"/>
                <label htmlFor="man">Man</label>
                <input type="radio" id="woman" name="gender" value="woman"/>
                <label htmlFor="woman">Kvinna</label>
                <input type="radio" id="none" name="gender" value=""/>
                <label htmlFor="none">Vill ej ange</label>
                <input type="text" name="email" placeholder="Email" />
                <input type="text" name="address" placeholder="Address" />
                <input
                  type="text"
                  name="privatenumber"
                  placeholder="Privattelefon"
                />
                <input
                  type="text"
                  name="worknumber"
                  placeholder="Arbetstelefon"
                />
                <input type="text" name="company" placeholder="Bolag" />
                <div>
                  <label> Administratör</label>
                  <input type="checkbox" name="admin" value="true" />
                </div>

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
                        .classList.remove(popupStyles.hide);
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

                      window.classList.remove(popupStyles.hide);
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
                        .classList.remove(popupStyles.hide);
                      document
                        .getElementById("createuser")
                        .classList.remove(popupStyles.hide);
                    }}
                  >
                    {" "}
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
                              .classList.remove(popupStyles.hide);
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

                            window.classList.remove(popupStyles.hide);
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
                            {String(u.admin)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  <div className="flex justify-end my-2">
                    <button
                      className=" btn btn-create"
                      onClick={function () {
                        document
                          .getElementById("popup")
                          .classList.remove(popupStyles.hide);
                        document
                          .getElementById("createuser")
                          .classList.remove(popupStyles.hide);
                      }}
                    >
                      {" "}
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
