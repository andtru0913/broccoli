const SmallProfile = ({ firstname, lastname, image, href }) => {
  return !image ? (
    <div className="flex flex-row gap-3 items-center ">
      <img
        className=" h-10  bg-cover bg-center rounded-full"
        src={"/images/silhouette.jpg"}
        alt={"silhouette"}
      />
      {firstname} {lastname}
    </div>
  ) : (
    <div className="flex flex-row gap-3 items-center">
      <img
        className=" h-10  bg-cover bg-center rounded-full"
        src={`/uploads/profiles/${image}`}
        alt={"can't find profile pic"}
      />
      {firstname} {lastname}
    </div>
  );
};

export default SmallProfile;
