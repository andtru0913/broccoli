import HandbookSection from "./handbookSection";

export default function ({data, index, setIndex, section, setSection, english}) {
    const handleSetIndex = () => {
        index !== data.id ? setIndex(data.id) : setIndex(false);
    };
    console.log(english)
    return (
        <>
            <div className="">
                {index !== data.id ? (
                    <div onClick={handleSetIndex} className="flex group flex-row p-3 cursor-pointer w-full  my-2 rounded-md  hover:border-none hover:bg-skin-primary active:bg-skin-secondary shadow-lg shadow-shadow">
                        <div className="flex flex-col px-8 py-2 max-h-24 md:w-screen w-96">
                            <h4 className="font-bold">{data.topic}</h4>
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
                    <div className="flex group flex-row p-3 cursor-pointer w-full  my-2 rounded-md  hover:border-none hover:bg-skin-primary active:bg-skin-secondary shadow-lg shadow-shadow">
                        <div className="flex flex-col px-8 py-2 md:w-screen w-96">
                            <h4 className="font-bold">{data.topic}</h4>
                            <p>{data.text}</p>
                            <div className="flex flex-col  items-center rounded-md h-auto ">
                                {data.children.map((d) => {
                                    return (
                                        <HandbookSection
                                            key={d.id}
                                            data={d}
                                            swedish={d.swedish}
                                            english={d.english}
                                            index={section}
                                            setIndex={setSection}
                                        ></HandbookSection>
                                    );
                                })}
                            </div>
                        </div>
                        <div className="flex items-end ">
                            {" "}
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
