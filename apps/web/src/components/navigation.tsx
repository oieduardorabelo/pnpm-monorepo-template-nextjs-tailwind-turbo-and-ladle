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
      await router.push({
        pathname: '/',
      });
      deleteFromStorage('user');
    })();
  }
  return (
    <nav className="grid grid-cols-2">
      <ul className="flex flex-1 justify-center gap-4 justify-self-end">
        <li>
          <ActiveLink href="/">Home</ActiveLink>
        </li>
        {user.value && (
          <>
            <li>
              <ActiveLink href="/users">Users</ActiveLink>
            </li>
          </>
        )}
        {user.value === null && (
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
      {user.value && (
        <ul className="flex flex-1 justify-center gap-4 justify-self-end">
          <li>
            <span className="inline-block bg-orange-200 py-2 px-4 text-orange-800">
              Hello, <b>{user.value.username}</b>
            </span>
          </li>
          <li>
            <button type="button" onClick={onClickLogout} className="inline-block bg-red-100 py-2 px-4 text-red-800">
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
        className={clsx('inline-block py-2 px-4', {
          'hover:bg-blue-500 hover:text-white': router.pathname !== href,
          'bg-blue-500 text-white hover:bg-blue-600': router.pathname === href,
        })}
      >
        {children}
      </a>
    </Link>
  );
}
