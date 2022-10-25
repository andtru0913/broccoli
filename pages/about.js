import Image from "next/image";
import Layout from "../components/layout/layout";
import Historia from "./historia";


export default function About() {

    return (
        <Layout>
            <section className="bg-purple-1">
                <div className="layout h-screen py-12 flex flex-1 justify-center">
                    <h1>Om OSS</h1>
                </div>
            </section>
            <section className="">
                <div className="layout h-screen py-12 flex flex-1 justify-center">
                <Historia />
                </div>
            </section>
           
        </Layout>
    );
}