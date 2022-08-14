import type { NextPage } from 'next';

import Head from 'next/head';

import { Layout } from '~/components/layout';

const HomePage: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>Home - Project Template</title>
        <meta name="description" content="Welcome to Project Template" />
      </Head>

      <h1 className="text-center">Welcome to Project Template</h1>
    </Layout>
  );
};

export default HomePage;
