import Image from 'next/image'
import Layout from '../components/layout/layout';





import Accordion from '../components/accordion';

export const getStaticProps = async () => {
  const url = `https://graph.instagram.com/me/media?fields=id,caption,media_url,timestamp,media_type,permalink&access_token=${process.env.INSTAGRAM_KEY}`;
  const data = await fetch(url);
  const feed = await data.json();




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
      <main>
        <header className="  ">

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

            />
            <div className="absolute left-0 bottom-40 p-6 w-1/3 h-1/3 opacity-60 bg-black"></div>
            <div className='absolute left-0 bottom-40 p-6 w-1/3 h-1/3  '>
              <p className='text-white text-2xl text-center p-5'> BROCCOLI </p>
            </div>

            */}
          </div>
        </header>


        <section className=''>

          <div className='layout py-12  flex flex-col justify-center'>

            <div className='py-2 md:p-4 text-center'>
              <h2>ATT JOBBA HOS BROCCOLI</h2>
            </div>

            <div className='  flex flex-col md:items-center'>


              <Accordion />



            </div>

          </div>



        </section>

        <section className=" py-12 theme-test text-center">
          <h2 className=' '>Våra kärnvärden</h2>
          <div className="layout grid grid-flow min-w-fit py-12 lg:grid-cols-3 gap-4 md:gap-12 lg:px-40 cursor-default">

            <div className='relative  rounded flex flex-1 '>
              <div className='flex w-full h-full justify-center   z-10 '>
                <img className=" object-cover" src='/images/underkonsult.jpg' />
              </div>
              <div className='absolute top-0 flex flex-col flex-1  bg-skin-first bg-opacity-80 p-4 z-20 h-full'>
                <h3 className='py-2'>RELATIONER</h3>

                <p className=''>
                  På Broccoli arbetar vi inkluderande, visar ömsesidig respekt och bjuder aktivt in berörda i dialogen. Genom våra olikheter bygger vi en stark gemenskap. Vi eftersträvar olikheter då det stärker oss som grupp och utvecklar oss som individer. Vi lär oss även kontinuerligt genom kunskapsdelning och inspiration av varandra vilket leder till vår trevliga företagskultur.
                </p>
              </div>

            </div>
            <div className='relative flex flex-col flex-1  rounded '>
            <div className='flex w-full h-full justify-center   z-10 '>
                <img className=" object-cover" src='/images/underkonsult.jpg' />
              </div>
              <div className='absolute top-0 flex flex-col flex-1 bg-skin-sec bg-opacity-80 p-4 z-20 h-full'>
              <h3 className='py-2'>PROFESSIONALISM</h3>

              <p>
                Nöjda kunder får vi genom att prioritera god teknisk kompetens och kvalitet samt genom att vara lyhörda till behoven. Vi är den pålitliga partnern med goda ambitioner och fokus på att garantera en bra leverans. Kontinuerlig utveckling genom feedback, erfarenhet och utbildning leder till arbetsglädje, nätverkande och ett högt engamenang.
              </p>
            </div>
            </div>
            <div className='relative flex flex-col flex-1  rounded '>
            <div className='flex w-full h-full justify-center   z-10 '>
                <img className=" object-cover" src='/images/underkonsult.jpg' />
              </div>
              <div className='absolute top-0 flex flex-col flex-1 bg-skin-third bg-opacity-80 p-4 z-20 h-full'>
              <h3 className='py-2'>HÅLLBAR UTVECKLING</h3>

              <p>
                Vi värderar hållbarhet genom ekonomiskt sinne samt personlig och teknisk utveckling. Vi gör medvetna val för en långsiktig utveckling vilket ger oss trygghet, frihet och en känsla av att vi tillsammans bidrar till det bättre.
              </p>
            </div>
            </div>
          </div>

        </section>


        <section className="">


          <div className="layout  py-12">

            <h1 className="  text-center md:ml-12 md:text-left"> FÖLJ OSS PÅ INSTAGRAM  </h1>
            <a className='text-white hover:opacity-50' href='https://www.instagram.com/broccoliengineering/'> <p className=" text-center md:ml-12 md:text-left">@broccoliengineering</p>  </a>
            <div className=" flex flex-1 align-middle justify-center flex-col md:flex-row">

              {insta_images && insta_images.slice(0, 4).map(image => (

                <div className=" relative basis-1/5 bg-slate-500 m-5 shadow-lg shadow-zinc-700" key={image.id}>

<a href={image.permalink}>
                  <img
                    className="overflow-hidden bg-cover bg-center w-full h-full transition-all ease-in-out hover:scale-105"
                    src={image.media_url}
                    alt="instagram img"
                  />
                  <div className="absolute right-0 top-0  p-3">

                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" color='white' viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 hover:scale-105">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                      </svg>



                  </div> </a>
                  {/**
              <div className="absolute left-1/2 bottom-0 -translate-x-1/2 p-6 w-full bg-zinc-600 opacity-60"></div>
              <p className="absolute text-xs bottom-4 left-1/2 -translate-x-1/2 text-white"> inlägg.. </p>
              */}

                </div>


              ))}
            </div>
          </div>

        </section>





      </main>
    </Layout>
  );
}