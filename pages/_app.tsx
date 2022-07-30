import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Layout } from '../components/layout'
import { appWithTranslation } from 'next-i18next'
import { LanguageContext } from '../contexts/language'
import { useState } from 'react'
import { LanguageWelsh } from '../services/languages'
import { Language } from '../models/language'

function MyApp({ Component, pageProps }: AppProps) {
  const [ language, setLanguage] = useState<Language>(LanguageWelsh)
  return (
    <>
      <LanguageContext.Provider value={{language: language, changeLanguage: setLanguage}}>
      <Layout></Layout>
      <Component {...pageProps} />
      </LanguageContext.Provider>
    </>
  )
}

export default appWithTranslation(MyApp)
