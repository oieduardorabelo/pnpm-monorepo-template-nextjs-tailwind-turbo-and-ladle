import type { NextPage } from 'next';

import Head from 'next/head';

import { Layout } from '~/components/layout';
import { useStorage } from '~/domains/storage/hooks';
import { UserNoPassword } from '~/repos/user';

const HomePage: NextPage = () => {
  const user = useStorage<UserNoPassword>('user');
  return (
    <Layout>
      <Head>
        <title>Home - Project Template</title>
        <meta name="description" content="Welcome to Project Template" />
      </Head>

      <h1 className="text-center">Welcome to Project Template</h1>
      {user && (
        <h2 className="text-lg bg-slate-200 px-2 rounded mt-4">
          Hello there, <b>{user.username}</b>. Let&apos;s build somethingn new!
        </h2>
      )}
    </Layout>
  );
};

export default HomePage;
