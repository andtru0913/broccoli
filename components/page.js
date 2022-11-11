import popupStyles from "./popup.module.css";
import Layout from "./layout/layout";
import Form from "./form";
import Card from "./card";

const Page = ({ authentication, page, redirect }) => {
  let popup = {};
  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };
  if (authentication === null) {
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
          title="Ny Kort"
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
            <input type="hidden" id="createBase64" name="base64" />
            <input type="hidden" name="pageId" value={page.id} />
            <input type="hidden" name="redirect" value={redirect} />
            <input
              className="form-control block w-full px-3 py-1.5 text-base font-normal text-skin-muted  bg-clip-padding border border-solid border-skin-border rounded transition ease-in-out m-0 focus:text-skin-muted focus:bg-skin-fill focus:border-skin-secondary focus:outline-none"
              type="file"
              id="createFormFile"
              name="file"
              onChange={async function () {
                let submit = document.getElementById("createCardSubmit");
                submit.disabled = true;
                const f = document.querySelector("#createFormFile").files[0];
                document.getElementById("createBase64").value =
                  await convertBase64(f);
                submit.disabled = false;
              }}
            />
            <button id="createCardSubmit" type="submit">
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
              className="form-control block w-full px-3 py-1.5 text-base font-normal text-skin-muted  bg-clip-padding border border-solid border-skin-border rounded transition ease-in-out m-0 focus:text-skin-muted focus:bg-skin-fill focus:border-skin-secondary focus:outline-none"
              type="file"
              id="modifyFormFile"
              name="file"
              onChange={async function () {
                let submit = document.getElementById("modifyCardSubmit");
                submit.disabled = true;
                const f = document.querySelector("#modifyFormFile").files[0];
                document.getElementById("modifyBase64").value =
                  await convertBase64(f);
                submit.disabled = false;
              }}
            />
            <input type="hidden" id="modifyBase64" name="base64" />
            <input type="hidden" name="redirect" value={redirect} />
            <button type="submit" id="modifyCardSubmit">
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
        className="bg-skin-fill"
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
        <div className="layout py-12 text-skin-base text-center max-w-prose">
          <h1 className="pb-8"> {page.title}</h1>
          <p> {page.description}</p>
        </div>
      </section>

      <section className="bg-skin-fill  ">
        <div className=" layout py-12 md:w-1/2">
          <div className="grid md:grid-cols-2  md:gap-12 ">
            {page.cards.map((card) => (
              <Card
                key={card.id}
                title={card.title}
                text={card.description}
                image={card.image}
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
                    document.getElementById("modifyBase64").value = card.image;
                    modifyCard.classList.remove(popupStyles.hide);
                  }
                }}
              />
            ))}
            {popup.button}
          </div>
        </div>
      </section>

      <section id="form" className="bg-skin-fill">
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
