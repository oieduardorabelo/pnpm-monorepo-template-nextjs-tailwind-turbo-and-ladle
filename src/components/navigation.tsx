import type { FC, PropsWithChildren } from 'react';

import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';

export const Navigation: FC = () => {
  return (
    <nav>
      <ul className="flex flex-1 justify-center p-4 bg-gray-100 border-b border-gray-300">
        <li>
          <ActiveLink href="/">Home</ActiveLink>
        </li>
        <li>
          <ActiveLink href="/login">Login</ActiveLink>
        </li>
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
        className={clsx('py-2 px-4', {
          'rounded bg-blue-500 text-white hover:bg-blue-600 focus:bg-blue-400': router.pathname == href,
        })}
      >
        {children}
      </a>
    </Link>
  );
}
