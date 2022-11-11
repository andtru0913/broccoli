const ProfilePicture = ({ image}) => {
    return (
        image == null ?
            <img className=" w-full  bg-cover bg-center rounded-t-sm"
                 src={"/images/silhouette.jpg"}
                 alt={"profilbild"}
            />
            :
            <img className=" w-full  bg-cover bg-center rounded-t-sm"
                 src={image}
                 alt={"profilbild"}
            />
    );
}

export default ProfilePicture;