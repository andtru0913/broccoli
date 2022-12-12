import LayoutIntranet from "../../../components/layout/layoutIntranet";
import {getNotifications, getUserinfo} from "../../../Database";
import { FileAdder } from "../../../components/FileAdder";

export async function getServerSideProps(context) {
  let cookies = JSON.parse(context.req.cookies["user"] || null);
  let user = await getUserinfo(cookies.id);
  if (cookies !== {} || user !== null) {
    const fs = require('fs')
    const files = fs.readdirSync("./public/uploads/dokument")
    let data = []
    files.map((file,i) => {
      let f = {}
      f.filename = file;
      f.stats = fs.statSync(`./public/uploads/dokument/${file}`)
      data[i] = f
    })
    return {
      props: {
        admin: user.admin,
        notifications: JSON.stringify(await getNotifications()),
        data: JSON.stringify(data)
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
  let files = JSON.parse(data)
  let button = "";
  if (admin) {
    const file = new FileAdder();
    button = (
      <div>
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
              await file.uploadToServer(`dokument/${document.getElementById("file").value.split(/([\\/])/g).pop()}`).then((_) => {});
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
      <main className="">
        <div className="layout py-20 md:py-12  flex flex-col items-center">
          <section>
            {button}
            {files.map((doc, i) => (
              <div key={i}>
                <a href={`./dokument/${doc.filename}`}>
                  {doc.filename}
                  {doc.stats.birthtime.toLocaleString("default", {
                    weekday: "long",
                    day: "numeric",
                    month: "short",
                  }).split("T")[0]}
                </a>
              </div>
            ))}
          </section>
        </div>
      </main>
    </LayoutIntranet>
  );
}
