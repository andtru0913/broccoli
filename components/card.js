const Card = ({ title, image, text, click }) => {
  return !image ? (
    <a
      onClick={click}
      className=" z-10 text-center cursor-default bg-secondary-1 p-14 md:p-12 md:mx-0 lg:p-14 text-inverted transition-all duration-150 ease-in-out hover:scale-105 hover:text-muted "
      href="#linkForm"
    >
      <div className="flex flex-1 p-12 items-center md:p-4 ">
        <h2 className=" uppercase  self-center font-bold ">{title}</h2>
      </div>

      <p className="text-sm leading-5"> {text}</p>
    </a>
  ) : (
    <a
      onClick={click}
      className=" relative md:mx-0 mb-4 md:mb-0 text-left bg-secondary-1 text-muted transition-all hover:text-muted duration-150 ease-in-out hover:scale-105 "
      href="#linkForm"
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
