import Image from "next/image";
import { GrFormDown, GrFormUp } from "react-icons/gr";

export default function reviewsSection({
  img_path,
  id,
  author,
  text,
  index,
  setIndex,
}) {
  const handleSetIndex = () => {
    index !== id ? setIndex(id) : setIndex(false);
  };
  return (
    <>
      <div
        className={`h-auto hidden lg:flex flex-col md:flex-row cursor-default w-full transition-all duration-100 ease-in-out  my-2 
              ${
                id % 2 ? " bg-primary-1" : "bg-secondary-1"
              } shadow-lg shadow-shadow`}
      >
        {img_path != null}
        <div className="relative">
          <div className="w-52 h-full relative">
            <Image
              className="object-cover  "
              src={img_path}
              alt={img_path}
              layout="fill"
              objectFit="cover"
            />
          </div>
        </div>
        <div className="flex flex-col p-2 lg:p-6 max-h-40  md:w-96 xl:w-full lg:max-h-40 overflow-x-auto xl:max-h-full">
          <h4 className=" uppercase font-bold lg:pb-2">{author}</h4>
          <p className="">{text}</p>
        </div>
      </div>
      <div onClick={handleSetIndex} className="">
        {index !== id ? (
          <div
            className={`flex lg:hidden flex-row  cursor-pointer w-full transition-all duration-100 ease-in-out  my-2 hover:border-none
    ${
      id % 2
        ? " bg-primary-1 hover:bg-primary-l1"
        : "bg-secondary-1 hover:bg-secondary-d1"
    }  shadow-lg shadow-shadow`}
          >
            {img_path != null}
            <div className="relative">
              <div className="flex  w-20 h-20 ">
                <Image
                  className="object-cover  "
                  src={img_path}
                  alt={img_path}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            </div>

            <div className=" flex flex-row items-between w-full justify-between">
              <div className="flex px-6 p-2 items-center">
                <h4 className="font-bold uppercase ">{author}</h4>
              </div>
              <div className="p-3 place-self-end">
                <GrFormDown size={25} />
              </div>
            </div>
          </div>
        ) : (
          <div
            className={`flex flex-col cursor-pointer w-full transition-all duration-100 ease-in-out  hover:border-none 
    ${
      id % 2
        ? " bg-primary-1 hover:bg-primary-l1"
        : "bg-secondary-1 hover:bg-secondary-d1"
    }  shadow-lg shadow-shadow`}
          >
            <div className="flex flex-row">
              <div className="relative">
                <div className=" w-20 h-20 ">
                  <Image
                    className="object-cover p-2  rounded-full "
                    src={img_path}
                    alt={img_path}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              </div>

              <div className="flex px-6 items-center">
                <h4 className="font-bold uppercase ">{author}</h4>
              </div>
            </div>
            <div className="flex flex-row justify-between w-full relative">
              <p className=" p-2 px-6 pb-6 max-w-readable ">{text}</p>
              <div className="absolute right-0 bottom-0 p-3 flex items-end">
                <GrFormUp size={25} />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
