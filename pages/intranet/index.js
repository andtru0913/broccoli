import Head from 'next/head'
//import * as Database from '../scripts'

export async function getStaticProps() {
    return {
        props: {}
    }
}

export default function Home() {
    return (
        <div >
            <Head>
                <title>Intranet</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/public/favicon.ico" />
            </Head>

            <main>
                <div>
                    <h1>
                        Please log in
                    </h1>
                    <form className="form" action="../../api/login" method="POST">
                        <input type="text" name="username" placeholder="Användarnamn"/>
                        <input type="text" name="password" placeholder="Lösenord"/>
                        <button type="submit">Log in</button>
                    </form>
                </div>

            </main>
        </div>
    )
}