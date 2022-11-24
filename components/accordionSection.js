export default function ({ img_path, id, author, children, index, setIndex }) {
  const handleSetIndex = () => {
    index !== id ? setIndex(id) : setIndex(false);
  };
  return (
    <>
      <div onClick={handleSetIndex} className="">
        {index !== id ? (
          <div
            className={`flex  flex-row cursor-pointer w-full transition-all duration-100 ease-in-out  my-2 hover:border-none
            ${
              id % 2
                ? " bg-primary-1 hover:bg-primary-l1"
                : "bg-secondary-1 hover:bg-secondary-d1"
            } active:bg-secondary-1 shadow-lg shadow-shadow`}
          >
            {img_path != null}
            <div className=" ">
              <img
                className="object-cover w-12 md:w-28 h-12 md:h-32"
                src={img_path}
                alt={img_path}
              />
            </div>
            <div className="flex flex-col p-2 max-h-40 md:w-96 w-52  ">
              <h5 className="">{author}</h5>
              <p className="line-clamp-2  text-base md:text-xl">{children}</p>
            </div>
            <div className="flex items-end ">
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
        ) : (
          <div
            className={`flex flex-row cursor-pointer w-full  transition-all duration-100 ease-in-out  hover:border-none 
            ${
              id % 2
                ? " bg-primary-1 hover:bg-primary-l1"
                : "bg-secondary-1 hover:bg-secondary-d1"
            } active:bg-secondary-1 shadow-lg shadow-shadow`}
          >
            <div className="">
              <img
                className="object-cover w-12 md:w-28 h-12 md:h-32"
                src={img_path}
                alt={img_path}
              />
            </div>

            <div className=" flex flex-col flex-auto p-2  md:w-96  w-52 ">
              <h5 className="">{author}</h5>
              <p className="text-base md:text-xl">{children}</p>
            </div>
            <div className="flex items-end ">
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
