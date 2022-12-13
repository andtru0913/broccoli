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
          <div className="flex flex-1 group place-self-center flex-col p-2 cursor-pointer w-full border-transparent border-2 hover:border-black hover:border-2 hover:border-dashed">
            <div className="relative justify-center w-36 h-40 md:w-56 md:h-64 ">
              <ProfilePicture image={img_path} />
            </div>
            <div className=" flex flex-col p-2 md:w-48 w-36">
              <h5 className=" uppercase text-base ">{author}</h5>
            </div>
          </div>
        ) : (
          <div className="flex group p-2 flex-col w-full border-transparent bg-secondary-1/80 border-2 border-black border-dashed">
            <div className="relative md:w-56 md:h-64 w-36 h-40">
              <ProfilePicture image={img_path} />
            </div>

            <div className="flex flex-col mb-3 p-2 md:w-56 md:h-64 w-36 h-40 overflow-y-scroll">
              <h5 className=" text-base uppercase ">{author}</h5>
              <h4 className="text-xs">Roll: {roll}</h4>
              <h4 className="text-xs">Telefon: {phone}</h4>
              <h4 className="text-xs">Email: {email}</h4>
              <h4 className="text-xs">Uppdrag: {uppdrag}</h4>
              <p className="text-xs">{text}</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
