const Carousel = ({children}) => {
    const bothArrow = "absolute z-10  -translate-y-1/2 w-12 h-12 rounded-3xl bg-white border-2 border-solid border-cyan-400"

    return (

        <div className="w-full flex flex-col">

            <button className={`left-6 ${bothArrow}`}>
                &lt;
            </button>
            <div className="w-full flex relative">
                <div className="overflow-hidden w-full h-full">
                    <div className="flex transition-all duration-200 ease-linear w-full flex-shrink-0 flex-grow">
                        {children}
                    </div>
                </div>
            </div>

            <button className={`right-6 ${bothArrow}`}>
                &gt;
            </button>
        </div>
    );
}

export default Carousel;