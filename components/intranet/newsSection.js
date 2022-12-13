import SmallProfile from "../SmallProfile";

const NewsSection = ({
  id,
  title,
  author,
  date,
  file,
  lastname,
  firstname,
}) => {
  console.log(date);
  return (
    <a
      key={id}
      href={`/uploads/news/${file}`}
      download={file}
      className="cursor-pointer transition-all bg-secondary-d1 hover:bg-secondary-1/60 my-2"
    >
      <div className=" flex flex-1 ">
        <div className="flex flex-col self-center p-5 ml-3">
          <SmallProfile></SmallProfile>
          <p className="py-2">{author.firstname}</p>
        </div>
        <div className="flex flex-col  p-5 w-full">
          <div className="flex flex-row ">
            <p className="">{date.split("T")[0]}</p>
          </div>
          <h4 className=" uppercase font-bold ">{title}</h4>
        </div>
      </div>
    </a>
  );
};

export default NewsSection;
