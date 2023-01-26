import LayoutIntranet from "../../../components/layout/layoutIntranet";
import {getAllNews, getNotifications, getUserinfo} from "../../../Database";
import {verify} from "../../../tokens";

export async function getServerSideProps(context) {
  const user_id = await verify(JSON.parse(context.req.cookies["token"] || null))
  const user = await getUserinfo(user_id);
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
          admin: user.admin,
          news: JSON.stringify(await getAllNews(true)),
          notifications: JSON.stringify(await getNotifications(user.id)),
        }
      }
}

export default function Home({ admin, notifications, news }) {
  let data = JSON.parse(news)
  return (
    <LayoutIntranet admin={admin} notifications={notifications}>
      <main className="">
        <div className="layout py-20 md:py-12  flex flex-col items-center">
          <section>
            <table style={{width: "60vw"}}>
              <thead>
              <tr className={"border-b"}>
                <th className={"text-left"}>
                  Title
                </th>
                <th className={"text-left"}>
                  Date
                </th>
                {admin ?
                  <>
                    <th/>
                    <th/>
                  </>
                :""}
              </tr>
              </thead>
              <tbody>
              {data.map((item, i) => (
                    <tr className={"cursor-pointer"} onClick={function() {window.location.href = `../news/${item.file}`}} key={i}>
                      <td className={"p-2"}>{item.file.split(".").shift()}</td>
                      <td className={"p-2"}>{item.date.toLocaleString().split("T")[0]}</td>
                      {admin ?
                          <>
                            <td>
                              <form className={"flex flex-row items-center"} method={"POST"} action={"../../api/admin/deleteNews"}>
                                <input type={"hidden"} name={"id"} value={item.id} />
                                <input type={"hidden"} name={"redirect"} value={"../../intranet/news/archive"} />
                                <button className={"mx-auto"} type={"submit"}>Radera</button>
                              </form>
                            </td>
                            <td>
                            {admin ?
                                <form className={"flex flex-row items-center"} method={"POST"} action={"../../api/admin/removeArchive"}>
                                  <input type={"hidden"} name={"id"} value={item.id} />
                                  <input type={"hidden"} name={"redirect"} value={"../../intranet/news/archive"} />
                                  <button className={"mx-auto"} type={"submit"}>Ångra arkiv</button>
                                </form>
                                :
                                ""}
                            </td>
                          </>

                      :""}
                    </tr>


              ))}
          </tbody>
            </table>
          </section>
        </div>
      </main>
    </LayoutIntranet>
  );
}
