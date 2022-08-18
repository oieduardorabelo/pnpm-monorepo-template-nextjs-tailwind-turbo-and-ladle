import type { FC, PropsWithChildren } from 'react';

import Image from 'next/image';

import { Navigation } from '~/components/navigation';

export const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="flex h-screen flex-col">
      <header className="border-b border-gray-300 bg-gray-100">
        <Navigation />
      </header>
      <main className="flex flex-1 flex-col items-center justify-center p-4">{children}</main>
      <footer className="flex justify-center border-t border-gray-300 bg-gray-100 p-4">
        <a className="flex items-center" href="https://vercel.com" target="_blank" rel="noopener noreferrer">
          <span>Powered by</span>
          <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
        </a>
      </footer>
    </div>
  );
};
