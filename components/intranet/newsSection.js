const NewsSection = ({ id, slug, title, body, timestamp, img_path }) => {
  return (
    <div className=" cursor-pointer transition-all border-b-2 border-dashed hover:border-white border-secondary-d2 my-2">
      <div className=" flex flex-1 m-2 ">
        <div className="w-1/5 md:w-1/6 ">
          <img src={img_path} alt={title} />
        </div>

        <div className="flex flex-col ml-2 p-5">
          <h4 className="">{title}</h4>
          <p className=" p-3">{body}</p>
        </div>
      </div>
      <div className=""></div>
      <div className=""></div>
    </div>
  );
};

export default NewsSection;
