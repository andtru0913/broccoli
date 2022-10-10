import Link from 'next/link'
import Head from 'next/head'
import Script from 'next/script';
import Layout from '../../components/layout';

export default function FirstPost() {
  return (
    <Layout>
    <Head>
      <title>First Service</title>
    </Head>
    <h1>First Service</h1>
    <h2>
      <Link href="/">
        <a>Back to home</a>
      </Link>
    </h2>
  </Layout>
  );
}