import LayoutIntranet from '../../../components/layout/layoutIntranet';
import {getDocument, getUserinfo} from "../../../Database";
import Base64Downloader from 'react-base64-downloader';

export async function getServerSideProps(context) {
    let cookies = JSON.parse(context.req.cookies['user'] || null)
    let user = await getUserinfo(cookies.id)
    if (cookies !== {} || user !== null) {
        const id = context.params.id
        let doc = await getDocument(id)
        return {
            props: {doc: doc}
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

export default function Home ({doc}) {
    return (
        <LayoutIntranet>
            <p>{doc.title}</p>
            <p>{doc.date}</p>
            <embed style={{height: "500px", width: "500px"}} src={doc.base64} id={doc.id}/>
            <Base64Downloader base64={doc.base64} downloadName={doc.filename}>Ladda ner</Base64Downloader>
         </LayoutIntranet>
    );
}