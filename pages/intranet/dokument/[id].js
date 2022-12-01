import LayoutIntranet from '../../../components/layout/layoutIntranet';
import {getDocument, getUserinfo} from "../../../Database";

export async function getServerSideProps(context) {
    let cookies = JSON.parse(context.req.cookies['user'] || null)
    let user = await getUserinfo(cookies.id)
    if (cookies !== {} || user !== null) {
        const id = context.params.id
        let doc = await getDocument(id)
        return {
            props: {doc: doc, admin: user.admin}
        }
    }
    return {
        redirect: {
            permanent: false,
            destination: "/intranet",
        },
        props:{},
    }
}

export default function Home ({doc, admin}) {
    let button = ""
    if (admin) {
        button = (
            <form method={"POST"} action={"../../api/deleteDocument"}>
                <input name={"id"} type={"hidden"} value={doc.id}/>
                    <button>&#10060;</button>
                </form>
            )
    }
    return (
        <LayoutIntranet admin={admin}>
            <p>{JSON.stringify(doc)}</p>
            <p>{doc.date}</p>
            <embed style={{height: "500px", width: "500px"}} src={`/uploads/dokument/${doc.filename}`} id={doc.id}/>
            <a download={doc.filename} href={`/uploads/dokument/${doc.filename}`}>Ladda ner</a>
            {button}
         </LayoutIntranet>
    );
}