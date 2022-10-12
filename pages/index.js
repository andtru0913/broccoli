import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import Layout from '../components/layout';
import Carousel from '../components/carousel';

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
      <main className=" flex flex-1 flex-col justify-center align-middle">
      <section className='flex'>
          <div className="w-80 ml-16 mt-60 bg-black bg-opacity-50 p-5 rounded-lg">
                <h1 className="text-amethyst text-6xl leading-tight mb-3"> BROCCOLI </h1>
                <p className='text-slate-200 text-xs text-wrap leading-tight'> Broccoli är ett ingenjörsbolag inom hårdvaru- och mjukvaruutveckling, och då främst inbyggda system. Vi fokuserar på konsulter som är vår huvudgren där vi hjälper våra kunder att utveckla spännande teknik, och utbildning eftersom det är roligt att sprida kunskap om det vi brinner för. </p>
            </div>

            <div className=" w-full h-96 bg-cover bg-center -z-10 ">
            
            <Image 
                src="/images/gothenburg.jfif"
                layout="fill"
                objectFit='cover'
                alt="Siluette of Gothenburg"
                />
            </div>

        </section>





        <section className="">

          <div className="grid grid-flow min-w-fit lg:grid-cols-3  md:grid-cols-2 gap-4 lg:px-40 ">
            <Link href="/carreer">
              <a  className=" m-4 p-6 text-left bg-slate-400 rounded-xl transition-all duration-150 ease-in-out hover:scale-105 hover:text-slate-50 shadow-gray-500 shadow-md">
                <h2 className="text-2xl mb-4">KARRIÄR</h2>
                <p className="text-xl leading-5">Find in-depth information about Next.js features and API.</p>
              </a>
            </Link>

            <Link href="/carreer">
              <a  className="basis-1/3 m-4 p-6 text-left bg-slate-400 rounded-xl transition-all duration-150 ease-in-out hover:scale-105 hover:text-slate-50 shadow-gray-500 shadow-md">
                <h2 className="text-2xl mb-4">UNDERKONSULT</h2>
                <p className="text-xl leading-5">Find in-depth information about Next.js features and API.</p>
              </a>
            </Link>

            <Link href="/carreer">
              <a  className="basis-1/3 m-4 p-6 text-left bg-slate-400 rounded-xl transition-all duration-150 ease-in-out hover:scale-105 hover:text-slate-50 shadow-gray-500 shadow-md">
                <h2 className="text-2xl mb-4">TJÄNSTER</h2>
                <p className="text-xl leading-5">Find in-depth information about Next.js features and API.</p>
              </a>
            </Link>

            <Link href="/carreer">
              <a  className="basis-1/3 m-4 p-6 text-left bg-slate-400 rounded-xl transition-all duration-150 ease-in-out hover:scale-105 hover:text-slate-50 shadow-gray-500 shadow-md">
                <h2 className="text-2xl mb-4">ATT JOBBA HOS BROCCOLI</h2>
                <p className="text-xl leading-5">Find in-depth information about Next.js features and API.</p>
              </a>
            </Link>

            <Link href="/carreer">
              <a  className="basis-1/3 m-4 p-6 text-left bg-slate-400 rounded-xl transition-all duration-150 ease-in-out hover:scale-105 hover:text-slate-50 shadow-gray-500 shadow-md">
                <h2 className="text-2xl mb-4">BROCCOLIGÅRDEN</h2>
                <p className="text-xl leading-5">Find in-depth information about Next.js features and API.</p>
              </a>
            </Link>

            <Link href="/carreer">
              <a  className="basis-1/3 m-4 p-6 text-left bg-slate-400 rounded-xl transition-all duration-150 ease-in-out hover:scale-105 hover:text-slate-50 shadow-gray-500 shadow-md">
                <h2 className="text-2xl mb-4">HISTORIA</h2>
                <p className="text-xl leading-5">Find in-depth information about Next.js features and API.</p>
              </a>
            </Link>

          </div>

        </section>


          

        <div className="flex align-middle justify-center flex-nowrap bg-theme-green py-10">
          {insta_images && insta_images.slice(0, 6).map(image =>(
            
            <div className="my-8 mx-4" key={image.id}>
              <img 
                className="shadow-gray-600 shadow-md" 
                src={image.media_url} 
                alt={image.caption} 
              />
              <div className="text-center px-6 py-5 text-xs break-words">
                <p className=' text-xs h-8 text-ellipsis overflow-clip'> {image.caption} </p>
              </div>
              
            </div>
            

          ))}

        </div>


        {/**<div className={styles.insta__feed}>
          {insta_images && insta_images.map(image =>(
            <div className={styles.insta__post} key={image.id}>
              <img 
                className={styles.insta__image} 
                src={image.media_url} 
                alt={image.caption} 
              />
              
            </div>
          ))}

        </div> */}

      
        

      </main>
    </Layout>
  );
}
