import SmallProfile from "../SmallProfile";

const NewsSection = ({ id, title, author, date, file, admin, link }) => {
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
        <div className="flex flex-col p-5 mt-5 w-full">
          <div className="flex flex-row justify-between ">
            <div className="flex flex-col p-2  mx-5 justify-center w-full z-10">
              <div className="flex flex-row ">
                <p className="">{date.split("T")[0]}</p>
                {admin ? (
                  <form
                    className={"flex flex-row items-center"}
                    method={"POST"}
                    action={"../../api/admin/deleteNews"}
                  >
                    <input type={"hidden"} name={"id"} value={id} />
                    <input
                      type={"hidden"}
                      name={"redirect"}
                      value={"../../intranet/news"}
                    />
                    <button className={"mx-auto"} type={"submit"}>
                      Radera
                    </button>
                  </form>
                ) : (
                  ""
                )}
              </div>
              <div className={"flex justify-between"}>
                <h4 className={"uppercase font-bold"}>{title}</h4>
                {admin ? (
                  <form
                    className={"flex flex-row items-center"}
                    method={"POST"}
                    action={"../../api/admin/archiveNews"}
                  >
                    <input type={"hidden"} name={"id"} value={id} />
                    <input
                      type={"hidden"}
                      name={"redirect"}
                      value={"../../intranet/news"}
                    />
                    <button className={"mr-auto "} type={"submit"}>
                      Arkivera
                    </button>
                  </form>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </a>
  );
};

export default NewsSection;
