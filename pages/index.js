import Image from 'next/image'
import Link from 'next/link'
import Card from '../components/card';
import Layout from '../components/layout/layout';
import menu_list from "../components/navbar/navmenuList"
import styles from '../styles/Home.module.css'

export const getStaticProps = async () => {
  const url = `https://graph.instagram.com/me/media?fields=id,caption,media_url,timestamp,media_type,permalink&access_token=${process.env.INSTAGRAM_KEY}`;
  const data = await fetch(url);
  const feed = await data.json();

  console.log(feed)
  return {
    props: {
      feed,
    }
  }
}

export default function Home({ feed, }) {
  const insta_images = feed.data;
  return (
    <Layout>
      <main className=" flex flex-1 flex-col justify-center align-middle bg-theme-green">
        <header className="">

        <div className=" overflow-hidden h-screen bg-center">
          
          <Image 
              src="/images/gothenburg.jfif"
              layout="fill"
              objectFit='cover'
              alt="Siluette of Gothenburg"
            />
        </div>
          <div className='relative overflow-hidden'>
            

            {/** 
             * 
             * <Image
              src="/images/gothenburg.jfif"
              alt="Siluette of Gothenburg"
              width={100}
              height={100}
              layout="responsive"
              object-fit="cover"

            />
            <div className="absolute left-0 bottom-40 p-6 w-1/3 h-1/3 opacity-60 bg-black"></div>
            <div className='absolute left-0 bottom-40 p-6 w-1/3 h-1/3  '>
              <p className='text-white text-2xl text-center p-5'> BROCCOLI </p>
            </div>

            */}
          </div>
        </header>





        <section className="">

          <div className="grid grid-flow min-w-fit bg-theme-green py-12 lg:grid-cols-3  md:grid-cols-2 gap-4 md:gap-12 lg:px-40 ">

            {
              menu_list.map((menu, idx) => (
                menu.tag ?
                  <Card href={menu.href} title={menu.text} icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-4">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
                  </svg>} />
                  : ""
              ))}
            <Card href={"/carreer"} image="/images/karriär.jpg" />
            <Card href={"/carreer"} icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-4">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
            </svg>} />



          </div>

        </section>

        <div className="bg-beige-1  py-12">

          <h1 className=" p-5 text-2xl text-center md:ml-12 md:text-left 2xl:text-6xl"> FÖLJ OSS PÅ INSTAGRAM  <a className='text-white hover:opacity-50' href='https://www.instagram.com/broccoliengineering/'> @broccoliengineering </a></h1>
          <div className=" flex flex-1 align-middle justify-center flex-col md:flex-row">

            {insta_images && insta_images.slice(0, 4).map(image => (

              <div className=" relative basis-1/5 bg-slate-500 m-5 shadow-lg shadow-zinc-700" key={image.id}>


                <img
                  className="overflow-hidden bg-cover bg-center w-full h-full transition-all ease-in-out hover:scale-105"
                  src={image.media_url}

                />
                <div className="absolute right-0 top-0  p-3">
                  <a href={image.permalink}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" color='white' viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 hover:scale-105">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                    </svg>
                  </a>


                </div>
                {/**
                        <div className="absolute left-1/2 bottom-0 -translate-x-1/2 p-6 w-full bg-zinc-600 opacity-60"></div>
                        <p className="absolute text-xs bottom-4 left-1/2 -translate-x-1/2 text-white"> inlägg.. </p>
                        */}

              </div>


            ))}
          </div>
        </div>




      </main>
    </Layout>
  );
}
