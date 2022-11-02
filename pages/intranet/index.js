import Head from 'next/head'
import * as Database from "../../Database";
import styles from "../../styles/Home.module.css";
import formStyles from "./form.module.css"

export async function getServerSideProps(context) {
    let cookies = JSON.parse(context.req.cookies['user'] || null)
    let user = await Database.getUserinfo(cookies)
    let groups = await Database.getAllLunchGroups()
    let lunchgroups = []
    groups.slice(1).map((data) => {
        let people = []
        data.users.map((usr) => {
            let fullName = usr.firstname + usr.lastname
            people.push(fullName)

        })
        let object = { title: data.title, people: people }
        lunchgroups.push(object)
    })

    return {

        props: {
            user: user,
            lunchgroups: lunchgroups

        }
    }
}

export default function Home({ user, lunchgroups }) {
    if (user === null) {
        return (


            <main className=''>


                <div className=" mx-auto bg-gray-500 w-screen h-screen p-4 relative">

                    <Image
                        src="/images/gothenburg.jfif"
                        layout="fill"
                        objectFit='cover'
                        alt="Siluette of Gothenburg"
                        className='w-full h-auto'
                    />
                    <div className=" w-1/2  absolute top-0 left-1/4 flex justify-center lg:justify-start p-4 lg:left-0"><img
                        className=" h-8  sm:h-10"
                        src="/images/BroccoliBlack.png"
                    /></div>


                    <div className=" layout md:left-1/4 md:w-1/2 absolute top-1/4  shadow-lg rounded-md lg:rounded-3xl py-4 lg:py-12 bg-white bg-opacity-70 lg:w-1/3 lg:left-1/3">
                        <div className='flex flex-1 justify-center flex-col items-center  ' >


                            <h1>
                                Logga in
                            </h1>
                            <form className="flex flex-col flex-1 lg:py-12 w-full lg:w-auto" action="../../api/login" method="POST">


                                <input className='p-4 text-2xl lg:text-base lg:p-2 m-2 border border-zinc-200 appearance-none  rounded-md  shadow leading-tight focus:outline focus:outline-offset-1 focus:outline-2 focus:outline-purple-1 autofill:bg-theme-green autofill:focus:bg-black' type="text" name="username" placeholder="Användarnamn" />

                                <input className='p-4 text-2xl lg:text-base lg:p-2 m-2 border border-zinc-200 appearance-none  rounded-md  shadow leading-tight focus:outline focus:outline-offset-1 focus:outline-2 focus:outline-purple-1 autofill:bg-theme-green autofill:focus:bg-black' type="password" name="password" placeholder="Lösenord" />
                                <button className="shadow bg-purple-3 hover:bg-purple-2 focus:shadow-outline focus:outline-none text-white font-semibold p-2 m-2  rounded" type="submit">Log in</button>
                            </form>
                        </div>
                    </div>
                </div>



            </main>




        )
    } else {
        return (

            <LayoutIntranet>
                <main className=''>

                    <div className='layout py-12  flex flex-col items-center'>

                        <h1>
                            Welcome {user.firstname}
                        </h1>

                        <section>
                            <div className='flex flex-1 flex-col lg:flex-row justify-center py-12'>
                                <Nyheter />

                                <div className='flex flex-col bg-purple-1 bg-opacity-30 p-4 '>
                                    <h3>Lunchgrupper</h3>
                                    <div className='flex flex-1 flex-wrap flex-row justify-around md:justify-start '>
                                        {lunchfuldata.map((pp) => {
                                            return (
                                                <div className='flex flex-col p-4 lg:p-5'>
                                                    <h4 className='font-semibold'>{pp.title}</h4>
                                                    {pp.people.map((i) => {
                                                        return (

                                                            <p>{i}</p>
                                                        )
                                                    })}

                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                        </section>

                    </div>
                </main>

            </LayoutIntranet>

        )
    }
}
