const NewsSection = ({ id, slug, title, body, timestamp, img_path }) => {
    return (
        <div className="cursor-pointer transition-all duration-300 ease-in-out hover:scale-x-105">
            <div className=' flex flex-1 bg-beige-1 m-2'>
                <div className='w-1/6 p-4 '>
                    <img src={img_path} alt={title} />
                </div>

                <div className='flex flex-col p-4'>

                    <h4>
                        {title}
                    </h4>
                    <p>
                       {body}
                    </p>

                </div>

            </div>
            <div className='bg-beige-1'>


            </div>
            <div className='bg-beige-1'>


            </div>
        </div>

    );
}

export default NewsSection;