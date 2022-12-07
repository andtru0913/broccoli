import LayoutIntranet from "../../../../components/layout/layoutIntranet";
import fs from 'fs'
import ReactMarkdown from "react-markdown";
import NavHandbook from "../../../../components/handbook/navHandbook";
import {getNotifications, getUserinfo} from "../../../../Database";

export async function getServerSideProps(context) {
  const language = context.params.language
  const filename = context.params.path
  const cookies = JSON.parse(context.req.cookies["user"] || null);
  if (cookies !== null) {
    const user = await getUserinfo(cookies.id)
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
    <NavHandbook language={language}/>
    <button onClick={function() {
        window.location.replace(`../english/${filename}`)
      }
    }>English</button>
    <button onClick={function() {
      window.location.replace(`../swedish/${filename}`)
    }
    }>Swedish</button>
    <ReactMarkdown>{md}</ReactMarkdown>
  </LayoutIntranet>
  )
}