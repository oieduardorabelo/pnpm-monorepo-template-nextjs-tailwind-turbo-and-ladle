import type { NextPage } from "next";
import Head from "next/head";

import { Layout } from "~/components/layout";

const HomePage: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>Home - React project template</title>
        <meta name="description" content="Welcome to React project template" />
      </Head>

      <h1 className="text-center">Welcome to React project template</h1>
    </Layout>
  );
};

export default HomePage;
