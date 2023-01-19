const ProfilePicture = ({ image }) => {
  return !image ? (
    <img
      className="select-none h-full md:w-full bg-cover bg-center rounded-sm"
      src={"/images/silhouette.jpg"}
      alt={"silhouette"}
    />
  ) : (
    <img
      className="select-none h-full md:w-full bg-cover bg-center rounded-sm"
      src={`/uploads/profiles/${image}`}
      alt={"can't find profile pic"}
    />
  );
};

export default ProfilePicture;
