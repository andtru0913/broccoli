import LayoutIntranet from "../../../components/layout/layoutIntranet";
import { getAllUsers, getNotifications, getUserinfo } from "../../../Database";
import { verify } from "../../../tokens";

export async function getServerSideProps(context) {
  const user_id = await verify(
    JSON.parse(context.req.cookies["token"] || null)
  );
  const user = await getUserinfo(user_id);
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
      <div
        id="popup"
        className={`${popHide} h-screen w-screen bg-black fixed bg-opacity-60 top-0 left-0 z-30`}
        onClick={function () {
          document.getElementById("popup").classList.add(popHide);
          document.getElementById("createuser").classList.add(popHide);
          document.getElementById("modifyuser").classList.add(popHide);
        }}
      ></div>
      <main className="">
        <div className=" layout md:py-20 py-12 bg-secondary-l1">
          <h1 className="text-center font-bold uppercase">Anställda</h1>
          <div className=" flex flex-1 flex-col lg:flex-row justify-center">
            <div
              id="modifyuser"
              className={`${popHide} z-50 p-8 rounded flex flex-col bg-secondary-1 w-96 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2`}
            >
              <h3 className="text-skin-base uppercase m-1"> Ändra anställd</h3>
              <svg
                className="absolute right-0 bottom-1/4 z-0 fill-secondary-l1 "
                width="384"
                height="343"
                viewBox="0 0 342 304"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M220.67 37.4185C244.261 42.0189 341.158 -74.2202 342 84.9124V276.505C309.023 342.178 271.664 268.977 238.385 244.96C224.481 234.926 162.831 239.43 145.179 216.063C124.587 188.804 55.7593 206.599 26.2817 185.912C-3.19595 165.225 -1.62936 130.426 3.63449 110.535C8.89835 90.6431 12.557 57.645 35.718 45.71C54.2468 36.1621 89.505 51.7402 131.968 51.7402C174.432 51.7402 197.079 32.8181 220.67 37.4185Z" />
              </svg>
              <form
                className="flex flex-col relative"
                action="../../api/admin/modifyuser"
                method="POST"
              >
                <input className="id " type="hidden" name="id" />
                <input type="hidden" name="redirect" />
                <input
                  className="username m-1 p-1"
                  type="text"
                  name="username"
                  placeholder="Användarnamn"
                />
                <div className="flex flex-row">
                  <div className="w-1/2">
                    <label className="m-1 p-1 mt-2"> Byt lösenord</label>
                    <input
                      className="m-1 p-1 mt-4 "
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
                    id="changePassText"
                    disabled={true}
                    className="password m-1 p-1 w-1/2"
                    type="text"
                    name="password"
                    placeholder="Nytt lösenord"
                  />
                </div>
                <input
                  className="firstname m-1 p-1"
                  type="text"
                  name="firstname"
                  placeholder="Förnamn"
                />
                <input
                  className="lastname m-1 p-1"
                  type="text"
                  name="lastname"
                  placeholder="Efternamn"
                />
                <div className={"flex flex-row justify-between mx-1"}>
                  <div>
                    <input
                      className={"m-1 p-1"}
                      type="radio"
                      id="man"
                      name="gender"
                      value="man"
                    />
                    <label htmlFor="man">Man</label>
                  </div>
                  <div>
                    <input
                      className={"m-1 p-1"}
                      type="radio"
                      id="woman"
                      name="gender"
                      value="woman"
                    />
                    <label htmlFor="woman">Kvinna</label>
                  </div>
                  <div>
                    <input
                      className={"m-1 p-1"}
                      type="radio"
                      id="none"
                      name="gender"
                      value=""
                    />
                    <label htmlFor="none">Vill ej ange</label>
                  </div>
                </div>
                <input
                  className="email m-1 p-1"
                  type="text"
                  name="email"
                  placeholder="Email"
                />
                <input
                  className="address m-1 p-1"
                  type="text"
                  name="address"
                  placeholder="Address"
                />
                <input
                  className="privatenumber m-1 p-1"
                  type="text"
                  name="privatenumber"
                  placeholder="Privattelefon"
                />
                <input
                  className="worknumber m-1 p-1"
                  type="text"
                  name="worknumber"
                  placeholder="Arbetstelefon"
                />

                <input
                  className="company m-1 p-1"
                  type="text"
                  name="company"
                  placeholder="Bolag"
                />
                <input
                  className="assignment m-1 p-1"
                  type="text"
                  name="assignment"
                  placeholder="Uppdrag"
                />

                <input
                  className="role m-1 p-1"
                  type="text"
                  name="role"
                  placeholder="Roll"
                />

                <div className={"m-1"}>
                  <label className="m-1"> Administratör</label>
                  <input
                    className="admin m-1 p-1"
                    type="checkbox"
                    name="admin"
                    value="true"
                  />
                </div>
                <div className="border-t-2 border-primary-d1 border-dashed mt-3">
                  <button className="btn btn-modify w-full  mt-2" type="submit">
                    Ändra anställd
                  </button>
                </div>
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
                <button className="btn btn-delete  w-full mt-2 " type="submit">
                  Radera anställd
                </button>
              </form>
            </div>
            <div
              id="createuser"
              className={`${popHide} z-30  p-8 rounded flex flex-col bg-secondary-1 w-96 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2`}
            >
              <h3 className={"text-skin-base uppercase m-1 "}>
                Lägg till anställd
              </h3>
              <svg
                className="absolute right-0 bottom-1/4 z-0 fill-secondary-l1 "
                width="384"
                height="343"
                viewBox="0 0 342 304"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M220.67 37.4185C244.261 42.0189 341.158 -74.2202 342 84.9124V276.505C309.023 342.178 271.664 268.977 238.385 244.96C224.481 234.926 162.831 239.43 145.179 216.063C124.587 188.804 55.7593 206.599 26.2817 185.912C-3.19595 165.225 -1.62936 130.426 3.63449 110.535C8.89835 90.6431 12.557 57.645 35.718 45.71C54.2468 36.1621 89.505 51.7402 131.968 51.7402C174.432 51.7402 197.079 32.8181 220.67 37.4185Z" />
              </svg>
              <form
                className="flex flex-col relative"
                action="../../api/admin/createuser"
                method="POST"
              >
                <input
                  className={"m-1 p-1"}
                  type="text"
                  name="username"
                  placeholder="Användarnamn"
                />
                <input
                  className={"m-1 p-1"}
                  type="text"
                  name="password"
                  placeholder="Lösenord"
                />
                <input
                  className={"m-1 p-1"}
                  type="text"
                  name="firstname"
                  placeholder="Förnamn"
                />
                <input
                  className={"m-1 p-1"}
                  type="text"
                  name="lastname"
                  placeholder="Efternamn"
                />
                <div className={"m-1  flex flex-row justify-between"}>
                  <div>
                    <input
                      className="mr-1"
                      type="radio"
                      id="man"
                      name="gender"
                      value="man"
                    />
                    <label htmlFor="man">Man</label>
                  </div>
                  <div>
                    <input
                      className="mx-1"
                      type="radio"
                      id="woman"
                      name="gender"
                      value="woman"
                    />
                    <label htmlFor="woman">Kvinna</label>
                  </div>
                  <div>
                    <input
                      className="mx-1"
                      type="radio"
                      id="none"
                      name="gender"
                      value=""
                    />
                    <label htmlFor="none">Vill ej ange</label>
                  </div>
                </div>
                <input
                  className={"m-1 p-1"}
                  type="text"
                  name="email"
                  placeholder="Email"
                />
                <input
                  className={"m-1 p-1"}
                  type="text"
                  name="address"
                  placeholder="Address"
                />
                <input
                  className={"m-1 p-1"}
                  type="text"
                  name="privatenumber"
                  placeholder="Privattelefon"
                />
                <input
                  className={"m-1 p-1"}
                  type="text"
                  name="worknumber"
                  placeholder="Arbetstelefon"
                />
                <input
                  className={"m-1 p-1"}
                  type="text"
                  name="company"
                  placeholder="Bolag"
                />
                <input
                  className={"m-1 p-1"}
                  type="text"
                  name="role"
                  placeholder="Roll"
                />
                <div className={"m-1 mb-4"}>
                  <label> Administratör</label>
                  <input
                    className={"m-1 p-1 mx-2"}
                    type="checkbox"
                    name="admin"
                    value="true"
                  />
                </div>
                <div className="border-t-2 border-primary-d1 border-dashed">
                  <button
                    className="btn btn-create w-full  p-1 mt-2 "
                    type="submit"
                  >
                    Lägg till anställd
                  </button>
                </div>
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
                <div className="flex justify-self-start">
                  <button
                    className=" btn btn-create m-1 "
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

              <div className="hidden md:block overflow-x-auto sm:-mx-6 lg:-mx-8 bg-secondary-l1">
                <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                  <div className="overflow-hidden"></div>

                  <table className="min-w-full">
                    <thead className="border-b-2 border-primary-d1">
                      <tr>
                        <th className=" text-base font-bold uppercase text-skin-base px-6 pt-4 text-left ">
                          Användarnamn
                        </th>
                        <th className="text-base font-bold uppercase  text-skin-base px-6 pt-4 text-left">
                          Förnamn
                        </th>
                        <th className="text-base font-bold uppercase  text-skin-base px-6 pt-4 text-left">
                          Efternamn
                        </th>
                        <th className="text-base font-bold uppercase text-skin-base px-6 pt-4 text-left">
                          Email
                        </th>
                        <th className="text-base font-bold uppercase  text-skin-base px-6 pt-4 text-left">
                          Address
                        </th>
                        <th className="text-base font-bold uppercase  text-skin-base px-6 pt-4 text-left">
                          Privatnummer
                        </th>
                        <th className="text-base font-bold uppercase text-skin-base px-6 pt-4 text-left">
                          Arbetsnummer
                        </th>
                        <th className="text-base font-bold uppercase  text-skin-base px-6 pt-4 text-left">
                          Bolag
                        </th>
                        <th className="text-base font-bold uppercase  text-skin-base px-6 pt-4 text-left">
                          Uppdrag
                        </th>
                        <th className="text-base font-bold uppercase text-skin-base px-6 pt-4 text-left">
                          Roll
                        </th>
                        <th className="text-base font-bold uppercase  text-skin-base px-6 pt-4 text-left">
                          Admin
                        </th>
                      </tr>
                    </thead>
                    <tbody className="">
                      {user.map((u, i) => (
                        <tr
                          className="border-b border-primary-1"
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
                          <td className="text-sm text-skin-muted px-6 pt-6   whitespace-nowrap">
                            {u.username}
                          </td>
                          <td className="text-sm text-skin-muted px-6 pt-6 whitespace-nowrap">
                            {u.firstname}
                          </td>
                          <td className="text-sm text-skin-muted px-6 pt-6  whitespace-nowrap">
                            {u.lastname}
                          </td>
                          <td className="text-sm text-skin-muted px-6 pt-6  whitespace-nowrap">
                            {u.email}
                          </td>
                          <td className="text-sm text-skin-muted px-6 pt-6  whitespace-nowrap">
                            {u.address}
                          </td>
                          <td className="text-sm text-skin-muted px-6 pt-6  whitespace-nowrap">
                            {u.privatenumber}
                          </td>
                          <td className="text-sm text-skin-muted px-6 pt-6  whitespace-nowrap">
                            {u.worknumber}
                          </td>
                          <td className="text-sm text-skin-muted px-6 pt-6  whitespace-nowrap">
                            {u.company}
                          </td>
                          <td className="text-sm text-skin-muted px-6 pt-6  whitespace-nowrap">
                            {u.assignment}
                          </td>
                          <td className="text-sm text-skin-muted px-6 pt-6  whitespace-nowrap">
                            {u.role}
                          </td>
                          <td className="text-sm text-skin-muted px-6 pt-6  whitespace-nowrap">
                            {String(u.admin)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  <div className="flex justify-center my-2">
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
              </div>
            </div>
          </div>
        </div>
      </main>
    </LayoutIntranet>
  );
}
