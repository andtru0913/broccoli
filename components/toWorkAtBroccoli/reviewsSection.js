export default function ({ img_path, id, author, children, index, setIndex }) {
  return (
    <>
      <div className="">
        <div
          className={`flex  flex-row cursor-pointer w-full transition-all duration-100 ease-in-out  my-2 
              ${
                id % 2 ? " bg-primary-1" : "bg-secondary-1"
              } shadow-lg shadow-shadow`}
        >
          {img_path != null}
          <div className=" ">
            <img
              className="object-cover w-12 md:w-40 h-12 md:h-48"
              src={img_path}
              alt={img_path}
            />
          </div>
          <div className="flex flex-col p-6 md:w-96 w-52  ">
            <h4 className="pb-2">{author}</h4>
            <p className=" line-clamp-5">{children}</p>
          </div>
        </div>
      </div>
    </>
  );
}
