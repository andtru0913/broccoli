const NewsSection = ({ id, title, author, date, file, admin, link }) => {
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
      className="bg-secondary cursor-pointer transition-all hover:bg-secondary-d2/40 my-2"
    >
      <div className=" flex flex-1 m-2 ">
        <div className="w-1/5 md:w-1/6 ">
          <img src={`/uploads/profiles/${author.email}`} alt={title} />
        </div>
        <div className="flex flex-col  p-5 w-full">
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
