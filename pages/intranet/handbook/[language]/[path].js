import LayoutIntranet from "../../../../components/layout/layoutIntranet";
import fs from 'fs'
import ReactMarkdown from "react-markdown";
import NavHandbook from "../../../../components/handbook/navHandbook";
import {getNotifications, getUserinfo} from "../../../../Database";
import {verify} from "../../../../tokens";
import Image from "next/image";

export async function getServerSideProps(context) {
  const user_id = await verify(JSON.parse(context.req.cookies["token"] || null))
  const user = await getUserinfo(user_id);
  if (!!user) {
    const language = context.params.language
    const filename = context.params.path
    let result = "### Error"
    try {
      result = fs.readFileSync(`pages/intranet/handbook/${language}/${filename}`, 'utf8')
    } catch {

    }
    return {
      props: {md: result, filename: filename, language: language, admin: user.admin || null, notifications: JSON.stringify(await getNotifications(user.id))},
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
                <Image loader={() => "https://flagcdn.com/gb.svg"} width={"20"} height={"20"} src={"https://flagcdn.com/gb.svg"} alt={""}/>
                <p className={`m-1 ${language==="english"?"font-bold":""}`}>Engelska</p>
              </div>
            </a>
            <a href={`../swedish/${filename}`}>
            <div className={"flex flex-row"}>
              <Image loader={() => "https://flagcdn.com/se.svg"} width={"20"} height={"20"} src={"https://flagcdn.com/gb.svg"} alt={""}/>
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