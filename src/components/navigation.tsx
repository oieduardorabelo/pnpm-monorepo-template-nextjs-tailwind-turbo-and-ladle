import { PropsWithChildren, SyntheticEvent } from 'react';
import { useRouter } from 'next/router';
import clsx from 'clsx';
import Link from 'next/link';

import { useStorage, deleteFromStorage } from '~/domains/storage/hooks';

import { UserNoPassword } from '~/repos/user';

export const Navigation = () => {
  const router = useRouter();
  const user = useStorage<UserNoPassword>('user');
  function onClickLogout(event: SyntheticEvent<HTMLButtonElement>) {
    event.preventDefault();
    void (async () => {
      deleteFromStorage('user');
      await router.push({
        pathname: '/login',
        query: router.query,
      });
    })();
  }
  return (
    <nav className="grid grid-cols-2">
      <ul className="flex flex-1 justify-center justify-self-end gap-4">
        <li>
          <ActiveLink href="/">Home</ActiveLink>
        </li>
        {user === null && (
          <>
            <li>
              <ActiveLink href="/login">Login</ActiveLink>
            </li>
            <li>
              <ActiveLink href="/signup">Signup</ActiveLink>
            </li>
          </>
        )}
      </ul>
      {user && (
        <ul className="flex flex-1 justify-center justify-self-end gap-4">
          <li>
            <span className="bg-orange-200 text-orange-800 py-2 px-4 inline-block">
              Hello, <b>{user.username}</b>
            </span>
          </li>
          <li>
            <button type="button" onClick={onClickLogout} className="py-2 px-4 inline-block bg-red-100 text-red-800">
              Logout
            </button>
          </li>
        </ul>
      )}
    </nav>
  );
};

type ActiveLinkProps = PropsWithChildren & {
  href: string;
};
function ActiveLink({ children, href }: ActiveLinkProps) {
  const router = useRouter();
  return (
    <Link href={href}>
      <a
        className={clsx('py-2 px-4 inline-block', {
          'hover:text-white hover:bg-blue-500': router.pathname !== href,
          'bg-blue-500 text-white hover:bg-blue-600': router.pathname === href,
        })}
      >
        {children}
      </a>
    </Link>
  );
}
