import { getAllNews, getUserinfo } from "../../../Database";
import LayoutIntranet from "../../../components/layout/layoutIntranet";
import { FileAdder } from "../../../components/FileAdder";

export async function getServerSideProps(context) {
  const cookies = JSON.parse(context.req.cookies["user"] || null);
  const user = await getUserinfo(cookies.id);
  if (cookies !== {} || user !== null) {
    const news = await getAllNews();
    return {
      props: {
        user: user,
        news: news,
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

export default function Home({ user, news }) {
  let popup = "";
  if (user.admin) {
    const file = new FileAdder();
    const uploadToDatabase = () => {
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
        <form>
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
            id={"file"}
            type="file"
            name="myImage"
            onChange={file.uploadToClient}
          />
          <button
            className="btn btn-primary"
            type="submit"
            onClick={async function () {
              try {
                file
                  .uploadToServer(
                    `news/${document
                      .getElementById("file")
                      .value.split(/([\\/])/g)
                      .pop()}`
                  )
                  .then((e) => {
                    console.log(e);
                  });
                await uploadToDatabase();
              } catch (e) {}
              window.location.href = "";
            }}
          >
            Skapa nytt inlägg
          </button>
        </form>
      </div>
    );
  }
  return (
    <LayoutIntranet admin={user.admin}>
      News
      {popup}
      {news.map((item, i) => (
        <a key={i} href={`./news/${item.id}`}>
          {item.title}
          {item.date}
          {item.author.firstname}
          {item.author.lastname}
        </a>
      ))}
    </LayoutIntranet>
  );
}
