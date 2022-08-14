import "../styles/globals.css";
import type { AppProps } from "next/app";
import { CookiesProvider } from "react-cookie";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { refetchOnWindowFocus: false },
  },
});

type CustomAppProps = Omit<AppProps, "pageProps"> & {
  pageProps: {
    dehydratedState: unknown;
  };
};
function _app({ Component, pageProps }: CustomAppProps) {
  const { dehydratedState, ...restProps } = pageProps;
  return (
    <CookiesProvider>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={dehydratedState}>
          <Component {...restProps} />
        </Hydrate>
        <ReactQueryDevtools position="bottom-right" />
      </QueryClientProvider>
    </CookiesProvider>
  );
}

export default _app;
