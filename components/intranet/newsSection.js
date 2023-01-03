import SmallProfile from "../SmallProfile";

const NewsSection = ({
  id,
  title,
  author,
  date,
  file,
  admin,
  link,
}) => {
  return (
    <a
      key={id}
      href={`${link}${file}`}
      className="bg-secondary-d2/30 cursor-pointer transition-all hover:bg-secondary-d2 my-2"
    >
      <div className=" flex flex-1">
        <div className=" p-5 mt-5 ml-3 justify-center">
          <SmallProfile className="font-normal "></SmallProfile>
          <p className="py-2">{author.firstname}</p>
        </div>
        <div className="flex flex-col p-5 mt-5 w-full">
          <div className="flex flex-row justify-between ">
            <p className="">{date.split("T")[0]}</p>
            {admin ?
                  <form className={"flex flex-row items-center"} method={"POST"} action={"../../api/admin/deleteNews"}>
                    <input type={"hidden"} name={"id"} value={id} />
                    <input type={"hidden"} name={"redirect"} value={"../../intranet/news"} />
                    <button className={"mx-auto"} type={"submit"}>Radera</button>
                  </form>
                :
                ""}
          </div>
          <div className={"flex justify-between"}>
            <h4 className={"uppercase font-bold"}>{title}</h4>
            {admin ?
                <form className={"flex flex-row items-center"} method={"POST"} action={"../../api/admin/archiveNews"}>
                  <input type={"hidden"} name={"id"} value={id} />
                  <input type={"hidden"} name={"redirect"} value={"../../intranet/news"} />
                  <button className={"mx-auto"} type={"submit"}>Arkivera</button>
                </form>
                :
                ""}
          </div>
        </div>
      </div>
    </a>
  );
};

export default NewsSection;
