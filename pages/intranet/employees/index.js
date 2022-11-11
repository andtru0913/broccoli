import {getUserOverview} from "../../../Database";
import LayoutIntranet from "../../../components/layout/layoutIntranet";
import ProfilePicture from "../../../components/ProfilePicture";

export async function getServerSideProps() {
    let user = await getUserOverview()
    return {
        props: {user: user}
    }
}

export default function Home({user}) {
    console.log(user)
    return (
        <LayoutIntranet>
            {user.map((u,i) =>
                <a href={`./employees/${u.email}`}>
                    <div className="w-12 h-auto" key={i}>
                        <ProfilePicture image={u.image}/>
                        <div className={"flex-row w-12"}>
                            {u.firstname} {u.lastname}
                        </div>

                    </div>
                </a>

            )}
        </LayoutIntranet>
    )
}
