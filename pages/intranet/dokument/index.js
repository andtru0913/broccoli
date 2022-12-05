import LayoutIntranet from "../../../components/layout/layoutIntranet";
import {getAllDocuments, getNotifications, getUserinfo} from "../../../Database";
import { FileAdder } from "../../../components/FileAdder";

export async function getServerSideProps(context) {
  let cookies = JSON.parse(context.req.cookies["user"] || null);
  let user = await getUserinfo(cookies.id);
  if (cookies !== {} || user !== null) {
    let data = await getAllDocuments();
    return {
      props: {
        admin: user.admin,
        data: data,
        notifications: JSON.stringify(await getNotifications())
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

export default function Home({ admin, data, notifications }) {
  let button = "";
  if (admin) {
    const file = new FileAdder();
    const uploadToDatabase = () => {
      return new Promise(function (resolve, reject) {
        const xhr = new XMLHttpRequest();
        xhr.open("POST", "../../api/createDocument");
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(
          JSON.stringify({
            title: document.getElementById("title").value,
            filename: document
              .getElementById("file")
              .value.split(/([\\/])/g)
              .pop(),
          })
        );
        xhr.onload = function () {
          if (this.status >= 200 && this.status < 300) {
            resolve(xhr.response);
          } else {
            reject({
              status: this.status,
              statusText: xhr.statusText,
            });
          }
        };
        xhr.onerror = function () {
          reject({
            status: this.status,
            statusText: xhr.statusText,
          });
        };
      });
    };
    button = (
      <div>
        <input
          id={"title"}
          type={"text"}
          name={"title"}
          placeholder={"Titel"}
        />
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
              file
                .uploadToServer(
                  `dokument/${document
                    .getElementById("file")
                    .value.split(/([\\/])/g)
                    .pop()}`
                )
                .then((_) => {});
              await uploadToDatabase();
              window.location.reload();
            } catch (e) {}
          }}
        >
          Ladda upp
        </button>
      </div>
    );
  }
  return (
    <LayoutIntranet admin={admin} notifications={notifications}>
      <main className="">
        <div className="layout py-20 md:py-12  flex flex-col items-center">
          <section>
            {button}
            {data.map((doc, i) => (
              <div key={i}>
                <a href={`./dokument/${doc.id}`}>
                  {doc.title} <br />
                  {doc.date}
                </a>
              </div>
            ))}
          </section>
        </div>
      </main>
    </LayoutIntranet>
  );
}
