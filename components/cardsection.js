import Card from "./card";
import {useState} from "react";

const Cardsection = ({authentication, page, title}) => {
    let numCards = 0
    let newCard = ""
    const popHide = "pop-hide";
    const [showModal, setShowModal] = useState(false);
    if (authentication) {
        numCards += 1;
        newCard = (
            <Card
                title="Nytt Kort"
                click={function () {
                    document.getElementById("popup").classList.remove(popHide);
                    document.getElementById("createCard").classList.remove(popHide);
                }}
            />
        )
    }
    return numCards > 0 ? (
        <div className=" z-10 flex flex-col gap-8  text-center  text-color-base dark:text-color-base">
            <h2 className="pt-8  uppercase  "> {title}</h2>

            <div className="grid grid-flow-col justify-items-center gap-4 overflow-x-auto px-4 md:px-20 pb-8 ">
                {page.cards.map((card) => (
                    <>
                        <Card
                            type={"exjobb"}
                            key={card.id}
                            id={card.id}
                            title={card.title}
                            text={card.description}
                            requirements={card.requirements}
                            location={card.location}
                            startdate={card.startdate}
                            enddate={card.enddate}
                            contact={card.contact}
                            exjobbare={card.exjobbare}
                            auth={authentication}
                            click={function () {
                                if (authentication) {
                                    let background = document.getElementById("popup");
                                    let modifyCard = document.getElementById("modifyCard");
                                    background.classList.remove(popHide);
                                    modifyCard.getElementsByClassName("id")[0].value =
                                        card.id;
                                    modifyCard.getElementsByClassName("id")[1].value =
                                        card.id;
                                    modifyCard.getElementsByClassName("title")[0].value =
                                        card.title;
                                    modifyCard.getElementsByClassName(
                                        "description"
                                    )[0].value = card.description;
                                    modifyCard.getElementsByClassName(
                                        "requirements"
                                    )[0].value = card.requirements;
                                    modifyCard.getElementsByClassName("location")[0].value =
                                        card.location;
                                    modifyCard.getElementsByClassName(
                                        "startdate"
                                    )[0].valueAsDate = new Date(card.startdate);
                                    modifyCard.getElementsByClassName(
                                        "enddate"
                                    )[0].valueAsDate = new Date(card.enddate);

                                    modifyCard.getElementsByClassName("contact")[0].value =
                                        card.contact;
                                    modifyCard.getElementsByClassName(
                                        "exjobbare"
                                    )[0].value = card.exjobbare;
                                    modifyCard.classList.remove(popHide);
                                }
                            }}
                            setShowModal={setShowModal}
                            showModal={showModal}
                        />
                    </>
                ))}
                {newCard}
            </div>
        </div>
    ) : (
        <></>
    )
}

export default Cardsection