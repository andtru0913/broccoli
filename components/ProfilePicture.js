const ProfilePicture = ({ image}) => {
    return (
        !image ?
            <img className=" w-full  bg-cover bg-center rounded-t-sm"
                 src={"/images/silhouette.jpg"}
                 alt={"silhouette"}
            />
            :
            <img className=" w-full  bg-cover bg-center rounded-t-sm"
                 src={`/uploads/profiles/${image}`}
                 alt={"can't find profile pic"}
            />
    );
}

export default ProfilePicture;