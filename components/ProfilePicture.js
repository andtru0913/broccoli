const ProfilePicture = ({ image }) => {
  return !image ? (
    <img
      className=" h-full md:w-full bg-cover bg-center rounded-sm"
      src={"/images/silhouette.jpg"}
      alt={"silhouette"}
    />
  ) : (
    <img
      className="h-full md:w-full bg-cover bg-center rounded-sm"
      src={`/uploads/profiles/${image}`}
      alt={"can't find profile pic"}
    />
  );
};

export default ProfilePicture;
