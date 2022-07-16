import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Layout } from '../components/layout'
import { appWithTranslation } from 'next-i18next'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Layout></Layout>
      <Component {...pageProps} />
    </>
  )
}

export default appWithTranslation(MyApp)
