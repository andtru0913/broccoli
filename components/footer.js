


import Image from 'next/image';
import {  BsInstagram, BsFacebook, BsLinkedin  } from 'react-icons/bs'
import Link from 'next/link';
const Footer = () => {
    return (
        <footer className="py-12 bg-skin-fill">


            <div className='flex flex-1 justify-center cursor-pointer'>
                <div className='flex-col'>
                    <div className='flex justify-center'>
                        <Link href="/">
                            <a>
                                <img
                                    className="h-8 w-auto sm:h-10"
                                    src="/images/BroccoliBlack.png"
                                    alt='Broccoli logo'
                                />
                            </a>

                        </Link>
                    </div>
                    <div className="flex align-middle pt-8 flex-col md:flex-row md:justify-between lg:justify-evenly">

                        <div className=' flex-col px-5 text-center'>
                            <h1 className='pb-2 text-lg  text-skin-base font-bold cursor-default'>Följ oss</h1>
                            <div className="flex flex-row justify-center md:text-left bg-inherit">

                                <a className="p-2 hover:scale-105 ">
                                    <BsInstagram className='fill-skin-button-accent hover:fill-skin-button-accent' size={20} />
                                </a>

                                <a className="p-2 hover:scale-105">
                                    <BsFacebook size={20} />
                                </a>

                                <a className="p-2 hover:scale-105">
                                    <BsLinkedin size={20} />
                                </a>

                            </div>

                        </div>

                        <div className=' flex-col  px-5 '>
                            <h1 className='pb-2 text-lg text-center text-skin-base font-bold cursor-default'>Kontakt</h1>
                            <div className=" flex flex-col items-start md:text-left bg-inherit">

                                
                                <a className='hover:text-skin-muted' href='tel:031-151480'>

                                    <div className='flex flex-row justify-center align-middle md:justify-start py-1'>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                                        </svg>

                                        <p className='text-xs pl-4 '>031-151480</p>
                                    </div>
                                </a>
                                <a className='hover:text-skin-muted' href='mailto:engineering@broccoli.se'>


                                    <div className='flex flex-row justify-center  align-middle  md:justify-start py-1'>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                                        </svg>


                                        <p className='text-xs pl-4 '>engineering@broccoli.se</p>
                                    </div>
                                </a>
                                <a className='hover:text-skin-muted' href='https://goo.gl/maps/p9sa1f82ZyN3FdAH9'>

                                    <div className='flex flex-row justify-center align-middle  md:justify-start py-1' href="">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-4 ">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                                        </svg>


                                        <div className='flex flex-col '>

                                            <p className='text-xs '>Tillgängligheten 3</p>
                                            <p className='text-xs '>417 01 Göteborg</p>
                                        </div>
                                    </div>
                                </a>
                            </div>
                            

                        </div>
                        <div className=' flex-col px-5 text-center'>
                        <h1 className='pb-2 text-lg  text-skin-base font-bold cursor-default'>Medarbetare</h1>
                            <a href='./intranet' className='hover:text-skin-muted py-2'>

                                <p className='text-xs'>Intranät</p>
                            </a>


                            <a href='https://www.broccoli.be/tid/' className='hover:text-skin-muted py-2'>

                                <p className='text-xs'>Tidrapport</p>
                            </a>

                        </div>


                        
                      



                    </div>

                </div>

            </div>




        </footer>
    );
}

export default Footer;