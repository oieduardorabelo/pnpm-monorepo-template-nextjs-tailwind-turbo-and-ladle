import type { NextPage } from 'next';

import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { Layout } from '~/components/layout';
import { useStorage, writeFlashMessage } from '~/domains/storage/hooks';
import { UserNoPassword } from '~/repos/user';

const HomePage: NextPage = () => {
  const router = useRouter();
  const user = useStorage<UserNoPassword>('user');

  useEffect(() => {
    void (async () => {
      if (router.isReady && user.isLoading === false && user.value === null) {
        writeFlashMessage('loginRequired', 'Login is required to have access to this page.');
        await router.push({
          pathname: '/login',
          query: { redirectTo: '/users' },
        });
      }
    })();
  }, [user, router]);

  return (
    <Layout>
      <Head>
        <title>Users - Project Template</title>
        <meta name="description" content="Welcome to Project Template" />
      </Head>

      {user.value === null && <div>Verifying credentials...</div>}
      {user.value && <b>{user.value.username}</b>}
    </Layout>
  );
};

export default HomePage;
