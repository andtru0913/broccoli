import Head from 'next/head'
import styles from '../../../styles/Home.module.css'
import * as Database from "../../../Database";
import {authenticate} from "./authenticate";
import LayoutIntranet from '../../../components/layout/layoutIntranet';



export async function getServerSideProps(context) {
    let authentication = await authenticate(context)
    if (authentication !== undefined) return authentication
    let userid = context.req.cookies['userid']
    let user = await Database.getUserinfo(userid)
    return {
        props: {user: user}
    }
}

export default function Home({user}) {
    return (

        <LayoutIntranet>
            <div className={styles.container}>
                <Head>
                    <title>Admin</title>
                    <meta name="description" content="Generated by create next app" />
                    <link rel="icon" href="/public/favicon.ico" />
                </Head>

                <main className={styles.main}>
                    <div>
                        <h1>
                            Welcome {user.firstname} to admin
                        </h1>
                        <a href="./admin/users">Anställda</a>
                    </div>

                </main>
            </div>
            </LayoutIntranet>
    )
}
