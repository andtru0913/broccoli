import Image from "next/image";

export default function ({ img_path, id, author, children, index, setIndex, roll, uppdrag }) {
    const handleSetIndex = () => {
      index !== id ? setIndex(id) : setIndex(false);
    };
    return (
      <>
        <div onClick={handleSetIndex} className="">
          {index !== id ? (
            <div className="flex flex-1 group place-self-center flex-col p-2 cursor-pointer w-full border-transparent border-2 hover:border-black hover:border-2 hover:border-dashed">
              {img_path != null}
              <div className="relative sm:justify-center md:justify-center overflow-hidden w-36 h-40 md:w-56 md:h-64 ">
              <Image 
                layout="fill"
                src={img_path} alt={img_path} />
              </div>
              <div className="  flex flex-col my-2 md:w-48 sm:w-40 ">
                <h5 className=" text-lm font-medium uppercase ">{author}</h5>
              </div>

            </div>
          ) : (
            <div className="flex group p-2 flex-row w-full border-transparent border-2 hover:border-black hover:border-2 hover:border-dashed">
              <div className=" relative md:w-56 md:h-64 w-36 h-40 overflow-hidden">
                <Image 
                layout="fill"
                src={img_path} alt={img_path} />
              </div>
  
              <div className="flex flex-col mx-3 p-2 md:w-56 md:h-64 w-36 h-40">
                <h5 className="md:text-lm md:text-s md:font-medium text-sm uppercase ">{author}</h5>
                <h4 className="text-xs">{roll}</h4>
                <h4 className="text-xs">{uppdrag}</h4>
                <h4 className="md:text-sm text-xs my-4 mx-1">{children}</h4>
              </div>
              
            </div>
          )}
        </div>
      </>
    );
  }
  