import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { CookiesProvider } from 'react-cookie';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { refetchOnWindowFocus: false },
  },
});

type CustomAppProps = Omit<AppProps, 'pageProps'> & {
  pageProps: Record<string, never>;
};
function _app({ Component, pageProps }: CustomAppProps) {
  return (
    <CookiesProvider>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
        <ReactQueryDevtools position="bottom-right" />
      </QueryClientProvider>
    </CookiesProvider>
  );
}

export default _app;
