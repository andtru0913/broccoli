import {getAllNews, getNotifications, getUserinfo} from "../../../Database";
import LayoutIntranet from "../../../components/layout/layoutIntranet";
import { FileAdder } from "../../../components/FileAdder";
import Nyheter from "../../../components/intranet/newsItem";

export async function getServerSideProps(context) {
  const cookies = JSON.parse(context.req.cookies["user"] || null);
  const user = await getUserinfo(cookies.id);
  if (cookies !== {} || user !== null) {
    const news = await getAllNews();
    return {
      props: {
        user: user,
        news: JSON.stringify(news),
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

export default function Home({ user, news, notifications }) {
  let popup = "";
  if (user.admin) {
    const file = new FileAdder();
    const uploadToDatabase = () => {
      console.log("hi")
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
      <div>
        Ny inlägg
          <input
            id={"title"}
            type={"text"}
            name={"title"}
            placeholder={"Titel"}
          />
          <input
            className={
              "form-control block px-3 py-1.5 text-base font-normal text-muted  solid  border  border-slate-900 focus:text-muted focus:border-dashed hover:border-dashed"
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
                await uploadToDatabase().then(_ => {});
                file.uploadToServer(`news/${document.getElementById("file").files[0].name}`).then(_ => {});
                window.location.reload();
              } catch (e) {
                console.log(e)
              }
            }
          }
          >
            Skapa nytt inlägg
          </button>
      </div>
    );
  }
  return (
      <LayoutIntranet admin={user.admin} notifications={notifications}>
        <div className="bg-zinc-400 flex flex-col items-center justify-center p-5 ">
          <h1 className=" uppercase font-bold p-4"> nyheter </h1>
          {popup}
        </div>

        <div className="flex flex-col">
          <div className="flex flex-row">
            <svg
                className=" absolute -z-10 left- fill-primary-1"
                width="1003"
                height="1107"
                viewBox="0 0 1003 1107"
                xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M-405.367 835.806C-432.001 969.232 -336.037 976.73 -164.842 1038.99C13.0588 1103.69 239.276 959.688 346.77 1063.25C426.95 1107.2 420.721 1116.42 531.945 1096.89C643.168 1077.36 653.92 966.549 697.087 950.223C751.045 929.816 845.167 877.613 916.799 816.125C988.432 754.637 1003.37 618.516 1002.11 445.824C1000.84 273.133 837.492 229.179 777.746 172.479C718 115.779 697.087 43.4356 588.505 13.9488C479.924 -15.5379 392.426 9.82456 306.692 43.4355C220.958 77.0465 137.307 65.9843 68.3682 115.779C-0.570077 165.574 1.53185 174.267 10.2654 278.899C18.999 383.53 -216.019 477.159 -316.121 573.137C-416.223 669.114 -378.734 702.379 -405.367 835.806Z" />
            </svg>

            <svg
                className="absolute -z-10 right-0 fill-secondary-1 "
                width="916"
                height="992"
                viewBox="0 0 916 992"
                xmlns="http://www.w3.org/2000/svg"
            >
              <path
                  d="M1076.54 536.211C1129 481.733 116f2.98 429.612 1135.21 385.366C1099.43 342.88 1079.11 221.986 942.188 139.86C883.571 93.1478 828.694 74.5988 711.915 24.6996C646.676 -3.177 560.298 65.1129 472.678 87.7451C385.057 110.377 271.808 -28.7223 177.414 6.41411C107.024 32.6159 50.5347 122.503 47.3241 151.469C42.9831 190.634 -3.8496 282.131 1.1307 358.169C7.03954 448.382 82.996 541.715 147.869 590.956C195.895 627.41 262.594 635.375 353.42 634.654C472.035 633.712 505.984 774.547 553.94 837.605L553.961 837.633C601.924 900.698 694.494 1022.42 790.991 984.215C838.403 965.444 902.668 944.06 919.412 858.449C932.492 791.569 1029.89 759.386 1048.75 705.878C1067.61 652.369 1024.09 590.689 1076.54 536.211Z"
                  fill="#F5F1E2"
              />
            </svg>
            <div className="grid grid-cols-1 md:grid-cols-2 w-full justify-evenly gap-3 p-4">
              <Nyheter admin={user.admin} data={JSON.parse(news)}/>
            </div>
          </div>
        </div>
      </LayoutIntranet>
  );
}
