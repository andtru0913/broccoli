export default function ({ img_path, id, author, children, index, setIndex }) {
    const handleSetIndex = () => {
        index !== id ? setIndex(id) : setIndex(false)
    };
    return (
        <>
            <div onClick={handleSetIndex} className="relative flex group cursor-pointer justify-between items-center  p-2 m-2 rounded-md border hover:bg-zinc-300 hover:shadow-lg focus:bg-salmone">
                <div className="flex group flex-row  p-3 ">

                    <div className="  ">
                        <div className="m-2 w-12 md:w-24 h-12 md:h-24  rounded-md md:rounded-xl  overflow-hidden">
                            <img src={img_path} alt={img_path}/>
                        </div>



                    </div>
                    {index !== id ? (
                        <div className="flex flex-col justify-between p-2 max-h-40 md:w-96 w-52">
                            <div>

                                <h5 className="">{author}</h5>
                                <h4 className="truncate whitespace-nowrap overflow-hidden">{children}</h4>
                            </div>
                            <div className="flex justify-end ">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
                                </svg>
                            </div>

                        </div>



                    ) : (
                        <div className="relative flex flex-col justify-center p-2  md:w-96  w-52">
                            <h5 className="">{author}</h5>
                            <h4 className=" ">{children}</h4>
                            <div className="flex justify-end "> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className=" w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M18 12H6" />
                            </svg>
                            </div>

                        </div>
                    )}

                </div>
            </div>


        </>
    );
}
