const Card = ({
  id,
  title,
  text,
  fields,
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
          <div className="fixed top-0 left-0 z-30 bg-black/40 w-screen h-screen"></div>
          <div className="z-40 fixed inset-1/4 w-2/4 top-40 bg-secondary-1 h-2/3 flex flex-col gap-4 text-left text-color-base overflow-y-scroll">
            <div className="sticky top-0 flex flex-row justify-between bg-secondary-d1 border-b-2 border-secondary-d2">
              <h2 className="p-8 uppercase ">{title}</h2>
              <button
                className="uppercase font-bold hover:bg-secondary-1 bg-secondary-d1 p-8"
                onClick={handleSetIndex}
              >
                Close
              </button>
            </div>
            {console.log(fields)}
            {fields.map((data, index) => {
              field(data.rubrik, data.description);
            })}
            {field("Datum", "2015/01/13 - 2015/05/22")}
            {field("Beskrivning", `${text}`)}
            {field("Requirements", "C++")}
            {field("Plats", "Göteborg")}
            {field("Kontaktperson", "Åsa Vikström")}
            <div className="flex flex-row justify-between"></div>
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
