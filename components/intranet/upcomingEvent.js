const upcomingEvent = ({ date, title, description }) => {
  return (
    <div className="bg-secondary cursor-pointer transition-all hover:bg-secondary-l2  bg-secondary-l1/60  my-2">
      <div className=" flex flex-1 p-2 ">
        <div className="flex flex-col">
          <div className="grid grid-cols-3">
            <div className=" grid grid-row row-span-full items-center row-end-5   ">
              <h4 className=" p-3 uppercase font-bold   ">{date}</h4>
            </div>
            <div className=" col-span-2 border-primary-d1 border-l-2 pl-5 ">
              <h4 className=" uppercase font-bold ">{title}</h4>
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
