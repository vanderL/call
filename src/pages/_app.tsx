import type { AppProps } from 'next/app'
import { globalStyles } from '@/src/styles/global'

globalStyles()

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
