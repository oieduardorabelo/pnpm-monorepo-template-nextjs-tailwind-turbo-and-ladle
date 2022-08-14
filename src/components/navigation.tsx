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
    <nav>
      <ul className="flex flex-1 justify-center p-4 bg-gray-100 border-b border-gray-300">
        <li>
          <ActiveLink href="/">Home</ActiveLink>
        </li>
        <li>
          <ActiveLink href="/login">Login</ActiveLink>
        </li>
        <li>
          <ActiveLink href="/signup">Signup</ActiveLink>
        </li>
        {user && (
          <>
            <li>
              <span className="rounded bg-orange-200 text-orange-800 p-2">Hello, {user.email}</span>
            </li>
            <li>
              <button type="button" onClick={onClickLogout}>
                Logout
              </button>
            </li>
          </>
        )}
      </ul>
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
        className={clsx('rounded py-2 px-4', {
          'hover:text-white hover:bg-blue-500': router.pathname !== href,
          'bg-blue-500 text-white hover:bg-blue-600': router.pathname === href,
        })}
      >
        {children}
      </a>
    </Link>
  );
}
