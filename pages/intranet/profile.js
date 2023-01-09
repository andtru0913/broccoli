import LayoutIntranet from "../../components/layout/layoutIntranet";
import { getNotifications, getUserProfile } from "../../Database";
import ProfilePicture from "../../components/ProfilePicture";
export async function getServerSideProps(context) {
  const cookies = JSON.parse(context.req.cookies["user"] || null);
  const user = !!cookies ? (await getUserProfile(cookies.id)) : null;
  return !user ?
      {
        redirect: {
          permanent: false,
          destination: "/intranet",
        },
        props: {},
      }
      :
      {
        props: {
          userString: JSON.stringify(user),
          notifications: JSON.stringify(await getNotifications(user.id))
        }
      }
}

const profile = ({ userString, notifications }) => {
  const user = JSON.parse(userString)
  return (
    <LayoutIntranet notifications={notifications} admin={user.admin}>
      <section className="">
        <div className="">
          <div className="grid grid-cols-1 grid-rows-2 md:grid-cols-3 md:grid-rows-1  h-screen bg-secondary-1">
            <div className="relative flex flex-col items-center  overflow-hidden ">
              {/**Profile image */}
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
              <div className="  md:mt-24 md:p-12 z-10">
                <ProfilePicture image={user.image} />
              </div>
            </div>
            <div className=" px-10 md:pr-16 pt-0 md:pt-24 pb-24 md:pb-0 md:col-span-2 flex flex-col  overflow-y-scroll lg:overflow-visible md:h-full p-2 ">
              {/**Profile Information */}
              <div className="flex flex-row flex-wrap py-4 border-primary-1 border-b border-base items-center">
                <div className="w-1/3 mr-16">
                  <p className="font-bold uppercase text-muted">Namn</p>
                </div>
                <div>
                  <h3>
                    {user.firstname} {user.lastname}
                  </h3>
                </div>
              </div>
              <div className="flex flex-row py-4 border-b border-base items-center">
                <div className="w-1/3  mr-16 ">
                  <p className="font-bold uppercase text-muted">Födelsedatum</p>
                </div>
                <div>
                  <p>{user.birthday.split("T")[0]}</p>
                </div>
              </div>
              <div className="flex flex-row py-4 border-primary-1 border-b border-base items-center">
                <div className="w-1/3  mr-16 ">
                  <p className="font-bold uppercase text-muted">Användarnamn</p>
                </div>
                <div>
                  <p>{user.username}</p>
                </div>
              </div>
              <div className="flex flex-row py-4 border-primary-1 border-b border-base items-center">
                <div className="w-1/3  mr-16">
                  <p className="font-bold uppercase text-muted">Roll</p>
                </div>
                <div>
                  <p>{user.role}</p>
                </div>
              </div>
              <div className="flex flex-row py-4 border-primary-1 border-b border-base items-center">
                <div className="w-1/3  mr-16">
                  <p className="font-bold uppercase text-muted">Företag</p>
                </div>
                <div>
                  <p>{user.company}</p>
                </div>
              </div>
              <div className="flex flex-row py-4 border-primary-1 border-b border-base items-center">
                <div className="w-1/3  mr-16">
                  <p className="font-bold uppercase text-muted">Beskrivning</p>
                </div>
                <div>
                  <p>{user.description}</p>
                </div>
              </div>
              <div className="flex flex-row py-4 border-primary-1 border-b border-base items-center">
                <div className="w-1/3  mr-16">
                  <p className="font-bold uppercase text-muted">Email</p>
                </div>
                <div>
                  <p>{user.email}</p>
                </div>
              </div>
              <div className="flex flex-row py-4 border-primary-1 border-b border-base items-center">
                <div className="w-1/3  mr-16">
                  <p className="font-bold uppercase text-muted">Adress</p>
                </div>
                <div>
                  <p>{user.address}</p>
                </div>
              </div>
              <div className="flex flex-row py-4 border-primary-1 border-b border-base items-center">
                <div className="w-1/3  mr-16">
                  <p className="font-bold uppercase text-muted">Privatnummer</p>
                </div>
                <div>
                  <p>{user.privatenumber}</p>
                </div>
              </div>
              <div className="flex flex-row py-4 border-primary-1 border-b border-base items-center">
                <div className="w-1/3  mr-16">
                  <p className="font-bold uppercase text-muted">Jobbnummer</p>
                </div>
                <div>
                  <p>{user.worknumber}</p>
                </div>
              </div>

              <div className="flex justify-end">
                <a href="./editProfile" className="btn btn-modify my-4">
                  Redigera
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </LayoutIntranet>
  );
};

export default profile;
