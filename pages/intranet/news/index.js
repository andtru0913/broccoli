import {getAllNews, getNotifications, getUserinfo} from "../../../Database";
import LayoutIntranet from "../../../components/layout/layoutIntranet";
import { FileAdder } from "../../../components/FileAdder";
import Nyheter from "../../../components/intranet/newsItem";

export async function getServerSideProps(context) {
    const cookies = JSON.parse(context.req.cookies["user"] || null);
    const user = !!cookies ? (await getUserinfo(cookies.id)) : null;
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
                user: user,
                news: JSON.stringify(await getAllNews(false )),
                notifications: JSON.stringify(await getNotifications(user.id)),
            }
        }
}

export default function Home({ user, news, notifications }) {
  let popup = "";
  if (user.admin) {
    const file = new FileAdder();
    const uploadToDatabase = () => {
      console.log("hi");
      return new Promise(function (resolve, reject) {
        const xhr = new XMLHttpRequest();
        xhr.open("POST", "../../api/admin/createNews");
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(
          JSON.stringify({
            title: document.getElementById("title").value,
            filename: document
              .getElementById("file")
              .value.split(/([\\/])/g)
              .pop(),
            id: user.id,
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
    popup = (
      <div className="z-10">
        Ny inlägg
        <input
          id={"title"}
          type={"text"}
          name={"title"}
          placeholder={"Titel"}
        />
        <input
          className={
            "form-control block px-3 py-1.5 text-base font-normal text-muted  solid  border  border-slate-900 focus:text-muted "
          }
          id="file"
          type="file"
          name="myImage"
          onChange={file.uploadToClient}
        />
        <button
          className="btn btn-primary"
          onClick={async function () {
            try {
              await uploadToDatabase().then((_) => {});
              file
                .uploadToServer(
                  `news/${document.getElementById("file").files[0].name}`
                )
                .then((_) => {});
              window.location.reload();
            } catch (e) {
              console.log(e);
            }
          }}
        >
          Skapa nytt inlägg
        </button>
      </div>
    );
  }
  return (
    <LayoutIntranet admin={user.admin} notifications={notifications}>
      <div className="flex flex-col items-center justify-center p-5 bg-secondary-1 ">
        <svg
          className=" absolute right-0 overflow-hidden z-0 fill-primary-1 "
          width="709"
          height="570"
          viewBox="0 0 709 570"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M497.871 59.9819C555.514 46.7719 846.095 -139.073 848 160.849L822.381 570C792.211 552.005 617.427 467.712 551.245 456.347C514.078 449.964 367.014 440.72 327.077 396.679C280.488 345.303 124.767 378.842 58.0754 339.853C-8.61652 300.863 -5.0722 235.276 6.83704 197.786C18.7463 160.296 27.0239 98.1033 79.4247 75.6092C121.345 57.6139 201.116 86.9745 297.188 86.9745C393.26 86.9745 440.228 73.192 497.871 59.9819Z" />
        </svg>

        <h1 className=" uppercase font-bold mt-12 p-4 z-10"> nyheter </h1>
        {popup}
      </div>

      <div className="flex flex-col bg-secondary-1 h-screen pt-12">
          <a href={"./news/archive"} className={"ml-4"}>Arkiv</a>
        <div className="flex flex-row">
          <div className="grid grid-cols-1 md:grid-cols-2 w-full justify-evenly gap-3 p-4 z-20 ">
            <Nyheter admin={user.admin} link={"/intranet/news/"} data={JSON.parse(news)} />
          </div>
        </div>
      </div>
    </LayoutIntranet>
  );
}
