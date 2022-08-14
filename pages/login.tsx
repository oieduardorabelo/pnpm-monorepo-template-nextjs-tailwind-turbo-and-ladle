import type { NextPage } from "next";
import Head from "next/head";

import { Layout } from "~/components/layout";

const LoginPage: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>Login - React project template</title>
        <meta name="description" content="Login" />
      </Head>

      <h1 className="text-center">Welcome to React project template</h1>
    </Layout>
  );
};

export default LoginPage;
