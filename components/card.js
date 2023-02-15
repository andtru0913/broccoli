import { useState } from "react";
import cardAccordion from "./cardAccordion";

const Card = ({
  type,
  id,
  title,
  image,
  text,
  click,
  auth,
  setShowModal,
  showModal = false,
}) => {
  const handleSetIndex = () => {
    showModal !== id ? setShowModal(id) : setShowModal(false);
  };

  return !image ? (
    (type = "admin" ? (
      <a
        onClick={click}
        className="relative z-10 text-left cursor-default bg-secondary-1 p-4 md:p-8 md:mx-0 text-color-base transition-all duration-150 ease-in-out hover:scale-105  "
        // href="#linkForm"
      >
        <div className="  flex flex-col items-center justify-center h-60 w-60 md:h-72 md:w-72">
          <h2 className=" uppercase flex self-center  font-bold px-8 h4 md:h2">
            {title}
          </h2>
          <p className=" hidden text-justify ">{text}</p>
        </div>
      </a>
    ) : (
      <>
        <a
          onClick={handleSetIndex}
          className="relative z-10 text-left cursor-default bg-tertiary-1 p-4 md:p-8 md:mx-0 text-inverted-muted transition-all duration-150 ease-in-out hover:scale-105  "
          // href="#linkForm"
        >
          <div className="  flex flex-col items-center justify-center h-60 w-60 md:h-72 md:w-72">
            <h2 className=" uppercase flex self-center  font-bold px-8 h4 md:h2">
              {title}
            </h2>
            <p className=" hidden text-justify ">{text}</p>
          </div>
          {auth ? (
            <button onClick={click} className="absolute top-0 right-0 p-2">
              edit
            </button>
          ) : (
            <></>
          )}
        </a>
        {showModal == id ? (
          <>
            <div className="fixed top-0 left-0 z-30 bg-black/40 w-screen h-screen"></div>
            <div className="z-40 fixed inset-1/4 w-2/4 top-40 bg-tertiary-d1 h-2/3 flex flex-col gap-4 text-left text-inverted overflow-y-scroll">
              <div className="sticky top-0 flex flex-row justify-between bg-tertiary-l1 border-b-2 border-secondary-1">
                <h2 className="p-8 uppercase ">{title}</h2>
                <button
                  className="uppercase font-bold hover:bg-tertiary-d2 bg-tertiary-d1 p-8"
                  onClick={handleSetIndex}
                >
                  Close
                </button>
              </div>
              <p className="p-8">{text}</p>
              <div className="flex flex-col p-8">
                <h4 className="font-semibold">Bilder</h4>
                <p>Bild1</p>
              </div>
              <div className="flex flex-col p-8">
                <h4 className="font-semibold">Requirements</h4>
                <p>Namn 1</p>
              </div>

              <div className="flex flex-row justify-between">
                <div className="flex flex-col p-8">
                  <h4 className="font-semibold">Exjobbare</h4>
                  <p>Namn 1</p>
                  <p>Namn 2</p>
                </div>
                <div className="flex flex-col p-8">
                  <h4 className="font-semibold">Datum</h4>
                  <p>Från 2019</p>
                  <p>Till 2019</p>
                </div>
                <div className="flex flex-col p-8">
                  <h4 className="font-semibold">Location</h4>
                  <p>Göteborg</p>
                </div>
              </div>
            </div>
          </>
        ) : (
          <></>
        )}
      </>
    ))
  ) : (
    <a
      onClick={click}
      className=" relative md:mx-0 mb-4 md:mb-0 text-left bg-secondary-1 text-muted transition-all hover:text-muted duration-150 ease-in-out hover:scale-105 "
      //  href="#linkForm"
    >
      {/*  <div className="h-1/2 overflow-hidden">
        <img className=" w-full  bg-cover bg-center " src={image} />
      </div>*/}

      <div className=" duration-150  transition-all ease-in-out hover:scale-105 flex flex-col items-left  p-14 md:p-12 lg:p-14  ">
        <h2 className=" uppercase flex self-center md:self-auto  font-bold pb-3">
          {title}
        </h2>
        <p className="  text-justify">{text}</p>
      </div>
    </a>
  );
};

export default Card;
