import Image from "next/image";
import { HiXMark } from "react-icons/hi2";
import AOS from "aos";
import "aos/dist/aos.css";

import { useEffect } from "react";
import Cardsection from "./cardsection";

const Page = ({
  authentication,
  page,
  redirect,
  buttonName,
  children,
  image,
  cardTitle,
}) => {
  let admin = {};
  const popHide = "pop-hide";

  if (authentication) {
    const XMark = () => {
      return (
        <HiXMark
          style={{ cursor: "pointer" }}
          onClick={function () {
            document.getElementById("popup").classList.add(popHide);
            document.getElementById("createCard").classList.add(popHide);
            document.getElementById("modifyCard").classList.add(popHide);
            document.getElementById("modifyPage").classList.add(popHide);
          }}
        />
      );
    };
    admin = {
      background: (
        <div
          id="popup"
          className={`popup ${popHide}`}
          onClick={function () {
            document.getElementById("popup").classList.add(popHide);
            document.getElementById("createCard").classList.add(popHide);
            document.getElementById("modifyCard").classList.add(popHide);
            document.getElementById("modifyPage").classList.add(popHide);
          }}
        ></div>
      ),
      createCard: (
        <div className="flex justify-center">
          <div id="createCard" className={`window-pop ${popHide}`}>
            <div className="z-40 fixed w-screen px-2 md:inset-1/4 md:w-2/4 top-40 h-screen ">
              <div className="bg-secondary-1  flex flex-col gap-4 text-left text-color-base overflow-y-scroll h-2/3 md:h-2/4 ">
                <div className="sticky top-0 flex flex-row justify-between bg-secondary-d1 ">
                  <h1 className="p-5"> Skapa kort</h1>
                  <button className="uppercase font-bold hover:bg-secondary-1 bg-secondary-d1 p-5 ">
                    <XMark />
                  </button>
                </div>
                <form action="../../api/admin/createCard" method="POST">
                  <div className="flex flex-col gap-2 px-2 pb-2 md:px-5 md:pb-5">
                    <input
                      className="title p-2 rounded"
                      type="text"
                      name="title"
                      placeholder="Rubrik"
                    />
                    <textarea
                      className="description p-2  rounded "
                      rows="3"
                      name="description"
                      placeholder="Text"
                    ></textarea>
                    <input
                      className="requirements p-2 rounded"
                      type="text"
                      name="requirements"
                      placeholder="Requirements"
                    />
                    <input
                      className="location  p-2 rounded"
                      type="text"
                      name="location"
                      placeholder="Location"
                    />
                    <div className="flex flex-row gap-2 ">
                      <div className="flex flex-col w-full">
                        <label>Startdatum</label>
                        <input
                          className="startdate  p-2 rounded"
                          type="date"
                          name="startdate"
                          placeholder="Startdate"
                        />
                      </div>
                      <div className="flex flex-col w-full">
                        <label>Slutdatum</label>
                        <input
                          className="enddate  p-2 rounded"
                          type="date"
                          name="enddate"
                          placeholder="Enddate"
                        />
                      </div>
                    </div>

                    <input
                      className="contact  p-2 rounded"
                      type="text"
                      name="contact"
                      placeholder="Contact"
                    />
                    <input
                      className="exjobbare  p-2 rounded"
                      type="text"
                      name="exjobbare"
                      placeholder="Exjobbare"
                    />
                    <input type="hidden" name="pageId" value={page.id} />
                    <input type="hidden" name="redirect" value={redirect} />
                    <button
                      className="shadow btn btn-create"
                      id="createCardSubmit"
                      type="submit"
                    >
                      Skapa
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      ),
      modifyCard: (
        <div className="flex justify-center">
          <div id="modifyCard" className={`window-pop ${popHide}`}>
            <div className="z-40 fixed w-screen px-2 md:inset-1/4 md:w-2/4 top-40 h-screen ">
              <div className="bg-secondary-1  flex flex-col gap-4 text-left text-color-base overflow-y-scroll h-2/3 md:h-2/4 ">
                <div className="sticky top-0 flex flex-row justify-between bg-secondary-d1 ">
                  <h1 className="p-5"> Skapa kort</h1>
                  <button className="uppercase font-bold hover:bg-secondary-1 bg-secondary-d1 p-5 ">
                    <XMark />
                  </button>
                </div>
                <div className="flex flex-col gap-2 w-full px-2 pb-2 md:px-5 md:pb-5">
                  <form action="../../api/admin/modifyCard" method="POST">
                    <div className="flex flex-col gap-2 ">
                      <input className="id p-2" type="hidden" name="id" />

                      <input
                        className="title p-2 rounded"
                        type="text"
                        name="title"
                        placeholder="Rubrik"
                      />
                      <textarea
                        className="description p-2  rounded "
                        rows="3"
                        name="description"
                        placeholder="Text"
                      ></textarea>
                      <input
                        className="requirements p-2 rounded"
                        type="text"
                        name="requirements"
                        placeholder="Requirements"
                      />
                      <input
                        className="location  p-2 rounded"
                        type="text"
                        name="location"
                        placeholder="Location"
                      />
                      <div className="flex flex-col md:flex-row gap-2 ">
                        <div className="flex flex-col w-full">
                          <label>Startdatum</label>
                          <input
                            className="startdate  p-2 rounded"
                            type="date"
                            name="startdate"
                            placeholder="Startdate"
                          />
                        </div>
                        <div className="flex flex-col w-full">
                          <label>Slutdatum</label>
                          <input
                            className="enddate  p-2 rounded"
                            type="date"
                            name="enddate"
                            placeholder="Enddate"
                          />
                        </div>
                      </div>

                      <input
                        className="contact  p-2 rounded"
                        type="text"
                        name="contact"
                        placeholder="Contact"
                      />
                      <input
                        className="exjobbare  p-2 rounded"
                        type="text"
                        name="exjobbare"
                        placeholder="Exjobbare"
                      />
                      <input type="hidden" name="redirect" value={redirect} />
                    </div>

                    <button
                      className="shadow btn btn-modify w-full mt-2"
                      type="submit"
                    >
                      Ändra kort
                    </button>
                  </form>
                  <form action="../../api/admin/deleteCard" method="POST">
                    <input className="id" type="hidden" name="id" />
                    <input type="hidden" name="redirect" value={redirect} />
                    <button className="btn btn-delete w-full" type="submit">
                      Radera kort
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
      modifyPage: (
        <div className="flex justify-center">
          <div id="modifyPage" className={`window-pop ${popHide}`}>
            <div className="relative bg-fill  p-5 m-2 ">
              <div className=" flex flex-row justify-between">
                <h1> Ändra sida</h1>
                <button
                  type=""
                  onClick={function () {
                    document.getElementById("popup").classList.add(popHide);
                    document
                      .getElementById("modifyPage")
                      .classList.add(popHide);
                  }}
                >
                  <div className="absolute top-0 right-0 p-3 hover:text-muted">
                    <XMark />
                  </div>
                </button>
              </div>
              <div className="flex flex-col gap-2 w-full">
                <form action="../../api/admin/modifyPage" method="POST">
                  <div className="flex flex-col gap-2 py-2">
                    <input
                      className="title"
                      type="text"
                      name="title"
                      placeholder="Rubrik"
                      defaultValue={page.title}
                    />
                    <input
                      className="description"
                      type="text"
                      name="description"
                      placeholder="Text"
                      defaultValue={page.description}
                    />
                    <input type="hidden" name="redirect" value={redirect} />
                    <input type="hidden" name="id" value={page.id} />
                    <input type="hidden" name="file" value={redirect} />
                    <input
                      className="form-control block w-full px-3 py-1.5 text-base font-normal text-muted  bg-clip-padding border border-solid border-border rounded transition ease-in-out m-0 focus:text-muted focus:bg-fill focus:border-secondary focus:outline-none"
                      type="file"
                      id="modifyFormFile"
                      name="file"
                    />
                  </div>
                  <button
                    className="shadow btn btn-modify w-full"
                    type="submit"
                  >
                    Ändra sida
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      ),
      editPage: (
        <button
          onClick={function () {
            if (authentication) {
              let background = document.getElementById("popup");
              let modifyPage = document.getElementById("modifyPage");
              background.classList.remove(popHide);
              modifyPage.getElementsByClassName("title")[0].value = page.title;
              modifyPage.getElementsByClassName("description")[0].value =
                page.description;
              modifyPage.classList.remove(popHide);
            }
          }}
          className="fixed top-20 left-0 z-30 btn btn-primary border border-base"
        >
          Edit page
        </button>
      ),
    };
  }
  useEffect(() => {
    AOS.init({ duration: 2500 });
  }, []);
  return (
    <>
      {admin.background}
      {admin.createCard}
      {admin.modifyCard}
      {admin.modifyPage}
      {admin.editPage}
      <section className="bg-secondary-1 relative ">
        <div className="relative  h-[48rem] lg:h-screen portrait:h-full">
          <svg
            className="fill-secondary-l1 absolute z-0 right-0 -top-5 h-auto lg:w-2/3  "
            width="818"
            height="895"
            viewBox="0 0 818 902"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M534.272 107.464C596.13 86.8846 907.955 -202.635 910 264.601L882.508 902C850.132 873.966 662.57 742.65 591.548 724.945C551.663 715.002 393.847 700.6 350.99 631.991C300.995 551.954 133.889 604.204 62.3215 543.463C-9.24652 482.722 -5.44305 380.548 7.33691 322.144C20.1169 263.739 28.9997 166.852 85.2317 131.809C130.217 103.775 215.82 149.515 318.916 149.515C422.012 149.515 472.415 128.043 534.272 107.464Z" />
          </svg>
          <div className="flex flex-col lg:flex-row ">
            <div className=" z-20 grid  grid-flow-col    pt-16 p-4 md:p-12 md:pt-32 lg:pt-48 xl:pt-60">
              <div className=" flex flex-col gap-8  text-center md:text-left text-color-base dark:text-color-base">
                <h1 className="  pb-0 md:pb-2 font-bold uppercase h3 sm:h1  lg:text-7xl ">
                  {page.title}
                </h1>
                <h4 className=" font-small max-w-prose md:text-left lg:text-xl ">
                  {page.description}
                </h4>
                <div className="flex justify-center md:justify-start">
                  <a className="btn btn-secondary" href="#linkForm">
                    {buttonName}
                  </a>
                </div>
              </div>
            </div>
            <div className="  w-2/3 place-self-center lg:py-20 portrait:w-full">
              <Image
                alt={""}
                height={"800"}
                width={"1000"}
                className=" "
                src={`/images/${image}.svg`}
              ></Image>
            </div>
          </div>
        </div>
      </section>
      <div className=" ">{children}</div>
      <section className="relative bg-secondary-d1 ">
        <Cardsection
          key={1}
          title={cardTitle}
          authentication={authentication}
          page={page}
        />
      </section>

      <section id="form" className="bg-secondary-1 py-12">
        <div className=" py-12 ">
          <div className="relative">
            <svg
              className="absolute fill-secondary-l1 right-20 lg:left-0 -top-16"
              width="893"
              height="707"
              viewBox="0 0 893 707"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M332.895 622.768C268.046 638.899 -58.8563 865.828 -61 499.602L-32.1784 0C1.76301 21.9736 198.394 124.901 272.85 138.778C314.663 146.572 480.109 157.86 525.039 211.637C577.451 274.371 752.637 233.417 827.665 281.026C902.694 328.636 898.706 408.721 885.308 454.499C871.91 500.278 862.598 576.219 803.647 603.686C756.486 625.66 666.745 589.808 558.664 589.808C450.583 589.808 397.743 606.638 332.895 622.768Z" />
            </svg>
          </div>
        </div>
      </section>
    </>
  );
};

export default Page;
