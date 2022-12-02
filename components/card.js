const Card = ({ title, icon, image, text, click }) => {
  return !image ? (
    <a
      onClick={click}
      className=" z-10 text-center cursor-default bg-secondary-1 p-14 md:p-12 md:mx-4 lg:p-14 text-inverted transition-all duration-150 ease-in-out hover:scale-105 hover:text-muted "
    >
      <div className="flex flex-1 p-12  md:p-4">
        <h2 className=" uppercase font-bold justify-self-center">{title}</h2>
      </div>

      <p className="text-sm leading-5"> {text}</p>
    </a>
  ) : (
    <a
      onClick={click}
      className="relative md:mx-4 mb-4 md:mb-0 text-left bg-secondary-1 text-muted transition-all duration-150 ease-in-out hover:scale-105 hover:text-muted "
    >
      {/*  <div className="h-1/2 overflow-hidden">
        <img className=" w-full  bg-cover bg-center " src={image} />
      </div>*/}

      <div className="flex flex-col items-left  p-14 md:p-12 lg:p-14  ">
        <h2 className=" uppercase font-bold pb-3">{title}</h2>
        <p className="  text-justify">{text}</p>
      </div>
    </a>
  );
};

export default Card;
