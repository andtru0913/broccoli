import { HiXMark } from "react-icons/hi2";

const Card = ({
  id,
  title,
  text,
  requirements,
  location,
  startdate,
  enddate,
  contact,
  exjobbare,
  click,
  auth,
  setShowModal,
  showModal = false,
}) => {
  const handleSetIndex = () => {
    showModal !== id ? setShowModal(id) : setShowModal(false);
  };

  return title != "Nytt Kort" ? (
    <>
      <div className="relative flex flex-col">
        <a
          onClick={handleSetIndex}
          className=" z-10 text-left cursor-pointer bg-secondary-1 p-4 md:p-8 md:mx-0 text-color-base transition-all duration-150 ease-in-out hover:scale-105   "
          // href="#linkForm"
        >
          <div className=" relative flex flex-col items-center justify-center h-60 w-60 md:h-72 md:w-72 ">
            <h2 className="z-20 uppercase flex self-center  font-bold px-8 h4 md:h2">
              {title}
            </h2>
            <p className=" hidden text-justify ">{text}</p>
          </div>
        </a>
        {auth ? (
          <button onClick={click} className="p-2 hover:bg-white">
            edit
          </button>
        ) : (
          <></>
        )}
      </div>
      {showModal == id ? (
        <>
          <div className="fixed top-0 left-0 z-30 bg-black/40 w-screen h-screen "></div>
          <div className="z-40 fixed w-screen px-2 md:inset-1/4 md:w-2/4 top-40 h-screen ">
            <div className="bg-secondary-1  flex flex-col gap-4 text-left text-color-base overflow-y-scroll h-2/3 md:h-2/4 ">
              <div className="sticky top-0 flex flex-row justify-between bg-secondary-d1 border-b-2 border-secondary-d2">
                <h2 className="p-8 uppercase ">{title}</h2>
                <button
                  className="uppercase font-bold hover:bg-secondary-1 bg-secondary-d1 p-8"
                  onClick={handleSetIndex}
                >
                  <HiXMark />
                </button>
              </div>
              {startdate ? (
                <div className="flex flex-col px-8 ">
                  <h4 className=" font-medium">Datum</h4>
                  <div className="flex flex-row">
                    <p>{startdate}</p>
                    {enddate ? (
                      <div className="flex flex-row gap-1">
                        <p className="pl-2 font-semibold">{"till"}</p>
                        <p>{enddate}</p>
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              ) : (
                <></>
              )}

              {text
                ? field("Beskrivning", `${text}`)
                : field("Beskrivning", "Mer information kommer.")}
              {requirements ? field("Krav", `${requirements}`) : ""}
              {location ? field("Plats", `${location}`) : ""}
              {contact ? field("Kontaktperson", `${contact}`) : ""}
              {exjobbare ? field("Exjobbare", `${exjobbare}`) : ""}
              <div className="flex flex-row justify-between"></div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  ) : (
    <a
      onClick={click}
      className=" z-10 text-left cursor-pointer bg-secondary-1 p-4 md:p-8 md:mx-0 text-color-base transition-all duration-150 ease-in-out hover:scale-105   "
      // href="#linkForm"
    >
      <div className=" relative flex flex-col items-center justify-center h-60 w-60 md:h-72 md:w-72 ">
        <h2 className="z-20 uppercase flex self-center  font-bold px-8 h4 md:h2">
          {title}
        </h2>
        <p className=" hidden text-justify ">{text}</p>
      </div>
    </a>
  );
};

export default Card;
function field(title, text) {
  return (
    <div className="flex flex-col px-8 ">
      <h4 className=" font-medium">{title}</h4>
      <p>{text}</p>
    </div>
  );
}
