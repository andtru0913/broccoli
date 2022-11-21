const Card = ({ title, icon, image, text, click }) => {
  return !image ? (
    <a
      onClick={click}
      className=" m-4 p-4 text-left md:p-8 bg-secondary-1 text-inverted rounded-md transition-all duration-150 ease-in-out hover:scale-105 hover:text-muted shadow-shadow shadow-md"
    >
      <div className="flex flex-1 p-2 md:p-4">
        {icon}
        <h2 className=" text-xl uppercase">{title}</h2>
      </div>

      <p className="text-sm leading-5"> {text}</p>
    </a>
  ) : (
    <a
      onClick={click}
      className="relative m-4 text-left  bg-fill text-muted rounded-md transition-all duration-150 ease-in-out hover:scale-105 hover:text-muted shadow-shadow shadow-md"
    >
      <div className="h-1/2 overflow-hidden">
        <img className=" w-full  bg-cover bg-center rounded-t-md" src={image} />
      </div>

      <div className="flex flex-col items-center p-2 md:p-4 ">
        <h2 className=" text-xl uppercase">{title}</h2>
        <p className=" text-xs leading-2">{text}</p>
      </div>
    </a>
  );
};

export default Card;
