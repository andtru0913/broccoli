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
      src={image}
      alt={"Profile picture not found"}
    />
  );
};

export default ProfilePicture;
