import type { FC, PropsWithChildren } from 'react';
import Image from 'next/image';

export const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <main className="h-screen p-4 flex flex-1 flex-col justify-center items-center">{children}</main>
      <footer className="flex flex-1 justify-center p-4 bg-gray-100 border-t border-gray-300">
        <a href="https://vercel.com" target="_blank" rel="noopener noreferrer">
          <span>Powered by</span>
          <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
        </a>
      </footer>
    </>
  );
};
