const upcomingEvent = ({ date, title, description }) => {
  return (
    <div className=" cursor-pointer hover:bg-primary-l2 bg-secondary-1 my-2  ">
      <div className=" lex flex-1">
        <div className="flex flex-col">
          <div className="grid grid-cols-3 ">
            <div className="grid pl-2  col-span-1 items-center ">
              <div className=" flex flex-col ml-2 lg:flex-row ">
                <h4 className=" uppercase px-2 font-bold">
                  {date.split(" ")[0]}
                </h4>
                <h4 className=" uppercase font-bold">{date.split(" ")[1]}</h4>
              </div>
            </div>
            <div className=" grid col-span-2  items-center border-primary-d1 border-l-2 pl-5  ">
              <div className="flex flex-col">
                <h4 className="flex-row-reverse mt-3 uppercase font-bold ">
                  {title}
                </h4>
                <p className="mb-3">{description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default upcomingEvent;
