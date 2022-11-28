import LayoutIntranet from "../../../../components/layout/layoutIntranet";
import fs from 'fs'
import ReactMarkdown from "react-markdown";
import NavHandbook from "../../../../components/handbook/navHandbook";

export async function getServerSideProps(context) {
  const language = context.params.language
  const filename = context.params.path
  let result = "### Error"
  try {
    result = fs.readFileSync(`pages/intranet/handbook/${language}/${filename}`, 'utf8')
  } catch {

  }
  return {
    props: {md: result, filename: filename, language: language},
  };
}

export default function Home({md, filename, language}) {
  return (
  <LayoutIntranet>
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