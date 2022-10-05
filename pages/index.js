
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import NavBar from '../components/navbar'
import Layout from '../components/layout'

export default function Home() {
  return (
    <Layout>
      <main className={styles.main}>
        <header>
          <h1 className={styles.title}> BROCCOLI </h1>
        </header>
        <div className={styles.bgWrap}>
          
          <Image 
              src="/images/gothenburg.jfif"
              layout="fill"
              objectFit='cover'
              alt="Siluette of Gothenburg"
            />
        </div>

        <div>

          <div className={styles.grid}>
            <Link href="/carreer">
              <a  className={styles.card}>
                <h2>KARRIÄR &rarr;</h2>
                <p>Find in-depth information about Next.js features and API.</p>
              </a>
            </Link>


            <a href="/underconsultants" className={styles.card}>
              <h2>UNDERKONSULT &rarr;</h2>
              <p>Learn about Next.js in an interactive course with quizzes!</p>
            </a>

            <a
              href="/our_services"
              className={styles.card}
            >
              <h2>TJÄNSTER &rarr;</h2>
              <p>Discover and deploy boilerplate example Next.js projects.</p>
            </a>

            <a
              href="/about"
              className={styles.card}
            >
              <h2>ATT JOBBA HOS BROCCOLI &rarr;</h2>
              <p>
                Instantly deploy your Next.js site to a public URL with Vercel.
              </p>
            </a>

            <a
              href="/"
              className={styles.card}
            >
              <h2>BROCCOLIGÅRDEN &rarr;</h2>
              <p>
                Instantly deploy your Next.js site to a public URL with Vercel.
              </p>
            </a>

            <a
              href="/abput"
              className={styles.card}
            >
              <h2>HISTORIA &rarr;</h2>
              <p>
                Instantly deploy your Next.js site to a public URL with Vercel.
              </p>
            </a>
          </div>

        </div>
        

      </main>
    </Layout>
  );
}
