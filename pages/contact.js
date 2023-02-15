import Layout from "../components/layout/layout";

export default function Contact() {
  return (
    <Layout>
      <section className=" bg-secondary-1 text-center text-base overflow-hidden cursor-default">
        <h1 className="  lg:pt-24 uppercase font-bold p-5 pt-12 md:pt-16 ">
          Kontakta oss
        </h1>
        <div className="  grid grid-cols-1 col-end-2 md:grid-cols-2 justify-center cursor-default">
          <div className="relative ">
            <div className="flex w-full h-full justify-center z-10  ">
              <img
                className=" object-cover z-10"
                src="/images/broccoli-kontor.jpg"
              />
            </div>
          </div>
          <div className="relative">
            <svg
              className="absolute overflow-clip fill-secondary-l1 right-0 w-11/12"
              width="645"
              height="501"
              viewBox="0 0 645 501"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M497.871 68.9819C555.514 55.7719 846.095 -130.073 848 169.849L822.381 579C792.211 561.005 617.427 476.712 551.245 465.347C514.078 458.964 367.014 449.72 327.077 405.679C280.488 354.303 124.767 387.842 58.0754 348.853C-8.61652 309.863 -5.0722 244.276 6.83704 206.786C18.7463 169.296 27.0239 107.103 79.4247 84.6092C121.345 66.6139 201.116 95.9745 297.188 95.9745C393.26 95.9745 440.228 82.192 497.871 68.9819Z" />
            </svg>

            <div className="  flex  flex-col bg-secondary-1 bg-opacity-80 p-4 justify-center md:px-8 z-20 h-full overflow-hidden ">
              <h3 className=" flex self-start px-8 pb-6 uppercase font-bold z-10">
                Broccoli Engineering AB
              </h3>

              <div className=" flex flex-col gap-4 px-8 pb-10 z-10">
                <a className="" href="tel:031-151480">
                  <div className=" hover:text-secondary-d1 flex flex-row gap-4 items-center  ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 lg:w-8 h-4 lg:h-8 xl:w-12 xl:h-12"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                      />
                    </svg>

                    <h5 className=" ">031-151480</h5>
                  </div>
                </a>
                <a className="" href="mailto:engineering@broccoli.se">
                  <div className=" hover:text-secondary-d1  flex   flex-row gap-4 items-center flex-auto">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 lg:w-8 h-4 lg:h-8 xl:w-12 xl:h-12"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                      />
                    </svg>

                    <h5 className="">engineering@broccoli.se</h5>
                  </div>
                </a>
                <a className="" href="https://goo.gl/maps/p9sa1f82ZyN3FdAH9">
                  <div className=" hover:text-secondary-d1 flex flex-row gap-4 items-center  ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 lg:w-8 h-4 lg:h-8 xl:w-12 xl:h-12"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                      />
                    </svg>

                    <h5 className="text-left ">
                      Tillgängligheten 3, 417 10 Göteborg
                    </h5>
                  </div>
                </a>
              </div>
            </div>
          </div>
          <div className="relative rounded md:col-span-2 z-20 ">
            <div className="mapouter relative text-right ">
              <div className="gmap_canvas overflow-hidden bg-none  ">
                <iframe
                  className="w-full h-96"
                  id="gmap_canvas"
                  href="https://goo.gl/maps/p9sa1f82ZyN3FdAH9"
                  src="https://maps.google.com/maps?q=Tillg%C3%A4ngligheten%203,%20417%2001%20G%C3%B6teborg&t=&z=13&ie=UTF8&iwloc=&output=embed"
                  frameborder="0"
                  scrolling="no"
                  marginheight="0"
                  marginwidth="0"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
