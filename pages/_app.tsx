import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Layout } from '../components/layout'
import { appWithTranslation } from 'next-i18next'
import { LanguageContext } from '../contexts/language'
import { useState } from 'react'
import { LanguageFromCode, LanguageWelsh, SupportedLanguages } from '../services/languages'
import { Language } from '../models/language'
import { useRouter, withRouter } from 'next/router'

function MyApp({ Component, pageProps }: AppProps) {
    const router = useRouter()
    const { dict } = router.query
    const initialLanguage =
        SupportedLanguages.find((lang) => lang.code === dict) || LanguageWelsh
    const [language, setLanguage] = useState<Language>(initialLanguage)
    if(dict && language.code !== dict) {
        const newLanguage = LanguageFromCode(dict as string)
        if(newLanguage) {
            setLanguage(newLanguage)
        }
    }
    return (
        <>
            <LanguageContext.Provider
                value={{ language: language, changeLanguage: setLanguage }}
            >
                <Layout></Layout>
                <Component {...pageProps} />
            </LanguageContext.Provider>
        </>
    )
}

export default withRouter(appWithTranslation(MyApp))
