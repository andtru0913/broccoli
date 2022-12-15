import LayoutIntranet from "../../../../components/layout/layoutIntranet";
import fs from 'fs'
import ReactMarkdown from "react-markdown";
import NavHandbook from "../../../../components/handbook/navHandbook";
import {getNotifications} from "../../../../Database";
import * as Database from "../../../../Database";

export async function getServerSideProps(context) {
  const cookies = JSON.parse(context.req.cookies["user"] || null);
  const user = !!cookies? await Database.getUserinfo(cookies.id):null;
  if (!!user) {
    const language = context.params.language
    const filename = context.params.path
    let result = "### Error"
    try {
      result = fs.readFileSync(`pages/intranet/handbook/${language}/${filename}`, 'utf8')
    } catch {

    }
    return {
      props: {md: result, filename: filename, language: language, admin: user.admin || null, notifications: JSON.stringify(await getNotifications())},
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

export default function Home({md, filename, language, admin, notifications}) {
  return (
  <LayoutIntranet admin={admin} notifications={notifications}>
    <div className={"flex flex-row"}>
      <div className={"w-50 flex-initial overflow-y-scroll"}>
        <div className={"p-5"}>
          <div className={"flex flex-row justify-around"}>
            <a href={`../english/${filename}`}>
              <div className={"flex flex-row"}>
                <img width={"20px"} src={"https://flagcdn.com/gb.svg"} alt={""}/>
                <p className={`m-1 ${language==="english"?"font-bold":""}`}>Engelska</p>
              </div>
            </a>
            <a href={`../swedish/${filename}`}>
            <div className={"flex flex-row"}>
              <img width={"20px"} src={"https://flagcdn.com/se.svg"} alt={""}/>
              <p className={`m-1 ${language==="swedish"?"font-bold":""}`}>Svenska</p>
            </div>
            </a>
          </div>

          <NavHandbook language={language} currentPage={filename}/>
        </div>

      </div>
      <div className={"w-4/6 h-max p-5"}>
        <ReactMarkdown className={"markdown"}>{md}</ReactMarkdown>
      </div>
    </div>


  </LayoutIntranet>
  )
}