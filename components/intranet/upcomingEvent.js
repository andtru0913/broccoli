const upcomingEvent = ({ date, title, description }) => {

  return (
    <div className="bg-secondary cursor-pointer transition-all duration-300 ease-in-out md:hover:scale-x-105 border shadow rounded  my-2">
      <div className=" flex flex-1 m-2 ">
        <div className="flex flex-col ml-2">
          <h4>{title}</h4>
            <b>{date}</b>
          <p>{description}</p>
        </div>
      </div>
      <div className=""></div>
      <div className=""></div>
    </div>
  );
};

export default upcomingEvent;
