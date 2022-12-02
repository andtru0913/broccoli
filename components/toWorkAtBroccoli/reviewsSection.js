import Image from "next/image";

export default function ({ img_path, id, author, children, index, setIndex }) {
  const handleSetIndex = () => {
    index !== id ? setIndex(id) : setIndex(false);
  };
  return (
    <>
      <div
        className={`hidden lg:flex flex-col md:flex-row cursor-default w-full transition-all duration-100 ease-in-out  my-2 
              ${
                id % 2 ? " bg-primary-1" : "bg-secondary-1"
              } shadow-lg shadow-shadow`}
      >
        {img_path != null}
        <div className="relative">
          <div className="w-36 h-40 lg:w-40 lg:h-48 ">
            <Image
              className="object-cover  "
              src={img_path}
              alt={img_path}
              layout="fill"
              objectFit="cover"
            />
          </div>
        </div>
        <div className="flex flex-col p-2 lg:p-6  md:w-96 xl:w-full lg:max-h-48 lg:overflow-scroll xl:overflow-auto xl:max-h-full">
          <h4 className=" uppercase font-bold lg:pb-2">{author}</h4>
          <p className="">{children}</p>
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
              <div className=" w-20 h-20 ">
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
              <div className="flex  p-2 items-center">
                <h4 className="">{author}</h4>
              </div>
              <div className=" place-self-end">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v12m6-6H6"
                  />
                </svg>
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
                    className="object-cover  "
                    src={img_path}
                    alt={img_path}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              </div>

              <div className="flex  p-2 items-center">
                <h4 className="">{author}</h4>
              </div>
            </div>
            <div className="flex flex-row justify-between">
              <p className=" p-2 max-w-readable ml-20">{children}</p>
              <div className="flex items-end">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className=" w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M18 12H6"
                  />
                </svg>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
