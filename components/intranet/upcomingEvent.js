const upcomingEvent = ({ date, title, description }) => {
  return (
    <div className=" cursor-pointer   my-2 mx-2  flex justify-center md:justify-start">
      <div className="flex flex-col bg-secondary-1 hover:bg-primary-1 w-full">
        <div className="grid grid-cols-3 ">
          <div className="grid  col-span-1  items-center justify-center text-center bg-secondary-d1/70">
            <div className=" flex flex-col lg:flex-row gap-2">
              <h4 className=" uppercase  font-bold">{date.split(" ")[0]}</h4>
              <h4 className=" uppercase font-bold ">{date.split(" ")[1]}</h4>
            </div>
          </div>
          <div className=" grid col-span-2  items-center  px-5 py-5  ">
            <div className="flex flex-1 flex-col">
              <h4 className="flex-row-reverse  uppercase font-bold shrink max-w-fit">
                {title}
              </h4>
              <p className="">{description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default upcomingEvent;
