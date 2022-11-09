export default function ({ img_path, id, author, children, index, setIndex }) {
    const handleSetIndex = () => {
        index !== id ? setIndex(id) : setIndex(false)
    };
    return (
        <>
            <div onClick={handleSetIndex} className="">

                {index !== id ? (
                    <div className="flex group flex-row p-3 cursor-pointer w-full  my-2 rounded-md  hover:border-none hover:bg-skin-primary shadow-lg shadow-shadow">

                        <div className=" m-2 w-12 md:w-24 h-12 md:h-24  rounded-md md:rounded-xl  overflow-hidden">
                            <img src={img_path} alt={img_path} />
                        </div>
                        <div className="flex flex-col p-2 max-h-40 md:w-96 w-52">
                            <h5 className="">{author}</h5>
                            <h4 className="line-clamp-2">{children}</h4>

                        </div>
                        <div className="flex items-end ">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
                            </svg>
                        </div>
                    </div>




                ) : (
                    <div className="flex group flex-row p-3 cursor-pointer w-full  my-2 rounded-md  hover:border-none hover:bg-skin-primary shadow-lg shadow-shadow">


                        <div className="m-2 w-12 md:w-24 h-12 md:h-24  rounded-md md:rounded-xl  overflow-hidden">
                            <img src={img_path} alt={img_path} />
                        </div>




                        <div className=" flex flex-col flex-auto p-2  md:w-96  w-52">
                            <h5 className="">{author}</h5>
                            <h4 className="line-clamp-none">{children}</h4>


                        </div>
                        <div className="flex items-end "> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className=" w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M18 12H6" />
                        </svg>
                        </div>
                    </div>
                )}

            </div>


        </>
    );
}
