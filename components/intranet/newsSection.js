import SmallProfile from "../SmallProfile";

const NewsSection = ({
  id,
  title,
  author,
  date,
  file,
  admin,
  link,
  firstname,
  lastname,
}) => {
  const deletebutton = admin ? (
    <form method={"POST"} action={"../../api/admin/deleteNews"}>
      <input type={"hidden"} name={"id"} value={id} />
      <button type={"submit"}>&#10060;</button>
    </form>
  ) : (
    ""
  );
  return (
    <a
      key={id}
      href={`${link}${file}`}
      className="bg-secondary-l1 cursor-pointer transition-all hover:bg-primary-l2 mt-4 z-10 "
    >
      <div className=" flex flex-1 z-10 ">
        <div className=" flex flex-col p-2 mt-3 ml-5 justify-center">
          <SmallProfile className="font-normal "></SmallProfile>
          <p className="py-2">{author.firstname}</p>
        </div>
        <div className="flex flex-col p-2  mx-5 justify-center w-full z-10">
          <div className="flex flex-row ">
            <p className="">{date.split("T")[0]}</p>
          </div>
          <div className={"flex justify-between"}>
            <h4 className={"uppercase font-bold"}>{title}</h4>
            {deletebutton}
          </div>
        </div>
      </div>
    </a>
  );
};

export default NewsSection;
