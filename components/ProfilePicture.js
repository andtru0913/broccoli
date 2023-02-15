import Image from "next/image";

const ProfilePicture = ({ image }) => {
  return !image ? (
    <Image width={80} height={80}
      className="select-none h-full md:w-full bg-cover bg-center rounded-sm"
      src={"/images/silhouette.jpg"}
      alt={"silhouette"}
    />
  ) : (
    <Image width={80} height={80}
      className="select-none h-full md:w-full bg-cover bg-center rounded-sm"
      src={`/uploads/profiles/${image}?${Date.now()}`}
      alt={"Profile picture not found"}
    />
  );
};

export default ProfilePicture;
