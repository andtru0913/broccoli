import LayoutIntranet from "../../../components/layout/layoutIntranet";
import { getNotifications, getUserinfo } from "../../../Database";
import { FileAdder } from "../../../components/FileAdder";

export async function getServerSideProps(context) {
  let cookies = JSON.parse(context.req.cookies["user"] || null);
  let user = await getUserinfo(cookies.id);
  if (cookies !== {} || user !== null) {
    const fs = require("fs");
    const files = fs.readdirSync("./public/uploads/dokument");
    let data = [];
    files.map((file, i) => {
      let f = {};
      f.filename = file;
      f.stats = fs.statSync(`./public/uploads/dokument/${file}`);
      data[i] = f;
    });
    return {
      props: {
        admin: user.admin,
        notifications: JSON.stringify(await getNotifications()),
        data: JSON.stringify(data),
      },
    };
  }
  return {
    redirect: {
      permanent: false,
      destination: "/intranet",
    },
    props: {},
  };
}

export default function Home({ admin, notifications, data }) {
  let files = JSON.parse(data);
  let button = "";
  if (admin) {
    const file = new FileAdder();
    button = (
      <div className={"w-60 m-auto"}>
        <input
          className="form-control block w-full px-3 py-1.5 text-base font-normal text-muted  bg-clip-padding border border-solid border-border rounded transition ease-in-out m-0 focus:text-muted focus:bg-fill focus:border-secondary focus:outline-none"
          id={"file"}
          type="file"
          name="myImage"
          onChange={file.uploadToClient}
        />
        <button
          className=""
          type="submit"
          onClick={async function () {
            try {
              await file
                .uploadToServer(
                  `dokument/${document
                    .getElementById("file")
                    .value.split(/([\\/])/g)
                    .pop()}`
                )
                .then((_) => {});
            } catch (e) {}
            window.location.reload();
          }}
        >
          Ladda upp
        </button>
      </div>
    );
  }
  return (
    <LayoutIntranet admin={admin} notifications={notifications}>
      <section>
        <div className="h-[12rem] py-20  flex flex-col items-center overflow-clip bg-secondary-1">
          <div className=" max-w-readable z-20">
            <h1 className=" px-4 text-center uppercase font-bold z-20">
              Dokument
            </h1>
            <h3 className="p-4 px-6 text-center text-base z-20">
              Här finns dokument som kan komma till användning
            </h3>
          </div>
          <div className="overflow-clip  ">
            <svg
              className=" absolute fill-primary-l1 top-0 left-0 z-0 h-auto "
              width="950"
              height="350"
              viewBox="0 0 1011 497"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M-262.814 197.543C-267.368 164.706 -187.678 158.082 -92.0512 72.1636C-92.0512 72.1636 10.4065 -20.5277 10.4065 -50.977C10.4065 -89.0386 242.644 -80.0829 290.458 -80.0829C338.271 -80.0829 748.102 -62.1716 912.034 -39.7824C1075.97 -17.3932 1007.66 36.3409 912.034 72.1636C816.407 107.986 827 197.543 780.5 256.5C759.325 283.347 720.102 302.772 563 320.684C405.898 338.595 403.797 284.861 315 320.684C226.203 356.506 317.78 484.805 242.644 496C167.508 507.195 10.4065 399.046 -126.204 347.551C-235.492 306.355 -262.814 230.381 -262.814 197.543Z" />
            </svg>
          </div>
        </div>
      </section>

      <section className=" bg-secondary-1 h-full">
        <div className=" p-12 md:p-16 grid grid-cols-1 md:grid-cols-2 ">
          <div className="pb-12 md:pr-14 flex flex-col md:border-spacing-x-12  md:border-r-2 md:border-black border-transperent z-20 ">
            <div className="px-4 md:px-12 max-w-readable  flex flex-col items-center md:items-start ">
              <h3 className="uppercase font-bold py-2"> FÖRETAGSDOKUMENT </h3>
              <p className="max-w-readabler text-center md:text-left pb-4">
                Här lägger arbetsledning och administrationsavdelningen upp
                dokument och information för oss som arbetar på Broccoli.
              </p>

              <div className="justify-start ">{button}</div>
            </div>
            <div className="flex flex-col items-start md:items-center py-4 md:py-6 md:px-12">
              <table className={"border-spacing-y-2 w-full "}>
                <thead className="">
                  <tr className={"border-b-4 border-tertiary-d1 p-4 "}>
                    <th className={"text-left uppercase px-2 md:px-4"}>Namn</th>
                    <th className={"text-left uppercase px-2 md:px-4"}>
                      Uppladdad
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {files.map((doc, i) => (
                    <tr
                      className={"cursor-pointer border-tertiary-1 border-b-2"}
                      onClick={function () {
                        window.location.href = `dokument/${doc.filename}`;
                      }}
                      key={i}
                    >
                      <td className={"p-2 px-4"}>
                        {doc.filename.split(".").shift()}
                      </td>
                      <td className={"p-2 px-4"}>
                        {
                          doc.stats.birthtime
                            .toLocaleString("default", {
                              weekday: "long",
                              day: "numeric",
                              month: "short",
                            })
                            .split("T")[0]
                        }
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="flex flex-col justify-start">
            <h3 className="uppercase font-bold"> Övriga dokument </h3>
            <p className="max-w-readable px-6">
              Här får alla lägga upp dokument och information som anses vara
              utav värde att ha gemensamt.
            </p>
            <div className="justify-start ">{button}</div>
            <div className="">
              <div className="grid grid-flow-row">
                {" "}
                akr
                <div className="grid-cols-1"></div>
              </div>
            </div>
            <table className={""}>
              <thead>
                <tr className={"border-b-4  border-tertiary-d1 "}>
                  <th className={"text-left"}>Name</th>
                  <th className={"text-left"}>Date modified</th>
                  <th className={"text-left"}>Type</th>
                </tr>
              </thead>
              <tbody>
                {files.map((doc, i) => (
                  <tr
                    className={"cursor-pointer border-tertiary-1 border-b-2"}
                    onClick={function () {
                      window.location.href = `dokument/${doc.filename}`;
                    }}
                    key={i}
                  >
                    <td className={"p-2 "}>
                      {doc.filename.split(".").shift()}
                    </td>
                    <td className={"p-2 "}>
                      {
                        doc.stats.birthtime
                          .toLocaleString("default", {
                            weekday: "long",
                            day: "numeric",
                            month: "short",
                          })
                          .split("T")[0]
                      }
                    </td>
                    <td className={"p-2 "}>{doc.filename.split(".").pop()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </LayoutIntranet>
  );
}
