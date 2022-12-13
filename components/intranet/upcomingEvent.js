const upcomingEvent = ({ date, title, description }) => {
  return (
    <div className="bg-secondary cursor-pointer transition-all hover:bg-secondary-l2  bg-secondary-l1/60 my-2">
      <div className=" flex flex-1 p-2 ">
        <div className="flex flex-row">
              <h4 style={{width: "100px"}} className=" p-3 uppercase font-bold border-r-2 border-primary-d1 shrink-0">{date}</h4>
            <div className=" pl-5 flex flex-col">
              <h4 className=" uppercase font-bold ">{title}</h4>
              <p>{description}</p>
            </div>
          </div>
        </div>
    </div>
  );
};

export default upcomingEvent;
