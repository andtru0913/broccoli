import ProfilePicture from "./ProfilePicture";

export default function ({
  img_path,
  id,
  author,
  index,
  setIndex,
  roll,
  uppdrag,
  email,
  phone,
  text,
}) {
  const handleSetIndex = () => {
    index !== id ? setIndex(id) : setIndex(false);
  };
  return (
    <>
      <div onClick={handleSetIndex} className="">
        {index !== id ? (
          <div className="flex flex-1 group place-self-center flex-col p-2  cursor-pointer w-full border-transparent border-2  hover:border-black hover:border-2 hover:border-dashed">
            <div className="relative justify-center w-36 h-40 md:w-56 md:h-64">
              <ProfilePicture image={img_path} />
            </div>
            <div className=" flex flex-col pt-2 pl-2 md:w-56 w-36">
              <h5 className="select-none uppercase font-bold text-base ">{author}</h5>
            </div>
          </div>
        ) : (
          <div className="flex flex-1 group p-2 flex-col w-full border-transparent bg-secondary-1/80 border-2 border-black border-dashed">
            {/*   <div className="relative object-fill md:w-56 md:h-56 w-36 h-40">
              <ProfilePicture image={img_path} />
            </div>*/}

            <div className="flex flex-col p-2 md:w-56 md:h-64 mb-2 w-36 h-40 overflow-y-scroll">
              <div className="grid grid-cols-2  ">
                <h4 className="select-none text-xs">Roll: {roll}</h4>
                <h4 className="select-none text-xs">Uppdrag: {uppdrag}</h4>
                <h4 className="select-none text-xs"><a onClick={(e) => {e.stopPropagation()}} href={`tel:${phone}`}>Telefon: {phone}</a></h4>
                <h4 className="select-none text-xs"><a onClick={(e) => {e.stopPropagation()}} href={`mailto:${email}`}>Email: {email}</a></h4>
                <p className="select-none text-sm pt-3  col-span-2">{text}</p>
              </div>
            </div>
            <div>
              <h5 className="pl-2 text-base font-bold uppercase ">{author}</h5>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
