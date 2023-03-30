import Image from "next/image";
import Layout from "./layout/layout";

const ProfilePicture = ({ image }) => {
  return !image ? (
    <Image
      layout="fill"
      className="select-none h-full md:w-full bg-cover bg-center rounded-sm"
      src={"/images/silhouette.jpg"}
      alt={"silhouette"}
      priority={true}
    />
  ) : (
    <Image
      layout="fill"
      className="select-none h-full md:w-full bg-cover bg-center rounded-sm"
      src={image}
      alt={"Profile picture not found"}
      priority={true}
    />
  );
};

export default ProfilePicture;
