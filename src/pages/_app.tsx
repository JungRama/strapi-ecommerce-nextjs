import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "@/components/ui/toaster";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Head from "next/head";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
        <Toaster />
        <Head>
          <title>
            Sneakpeaks - Starter ecommerce Integration for NextJS and Strapi
          </title>
          <meta
            name="description"
            content="Starter ecommerce Integration for NextJS and Strapi, Including payment with Stripe and tracking parcel with easypost "
          />
          <link rel="shortcut icon" href="/favicon.png" type="image/x-icon" />
        </Head>
        <Component {...pageProps} />
      </QueryClientProvider>
    </SessionProvider>
  );
}
