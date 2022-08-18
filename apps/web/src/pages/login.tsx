import type { NextPage } from 'next';

import { FormEvent, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import clsx from 'clsx';
import Head from 'next/head';
import Link from 'next/link';

import { Layout } from '~/components/layout';
import { AlertDanger, AlertInfo, AlertSuccess } from '~/components/alerts';

import { useLoginMutation } from '~/domains/auth/hooks';
import { useFlashMessageStorage, useStorage, writeStorage } from '~/domains/storage/hooks';

import { UserNoPassword } from '~/repos/user';

const LoginPage: NextPage = () => {
  const router = useRouter();
  const loginMutation = useLoginMutation();
  const user = useStorage<UserNoPassword>('user');
  const loginRequiredFlash = useFlashMessageStorage<string>('loginRequired');

  const inputRememberRef = useRef<HTMLInputElement>(null);
  const inputEmailRef = useRef<HTMLInputElement>(null);
  const inputPasswordRef = useRef<HTMLInputElement>(null);

  const redirectTo = router.query.redirectTo || '/';

  useEffect(() => {
    void (async () => {
      if (router.isReady && user.isLoading === false && user.value !== null) {
        await router.push({
          pathname: redirectTo as string,
          query: router.query,
        });
      }
    })();
  }, [user, router, redirectTo]);

  useEffect(() => {
    if (loginMutation.error?.fields.email) {
      inputEmailRef.current?.focus();
    } else if (loginMutation.error?.fields.password) {
      inputPasswordRef.current?.focus();
    }
  }, [loginMutation.error]);

  function onSubmitLoginForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const { elements } = event.currentTarget;
    const $email = elements.namedItem('email') as HTMLInputElement;
    const $password = elements.namedItem('password') as HTMLInputElement;
    void (async () => {
      const req = await loginMutation.mutateAsync({
        email: $email.value,
        password: $password.value,
        remember: inputRememberRef.current ? inputRememberRef.current.checked : false,
      });

      writeStorage('user', req.results);

      await router.push({
        pathname: redirectTo as string,
        query: router.query,
      });
    })();
  }

  return (
    <Layout>
      <Head>
        <title>Login - Project Template</title>
        <meta name="description" content="Login" />
      </Head>

      <div className="flex min-h-full w-full max-w-md flex-col justify-center">
        {user.value ? (
          <AlertSuccess id="user-exists" label="Hello">
            <b>{user.value.email}</b>
          </AlertSuccess>
        ) : (
          <>
            {loginRequiredFlash && (
              <AlertDanger id="login-required-flash" className="mb-4">
                {loginRequiredFlash}
              </AlertDanger>
            )}
            <div className="mb-4 grid grid-cols-2 items-center">
              <h1 className="text-4xl font-semibold">Login</h1>
              {loginMutation.isLoading && (
                <AlertInfo id="verifying-credentials-info" className="justify-self-end">
                  Verifying...
                </AlertInfo>
              )}
              {loginMutation.error?.message && (
                <AlertDanger id="login-form-error" label="Login" className="justify-self-end">
                  {loginMutation.error?.message}
                </AlertDanger>
              )}
            </div>
            <form onSubmit={onSubmitLoginForm} noValidate>
              <fieldset
                className={clsx('space-y-6', {
                  'disabled:opacity-50': loginMutation.isLoading,
                  'disabled:opacity-25': loginMutation.isSuccess,
                })}
                disabled={loginMutation.isLoading || loginMutation.isSuccess}
              >
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email address
                  </label>
                  <div className="mt-1">
                    <input
                      ref={inputEmailRef}
                      id="email"
                      required
                      autoFocus={true}
                      name="email"
                      type="email"
                      autoComplete="email"
                      aria-invalid={loginMutation?.error?.fields?.email ? true : undefined}
                      aria-describedby="email-error"
                      className="w-full rounded border border-gray-500 px-2 py-1 text-lg"
                    />
                    {loginMutation?.error?.fields?.email && (
                      <AlertDanger id="email-error">{loginMutation?.error?.fields?.email}</AlertDanger>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <div className="mt-1">
                    <input
                      id="password"
                      ref={inputPasswordRef}
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      aria-invalid={loginMutation?.error?.fields?.password ? true : undefined}
                      aria-describedby="password-error"
                      className="w-full rounded border border-gray-500 px-2 py-1 text-lg"
                    />
                    {loginMutation?.error?.fields?.password && (
                      <AlertDanger id="password-error">{loginMutation?.error?.fields?.password}</AlertDanger>
                    )}
                  </div>
                </div>

                <input type="hidden" name="redirectTo" value={redirectTo} />
                <button
                  type="submit"
                  className="w-full rounded bg-blue-500 py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400"
                >
                  Log in
                </button>
                <div className="grid grid-cols-2">
                  <div className="items-start">
                    <div className="flex items-center">
                      <input
                        ref={inputRememberRef}
                        id="remember"
                        name="remember"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <label htmlFor="remember" className="ml-2 block text-sm text-gray-900">
                        Remember me
                      </label>
                    </div>
                  </div>
                  <div className="text-right text-sm text-gray-500">
                    <p>Don&rsquo;t have an account?</p>
                    <Link
                      href={{
                        pathname: '/signup',
                        query: router.query,
                      }}
                    >
                      <a className="text-blue-500 underline">Signup</a>
                    </Link>
                  </div>
                </div>
              </fieldset>
            </form>
          </>
        )}
      </div>
    </Layout>
  );
};

export default LoginPage;
