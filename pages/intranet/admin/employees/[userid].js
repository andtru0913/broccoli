import { getNotifications, getUserinfo } from "../../../../Database";
import LayoutIntranet from "../../../../components/layout/layoutIntranet";
import ProfilePicture from "../../../../components/ProfilePicture";
import { verify } from "../../../../tokens";
export async function getServerSideProps(context) {
  const user_id = await verify(
    JSON.parse(context.req.cookies["token"] || null)
  );
  const user = await getUserinfo(user_id);
  if (!context.params.userid || !user.admin) {
    return {
      redirect: {
        permanent: false,
        destination: "/intranet",
      },
      props: {},
    };
  } else {
    const [userString, notifications] = await Promise.all([
      getUserinfo(context.params.userid),
      getNotifications(user.id),
    ]);
    return {
      props: {
        userString: JSON.stringify(userString),
        notifications: JSON.stringify(await notifications),
      },
    };
  }
}

const profile = ({ userString, notifications }) => {
  const user = JSON.parse(userString);

  return (
    <LayoutIntranet notifications={notifications} admin={user.admin}>
      <section className="">
        <div className="">
          <div className="grid grid-cols-1 grid-rows-3 md:grid-cols-3 md:grid-rows-1  h-full bg-secondary-1">
            <div className="relative flex flex-col items-center col-span-1 pt-12 pl-2 overflow-hidden ">
              <svg
                className="absolute left-0 md:-left-64 lg:-left-36 top-0 fill-primary-1 "
                width="504"
                height="773"
                viewBox="0 0 504 773"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M-44.0344 254.118C-49.6575 195.249 -196.249 -116.979 101.387 -79.973L503.761 -1.50977C482.005 26.0719 375.757 188.448 355.905 252.598C344.757 288.623 316.518 433.246 267.67 467.135C210.686 506.668 223.748 665.422 176.438 726.495C129.129 787.567 64.5561 775.547 28.9269 758.877C-6.70237 742.206 -67.2963 725.933 -82.805 671.058C-95.2119 627.157 -55.7542 551.868 -43.2952 456.607C-30.8362 361.347 -38.4113 312.988 -44.0344 254.118Z" />
              </svg>

              {/**Profile image */}
              <div className="relative flex justify-center w-56 h-64 md:top-16 md:ml-10 z-10">
                <ProfilePicture image={user.image} />
              </div>
            </div>

            <div className=" md:pr-16 pl-2 mt-8 md:col-span-2 row-span-2 flex flex-col  overflow-y-scroll lg:overflow-visible ">
              <h2 className="  font-bold uppercase align-middle">
                {user.firstname}s profil
              </h2>

              {/**Profile Information */}
              <div className="grid grid-rows-6 cols-2  ">
                <div className="flex flex-row ">
                  {/* Name */}
                  <div className="flex flex-col w-1/2 mt-4    ">
                    <p className="text-base pb-1 uppercase font-semibold  ">
                      Namn
                    </p>
                    <div className=" bg-secondary-l1/80  p-2 mr-2 md:mr-0">
                      <p>
                        {user.firstname} {user.lastname}
                      </p>
                    </div>
                  </div>
                  {/* Birthday */}
                  <div className="flex flex-col w-1/2 mt-4  md:ml-4 ml-2  ">
                    <p className="text-base pb-1 uppercase font-semibold ">
                      Födelsedatum
                    </p>
                    <div className="bg-secondary-l1/80  p-2 mr-2 md:mr-0">
                      <p>
                        {!!user.birthday ? user.birthday.split("T")[0] : ""}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-row ">
                  {/* Mail */}
                  <div className="flex flex-col w-1/2  mt-4  mr-2  ">
                    <p className="text-base pb-1 uppercase font-semibold  ">
                      Mail
                    </p>
                    <div className="bg-secondary-l1/80  p-2  mr-2 md:mr-0">
                      <p>{user.email}</p>
                    </div>
                  </div>
                  {/* Username */}
                  <div className="flex flex-col  w-1/2  mt-4 md:ml-4 ml-2  ">
                    <p className="text-base pb-1 uppercase font-semibold   ">
                      Användarnamn
                    </p>
                    <div className="bg-secondary-l1/80  p-2  mr-2 md:mr-0">
                      <p className="">{user.username}</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-row ">
                  {/* Privatenumber */}
                  <div className="flex flex-col  w-1/2  mt-4  mr-2 ">
                    <p className="text-base pb-1 uppercase font-semibold  ">
                      Privatnummer
                    </p>
                    <div className="bg-secondary-l1/80  p-2  mr-2 md:mr-0">
                      <p>{user.privatenumber}</p>
                    </div>
                  </div>
                  {/* Worknumber */}
                  <div className="flex flex-col  w-1/2  mt-4  md:ml-4 ml-2  ">
                    <p className="text-base pb-1 uppercase font-semibold ">
                      Jobbnummer
                    </p>
                    <div className="bg-secondary-l1/80  p-2  mr-2 md:mr-0">
                      <p>{user.worknumber}</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-row">
                  {/* Roll */}
                  <div className="flex flex-col  w-1/2  mt-4  mr-2  ">
                    <p className="text-base pb-1 uppercase font-semibold  ">
                      Roll
                    </p>
                    <div className="bg-secondary-l1/80  p-2  mr-2 md:mr-0">
                      <p>{user.role}</p>
                    </div>
                  </div>
                  {/* Company */}
                  <div className="flex flex-col  w-1/2  mt-4  md:ml-4 ml-2  ">
                    <p className="text-base pb-1 uppercase font-semibold  ">
                      Företag
                    </p>
                    <div className="bg-secondary-l1/80  p-2 mr-2 md:mr-0">
                      <p>{user.company}</p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-row row-span-2">
                  {/* Description */}
                  <div className="flex flex-col w-full overflow-y-auto mt-4  mr-2 md:mr:0 ">
                    <p className="text-base pb-1 uppercase font-semibold ">
                      Beskrivning
                    </p>
                    <div className="bg-secondary-l1/80  p-2 mr-2 md:mr-0">
                      <p>{user.description}</p>
                    </div>
                  </div>
                </div>

                {/* Address 
                <div className="flex flex-col w-full overflow-y-scroll mt-4  mr-2 md:mr-0">
                  <p className="font-semibold  uppercase  ">Adress</p>

                  <div className="bg-secondary-l1/80  p-2  mr-2 md:mr-0">
                    <p>{user.address}</p>
                  </div>
                </div>
                */}
              </div>
              <div className="flex justify-end mb-20 md:mb-12 ">
                <a
                  href={`./editProfile/${user.id}`}
                  className="btn btn-modify my-4 md:mx-0 mx-6 "
                >
                  Redigera
                </a>
              </div>
              <form
                className={"flex justify-end mb-0 md:mb-12 "}
                onSubmit={function (e) {
                  if (!confirm("Är du säker?")) {
                    e.preventDefault();
                  }
                }}
                action="../../../api/deleteUser"
                method="POST"
              >
                <input type="hidden" name="id" value={user.id} />
                <button className="btn mx-6 btn-delete" type="submit">
                  Radera anställd
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </LayoutIntranet>
  );
};

export default profile;
