import type { NextPage } from 'next';

import { FormEvent, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import clsx from 'clsx';
import Head from 'next/head';
import Link from 'next/link';

import { AlertDanger, AlertInfo, AlertSuccess } from '~/components/alerts';
import { Layout } from '~/components/layout';

import { useSignupMutation } from '~/domains/auth/hooks';
import { useStorage, writeStorage } from '~/domains/storage/hooks';

import { UserNoPassword } from '~/repos/user';

const Signup: NextPage = () => {
  const router = useRouter();
  const signupMutation = useSignupMutation();
  const user = useStorage<UserNoPassword>('user');

  const inputEmailRef = useRef<HTMLInputElement>(null);
  const inputPasswordRef = useRef<HTMLInputElement>(null);
  const inputUserNameRef = useRef<HTMLInputElement>(null);

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
    if (signupMutation.error?.fields?.email) {
      inputEmailRef.current?.focus();
    } else if (signupMutation.error?.fields?.password) {
      inputPasswordRef.current?.focus();
    } else if (signupMutation.error?.fields?.username) {
      inputUserNameRef.current?.focus();
    }
  }, [signupMutation.error]);

  function onSubmitLoginForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const { elements } = event.currentTarget;
    const $username = elements.namedItem('username') as HTMLInputElement;
    const $email = elements.namedItem('email') as HTMLInputElement;
    const $password = elements.namedItem('password') as HTMLInputElement;
    void (async () => {
      const req = await signupMutation.mutateAsync({
        username: $username.value,
        email: $email.value,
        password: $password.value,
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
            <div className="mb-4 grid grid-cols-2 items-center">
              <h1 className="text-4xl font-semibold">Signup</h1>
              {signupMutation.isLoading && (
                <AlertInfo id="verifying-credentials-info" className="justify-self-end">
                  Creating...
                </AlertInfo>
              )}
              {signupMutation.error?.message && (
                <AlertDanger id="login-form-error" label="Signup" className="justify-self-end">
                  {signupMutation.error?.message}
                </AlertDanger>
              )}
            </div>
            <form onSubmit={onSubmitLoginForm} noValidate>
              <fieldset
                className={clsx('space-y-6', {
                  'disabled:opacity-50': signupMutation.isLoading,
                })}
                disabled={signupMutation.isLoading}
              >
                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                    Username
                  </label>
                  <div className="mt-1">
                    <input
                      ref={inputUserNameRef}
                      id="username"
                      required
                      autoFocus={true}
                      name="username"
                      type="text"
                      aria-invalid={signupMutation?.error?.fields?.username ? true : undefined}
                      aria-describedby="username-error"
                      className="w-full rounded border border-gray-500 px-2 py-1 text-lg"
                    />
                    {signupMutation?.error?.fields?.username && (
                      <AlertDanger id="username-error">{signupMutation?.error?.fields?.username}</AlertDanger>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email address
                  </label>
                  <div className="mt-1">
                    <input
                      ref={inputEmailRef}
                      id="email"
                      required
                      name="email"
                      type="email"
                      autoComplete="email"
                      aria-invalid={signupMutation?.error?.fields?.email ? true : undefined}
                      aria-describedby="email-error"
                      className="w-full rounded border border-gray-500 px-2 py-1 text-lg"
                    />
                    {signupMutation?.error?.fields?.email && (
                      <AlertDanger id="email-error">{signupMutation?.error?.fields?.email}</AlertDanger>
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
                      aria-invalid={signupMutation?.error?.fields?.password ? true : undefined}
                      aria-describedby="password-error"
                      className="w-full rounded border border-gray-500 px-2 py-1 text-lg"
                    />
                    {signupMutation?.error?.fields?.password && (
                      <AlertDanger id="password-error">{signupMutation?.error?.fields?.password}</AlertDanger>
                    )}
                  </div>
                </div>

                <input type="hidden" name="redirectTo" value={redirectTo} />
                <button
                  type="submit"
                  className="w-full rounded bg-blue-500 py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400"
                >
                  Create Account
                </button>
                <div className="text-right text-sm text-gray-500">
                  <p>Already have an account?</p>
                  <Link
                    href={{
                      pathname: '/login',
                      query: router.query,
                    }}
                  >
                    <a className="text-blue-500 underline">Login</a>
                  </Link>
                </div>
              </fieldset>
            </form>
          </>
        )}
      </div>
    </Layout>
  );
};

export default Signup;
