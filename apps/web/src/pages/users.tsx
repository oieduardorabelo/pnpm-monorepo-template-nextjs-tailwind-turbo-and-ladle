import type { NextPage } from 'next';

import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { Layout } from '~/components/layout';
import { useStorage, writeFlashMessage } from '~/domains/storage/hooks';
import { useUsersQuery } from '~/domains/user/hooks';
import { UserNoPassword } from '~/repos/user';

const HomePage: NextPage = () => {
  const router = useRouter();
  const user = useStorage<UserNoPassword>('user');
  const usersQuery = useUsersQuery({
    enabled: Boolean(user.value),
    keepPreviousData: true,
  });

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
      {user.value && usersQuery.isSuccess && (
        <>
          <p className="mb-8">
            Hello, <b>{user.value.username}</b>. Today is <b>{new Date().toDateString()}</b>
          </p>
          {usersQuery.data.length > 0 && (
            <table className="table-fixed">
              <thead className="border-b bg-gray-100">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">#</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Username</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Email</th>
                </tr>
              </thead>
              <tbody>
                {usersQuery.data.map((user) => (
                  <tr key={user.id} className="border-b">
                    <td className="whitespace-nowrap px-6 py-4 text-sm font-semibold text-gray-900">
                      {user.id.slice(0, 6)}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm font-light text-gray-900">{user.username}</td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm font-light text-gray-900">{user.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </>
      )}
    </Layout>
  );
};

export default HomePage;
