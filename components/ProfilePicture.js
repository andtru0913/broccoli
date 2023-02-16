import Image from "next/image";
import Layout from "./layout/layout";

const ProfilePicture = ({ image }) => {
  return !image ? (
    <Image
      layout="fill"
      className="select-none h-full md:w-full bg-cover bg-center rounded-sm"
      src={"/images/silhouette.jpg"}
      alt={"silhouette"}
    />
  ) : (
    <Image
      layout="fill"
      className="select-none h-full md:w-full bg-cover bg-center rounded-sm"
      src={`/uploads/profiles/${image}?${Date.now()}`}
      alt={"can't find profile pic"}
    />
  );
};

export default ProfilePicture;
