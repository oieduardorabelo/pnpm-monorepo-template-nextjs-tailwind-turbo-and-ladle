import type { FC, PropsWithChildren } from 'react';

import Image from 'next/image';

import { Navigation } from '~/components/navigation';

export const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="h-screen flex flex-col">
      <header>
        <Navigation />
      </header>
      <main className="p-4 flex flex-1 flex-col justify-center items-center">{children}</main>
      <footer className="flex justify-center p-4 bg-gray-100 border-t border-gray-300">
        <a href="https://vercel.com" target="_blank" rel="noopener noreferrer">
          <span>Powered by</span>
          <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
        </a>
      </footer>
    </div>
  );
};
