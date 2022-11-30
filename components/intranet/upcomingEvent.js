const upcomingEvent = ({ date, title, description }) => {
  return (
    <div className="bg-secondary cursor-pointer transition-all hover:bg-secondary-l2  bg-secondary-l1/60  my-2">
      <div className=" flex flex-1 m-2 ">
        <div className="flex flex-col ml-2">
          <div className="grid grid-cols-3">
            <div className="grig grid-row-2 row-span-2 justify-center  ">
              <h4 className="p-2 ">{date}</h4>
            </div>
            <div className=" col-span-2 border-primary-d1 border-l-2 pl-5 ">
              <h4 className="  ">{title}</h4>
              <p className=" ">{description}</p>
            </div>
          </div>
        </div>
      </div>
      <div className=""></div>
      <div className=""></div>
    </div>
  );
};

export default upcomingEvent;
