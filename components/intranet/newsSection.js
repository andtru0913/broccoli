const NewsSection = ({ id, slug, title, body, timestamp, img_path }) => {
    return (
        <div className="cursor-pointer transition-all duration-300 ease-in-out hover:scale-x-105 border shadow rounded my-2 md:mx-2">
            <div className=' flex flex-1 m-2 '>
                <div className='w-1/3 md:w-1/6  '>
                    <img src={img_path} alt={title} />
                </div>

                <div className='flex flex-col ml-2'>

                    <h4>
                        {title}
                    </h4>
                    <p>
                       {body}
                    </p>

                </div>

            </div>
            <div className=''>


            </div>
            <div className=''>


            </div>
        </div>

    );
}

export default NewsSection;