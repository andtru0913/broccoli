import Form from "./form";
import Card from "./card";
import { FileAdder } from "./FileAdder";
import { HiXMark } from "react-icons/hi2";

const Page = ({ authentication, page, redirect }) => {
  let popup = {};
  const popHide = "pop-hide";
  if (authentication === null) {
    const file = new FileAdder();
    popup = {
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
      button: (
        <Card
          title="Nytt Kort"
          click={function () {
            document.getElementById("popup").classList.remove(popHide);
            document.getElementById("createCard").classList.remove(popHide);
          }}
        />
      ),
      createCard: (
        <div className="flex justify-center">
          <div id="createCard" className={`window-pop ${popHide}`}>
            <div className="relative bg-fill rounded p-5 m-2 ">
              <div className=" flex flex-row justify-between">
                <h1> Skapa kort</h1>
                <button
                  type=""
                  onClick={function () {
                    document.getElementById("popup").classList.add(popHide);
                    document
                      .getElementById("createCard")
                      .classList.add(popHide);
                  }}
                >
                  <div className="absolute top-0 right-0 p-3 hover:text-muted">
                    <HiXMark />
                  </div>
                </button>
              </div>
              <form action="../../api/createCard" method="POST">
                <div className="flex flex-col py-4">
                  <input
                    className="p-2 border rounded mb-2"
                    type="text"
                    name="title"
                    placeholder="Rubrik"
                  />
                  <textarea
                    className=" p-2  rounded mb-2"
                    rows="3"
                    type="text"
                    id="description"
                    placeholder="Text"
                  ></textarea>
                  <input type="hidden" name="pageId" value={page.id} />
                  <input type="hidden" name="redirect" value={redirect} />

                  <input
                    className={
                      "form-control mb-2 block w-full px-3 py-1.5 text-base font-normal text-muted  bg-clip-padding border border-solid  rounded transition ease-in-out m-0 focus:text-muted focus:bg-fill focus:border-secondary-1 focus:outline-none"
                    }
                    id={"createCardFile"}
                    type="file"
                    name="myImage"
                    onChange={file.uploadToClient}
                  />
                  <button
                    className="shadow btn btn-create"
                    onClick={function () {
                      file
                        .uploadToServer(
                          `cards/${
                            document.getElementById("createCardFile").files[0]
                              .name
                          }`
                        )
                        .then((_) => {});
                    }}
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
      ),
      modifyCard: (
        <div className="flex justify-center">
          <div id="modifyCard" className={`window-pop ${popHide}`}>
            <div className="relative bg-fill rounded p-5 m-2 ">
              <div className=" flex flex-row justify-between">
                <h1> Ändra kort</h1>
                <button
                  type=""
                  onClick={function () {
                    document.getElementById("popup").classList.add(popHide);
                    document
                      .getElementById("modifyCard")
                      .classList.add(popHide);
                  }}
                >
                  <div className="absolute top-0 right-0 p-3 hover:text-muted">
                    <HiXMark />
                  </div>
                </button>
              </div>
              <div className="flex flex-col gap-2 w-full ">
                <form action="../../api/modifyCard" method="POST">
                  <div className="flex flex-col gap-2 py-2">
                    <input className="id p-2" type="hidden" name="id" />
                    <input
                      className="title p-2 rounded"
                      type="text"
                      name="title"
                      placeholder="Rubrik"
                    />
                    <input
                      className="description  p-2 rounded"
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
                  </div>
                  <button
                    className="shadow btn btn-modify w-full"
                    onClick={function () {
                      file
                        .uploadToServer(
                          `cards/${
                            document.getElementById("modifyFormFile").files[0]
                              .name
                          }`
                        )
                        .then((_) => {});
                    }}
                    type="submit"
                    id="modifyCardSubmit"
                  >
                    Ändra kort
                  </button>
                </form>
                <form action="../../api/deleteCard" method="POST">
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
      ),
      modifyPage: (
        <div id="modifyPage" className={`window-pop ${popHide}`}>
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
        className="bg-fill"
        onClick={function () {
          if (authentication === null) {
            let background = document.getElementById("popup");
            let modifyPage = document.getElementById("modifyPage");
            background.classList.remove(popHide);
            modifyPage.getElementsByClassName("title")[0].value = page.title;
            modifyPage.getElementsByClassName("description")[0].value =
              page.description;
            modifyPage.classList.remove(popHide);
          }
        }}
      >
        <div className="layout py-12 text-base text-center max-w-prose">
          <h1 className="pb-8"> {page.title}</h1>
          <p> {page.description}</p>
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
                    background.classList.remove(popHide);
                    modifyCard.getElementsByClassName("id")[0].value = card.id;
                    modifyCard.getElementsByClassName("id")[1].value = card.id;
                    modifyCard.getElementsByClassName("title")[0].value =
                      card.title;
                    modifyCard.getElementsByClassName("description")[0].value =
                      card.description;
                    modifyCard.classList.remove(popHide);
                  }
                }}
              />
            ))}
            {popup.button}
          </div>
        </div>
      </section>

      <section id="form" className="bg-fill">
        <div className="layout py-12 md:w-1/2">
          <form method="POST" action="./api/send_email">
            <Form title={"Spontanansökan"} />
          </form>
        </div>
      </section>
    </>
  );
};

export default Page;
