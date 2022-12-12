const upcomingNotification = ({ date, author, title, description }) => {
    return (
        <div className="p-2 bg-secondary cursor-pointer transition-all hover:bg-secondary-l2  bg-secondary-l1/60  my-2">
                <div className="flex flex-col">
                    <div className="flex flex-row justify-between">
                        <p className="font-bold">{`${author.firstname} ${author.lastname}`}</p>
                        <p className="font-thin text-sm">{date}</p>
                    </div>
                        <div>
                            <h4 className="uppercase font-bold ">{title}</h4>
                            <p className="">{description}</p>
                        </div>
                </div>
        </div>
    );
};

export default upcomingNotification;
