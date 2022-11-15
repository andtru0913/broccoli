import LayoutIntranet from '../../../components/layout/layoutIntranet';
import * as Database from "../../../Database";

export async function getServerSideProps(context) {
    let cookies = JSON.parse(context.req.cookies['user'] || null)
    let user = await Database.getUserinfo(cookies.id)
    if (cookies !== {} || user !== null) {
        let data = await Database.getAllDocuments()
        return {
            props: {
                admin: user.admin,
                data: data,
            }
        }
    }
    return {
        redirect: {
            permanent: false,
            destination: "/intranet",
        },
        props:{},
    }
}

export default function Home({ admin,data }) {
    let button = ""
    if (admin) {
        const convertBase64 = (file) => {
            return new Promise((resolve, reject) => {
                const fileReader = new FileReader();
                fileReader.readAsDataURL(file);

                fileReader.onload = () => {
                    resolve(fileReader.result);
                };

                fileReader.onerror = (error) => {
                    reject(error);
                };
            });
        };
        button = (
            <form method={"POST"} action={"../api/createDocument"}>
                <input type="hidden" id="base64" name="base64"/>
                <input type="text" placeholder="Titel" name="title"/>
                <input className="form-control block w-full px-3 py-1.5 text-base font-normal text-skin-muted  bg-clip-padding border border-solid border-skin-border rounded transition ease-in-out m-0 focus:text-skin-muted focus:bg-skin-fill focus:border-skin-secondary focus:outline-none" type="file" id="file" name="file" onChange={async function() {
                    let submit = document.getElementById("submit")
                    submit.disabled = true;
                    const f = document.querySelector('#file').files[0];
                    document.getElementById("base64").value = await convertBase64(f)
                    submit.disabled = false;
                }}/>
                <button id="submit" type="submit">
                    Nytt inlägg
                </button>
            </form>
            )
        }
        return (
            <LayoutIntranet>
                <main className=''>
                    <div className='layout py-20 md:py-12  flex flex-col items-center'>
                        <section>
                            {button}
                            {data.map((doc) =>
                                (<div>
                                    <a href={`./dokument/${doc.id}`}>
                                        {doc.title} <br/>
                                        {doc.date}
                                    </a>
                                </div>)
                            )}
                        </section>

                    </div>
                </main>

            </LayoutIntranet>

        );
}
