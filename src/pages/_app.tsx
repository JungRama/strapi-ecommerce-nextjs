import LayoutMain from '@/components/layouts'
import '@/styles/globals.scss'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <LayoutMain>
      <Component {...pageProps} />
    </LayoutMain>
  )
}
