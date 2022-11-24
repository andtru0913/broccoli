export default function ({ img_path, id, author, children, index, setIndex }) {
  const handleSetIndex = () => {
    index !== id ? setIndex(id) : setIndex(false);
  };
  return (
    <>
      <div
        className={`hidden md:flex flex-col md:flex-row cursor-default w-full transition-all duration-100 ease-in-out  my-2 
              ${
                id % 2 ? " bg-primary-1" : "bg-secondary-1"
              } shadow-lg shadow-shadow`}
      >
        {img_path != null}
        <div className=" ">
          <img
            className="object-cover w-36 h-40 lg:w-40 lg:h-48"
            src={img_path}
            alt={img_path}
          />
        </div>
        <div className="flex flex-col p-2 lg:p-6  md:w-96">
          <h4 className=" lg:pb-2">{author}</h4>
          <p className=" line-clamp-5">{children}</p>
        </div>
      </div>
      <div onClick={handleSetIndex} className="">
        {index !== id ? (
          <div
            className={`flex md:hidden flex-row  cursor-pointer w-full transition-all duration-100 ease-in-out  my-2 hover:border-none
    ${
      id % 2
        ? " bg-primary-1 hover:bg-primary-l1"
        : "bg-secondary-1 hover:bg-secondary-d1"
    }  shadow-lg shadow-shadow`}
          >
            {img_path != null}
            <div className=" ">
              <img
                className="object-cover w-20 h-20 "
                src={img_path}
                alt={img_path}
              />
            </div>
            <div className=" flex flex-row items-between w-full justify-between">
              <div className="flex flex-col p-2 items-start">
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
            className={`flex flex-row cursor-pointer w-full transition-all duration-100 ease-in-out  hover:border-none 
    ${
      id % 2
        ? " bg-primary-1 hover:bg-primary-l1"
        : "bg-secondary-1 hover:bg-secondary-d1"
    }  shadow-lg shadow-shadow`}
          >
            <div className=" flex flex-col flex-auto p-2  md:w-96  w-52 ">
              <h4 className="">{author}</h4>
              <p className="text-base md:text-xl">{children}</p>
            </div>
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
        )}
      </div>
    </>
  );
}
