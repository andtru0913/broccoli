import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import Layout from '../components/layout';

export const getStaticProps = async () => {

  const url = `https://graph.instagram.com/me/media?fields=id,caption,media_url,timestamp,media_type,permalink&access_token=${process.env.INSTAGRAM_KEY}`;
  const data = await fetch(url);
  const feed = await data.json();
  console.log(feed)
  return{
    props: {
      feed
    }
  }
} 

export default function Home({feed}) {
  const insta_images = feed.data;
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

        <div className={styles.pages}>

          <div className={styles.grid}>
            <Link href="/carreer">
              <a  className={styles.card}>
                <h2>KARRIÄR</h2>
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


        <div className={styles.instafeed}>
          {insta_images && insta_images.map(image =>(
            <div key={image.id}><img src={image.media_url} alt={image.caption} /></div>
          ))}

        </div>
        

      </main>
    </Layout>
  );
}
