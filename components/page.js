import popupStyles from "./popup.module.css";
import Form from "./form";
import Card from "./card";
import { FileAdder } from "./FileAdder";
import Image from "next/image";

const Page = ({ authentication, page, redirect, formTitle, children}) => {
  let popup = {};
  if (authentication === null) {
    const file = new FileAdder();
    popup = {
      background: (
        <div
          id="popup"
          className={`${popupStyles.popUp} ${popupStyles.hide}`}
          onClick={function () {
            document.getElementById("popup").classList.add(popupStyles.hide);
            document
              .getElementById("createCard")
              .classList.add(popupStyles.hide);
            document
              .getElementById("modifyCard")
              .classList.add(popupStyles.hide);
            document
              .getElementById("modifyPage")
              .classList.add(popupStyles.hide);
          }}
        ></div>
      ),
      button: (
        <Card
          title="Nytt Kort"
          click={function () {
            document.getElementById("popup").classList.remove(popupStyles.hide);
            document
              .getElementById("createCard")
              .classList.remove(popupStyles.hide);
          }}
        />
      ),
      createCard: (
        <div
          id="createCard"
          className={`${popupStyles.window}  ${popupStyles.hide}`}
        >
          <h1> Skapa kort</h1>
          <form action="../../api/createCard" method="POST">
            <input type="text" name="title" placeholder="Rubrik" />
            <input type="text" name="description" placeholder="Text" />
            <input type="hidden" name="pageId" value={page.id} />
            <input type="hidden" name="redirect" value={redirect} />
            <input
              className={
                "form-control block w-full px-3 py-1.5 text-base font-normal text-muted  bg-clip-padding border border-solid  rounded transition ease-in-out m-0 focus:text-muted focus:bg-fill focus:border-secondary focus:outline-none"
              }
              id={"createCardFile"}
              type="file"
              name="myImage"
              onChange={file.uploadToClient}
            />
            <button
              onClick={function () {
                file
                  .uploadToServer(
                    `cards/${
                      document.getElementById("createCardFile").files[0].name
                    }`
                  )
                  .then((_) => {});
              }}
              id="createCardSubmit"
              type="submit"
            >
              {" "}
              Skapa{" "}
            </button>
          </form>
        </div>
      ),
      modifyCard: (
        <div
          id="modifyCard"
          className={`${popupStyles.window} ${popupStyles.hide}`}
        >
          <h1> Ändra kort</h1>
          <form action="../../api/modifyCard" method="POST">
            <input className="id" type="hidden" name="id" />
            <input
              className="title"
              type="text"
              name="title"
              placeholder="Rubrik"
            />
            <input
              className="description"
              type="text"
              name="description"
              placeholder="Text"
            />

            <input
              className="form-control block w-full px-3 py-1.5 text-base font-normal text-muted  bg-clip-padding border border-solid border-border rounded transition ease-in-out m-0 focus:text-muted focus:bg-fill focus:border-secondary focus:outline-none"
              type="file"
              id="modifyFormFile"
              name="myImage"
              onChange={async function (event) {
                file.uploadToClient(event);
              }}
            />
            <input type="hidden" name="filename" value={redirect} />
            <input type="hidden" name="redirect" value={redirect} />
            <button
              onClick={function () {
                file
                  .uploadToServer(
                    `cards/${
                      document.getElementById("modifyFormFile").files[0].name
                    }`
                  )
                  .then((_) => {});
              }}
              type="submit"
              id="modifyCardSubmit"
            >
              {" "}
              Ändra kort
            </button>
          </form>
          <form action="../../api/deleteCard" method="POST">
            <input className="id" type="hidden" name="id" />
            <input type="hidden" name="redirect" value={redirect} />
            <button type="submit"> Radera kort</button>
          </form>
        </div>
      ),
      modifyPage: (
        <div
          id="modifyPage"
          className={`${popupStyles.window} ${popupStyles.hide}`}
        >
          <h1> Ändra sida</h1>
          <form action="../../api/modifyPage" method="POST">
            <input
              className="title"
              type="text"
              name="title"
              placeholder="Rubrik"
            />
            <input
              className="description"
              type="text"
              name="description"
              placeholder="Text"
            />
            <input type="hidden" name="redirect" value={redirect} />
            <input type="hidden" name="id" value={page.id} />
            <button type="submit"> Ändra sida</button>
          </form>
        </div>
      ),
    };
  }
  return (
    <>
      {popup.background}
      {popup.createCard}
      {popup.modifyCard}
      {popup.modifyPage}
      <section
        className="bg-fill relative"
        onClick={function () {
          if (authentication === null) {
            let background = document.getElementById("popup");
            let modifyPage = document.getElementById("modifyPage");
            background.classList.remove(popupStyles.hide);
            modifyPage.getElementsByClassName("title")[0].value = page.title;
            modifyPage.getElementsByClassName("description")[0].value =
              page.description;
            modifyPage.classList.remove(popupStyles.hide);
          }
        }}
      >
          <svg className=" absolute z-10 right-0 -top-16 w-2/3  h-auto max-h- " width="818" height="895" viewBox="0 0 818 902" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M534.272 107.464C596.13 86.8846 907.955 -202.635 910 264.601L882.508 902C850.132 873.966 662.57 742.65 591.548 724.945C551.663 715.002 393.847 700.6 350.99 631.991C300.995 551.954 133.889 604.204 62.3215 543.463C-9.24652 482.722 -5.44305 380.548 7.33691 322.144C20.1169 263.739 28.9997 166.852 85.2317 131.809C130.217 103.775 215.82 149.515 318.916 149.515C422.012 149.515 472.415 128.043 534.272 107.464Z" fill="#E97AEB" fill-opacity="0.38"/>
          </svg>
          <div className="relative overflow-hidden h-screen bg-center ">
            <Image
              src="/images/gothenburg.jfif"
              layout="fill"
              objectFit="cover"
              alt="Siluette of Gothenburg"
            />


            
          </div>
          <div className="absolute right-0 bottom-0 z-10  py-12 text-base  max-w-prose">
          <h1 className="pb-8"> {page.title}</h1>
          <h2> {page.description}</h2>
        </div>
        
      </section>

      <section className="bg-fill  ">
        <div className=" layout py-12 md:w-1/2">
          <div className="grid md:grid-cols-2  md:gap-12 ">
            {page.cards.map((card) => (
              <Card
                key={card.id}
                title={card.title}
                text={card.description}
                image={`./uploads/cards/${card.image}`}
                click={function () {
                  if (authentication === null) {
                    let background = document.getElementById("popup");
                    let modifyCard = document.getElementById("modifyCard");
                    background.classList.remove(popupStyles.hide);
                    modifyCard.getElementsByClassName("id")[0].value = card.id;
                    modifyCard.getElementsByClassName("id")[1].value = card.id;
                    modifyCard.getElementsByClassName("title")[0].value =
                      card.title;
                    modifyCard.getElementsByClassName("description")[0].value =
                      card.description;
                    modifyCard.classList.remove(popupStyles.hide);
                  }
                }}
              />
            ))}
            {popup.button}
          </div>
        </div>
      </section>
      {children}

      <section id="form" className="bg-secondary-1">
        <div className="layout py-12 md:w-1/2">
          <form method="POST" action="./api/send_email">
            <Form title={formTitle} />
          </form>
        </div>
      </section>
    </>
  );
};

export default Page;
