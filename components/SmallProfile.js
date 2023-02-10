import Image from "next/image";

const SmallProfile = ({ firstname, lastname, image }) => {
  return !image ? (
    <div className="flex flex-row gap-3 items-center ">
      <Image width={80} height={80}
        className=" h-10  bg-cover bg-center rounded-full"
        src={"/images/silhouette.jpg"}
        alt={"silhouette"}
      />
      {firstname} {lastname}
    </div>
  ) : (
    <div className="flex flex-row gap-3 items-center">
      <Image width={80} height={80}
        className=" h-10  bg-cover bg-center rounded-full"
        src={`/uploads/profiles/${image}`}
        alt={"can't find profile pic"}
      />
      {firstname} {lastname}
    </div>
  );
};

export default SmallProfile;
