import '@/styles/globals.scss'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react';
import { Toaster } from "@/components/ui/toaster"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient()

export default function App({ Component, pageProps: { session, ...pageProps} }: AppProps) {
  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <Toaster />
        <Component {...pageProps} />
      </QueryClientProvider>
    </SessionProvider>
  )
}
