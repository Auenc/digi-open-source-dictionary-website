import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Layout } from '../components/layout'
import { appWithTranslation } from 'next-i18next'
import { LanguageContext } from '../contexts/language'
import { useEffect, useState } from 'react'
import {
    LanguageFromCode,
    LanguageWelsh,
    SupportedLanguages,
} from '../services/languages'
import { Language } from '../models/language'
import { NextRouter, useRouter, withRouter } from 'next/router'

const isWordPage = (router: NextRouter): boolean =>
    router.pathname.includes('[word]')

const isDictIndex = (router: NextRouter): boolean => router.pathname.length <= 4

const getInitialLanguage = (router: NextRouter): Language => {
    // check if path is word-info
    if (!isWordPage(router) && !isDictIndex(router)) {
        return LanguageWelsh
    }
    const lang = router.pathname.replaceAll('[word]', '').replaceAll('/', '')
    const language = LanguageFromCode(lang)
    if (!language) {
        return LanguageWelsh
    }
    return language
}

function MyApp({ Component, pageProps }: AppProps) {
    const router = useRouter()

    const initialLanguage = getInitialLanguage(router)
    const [language, setLanguage] = useState<Language>(initialLanguage)
    if (
        (isWordPage(router) || isDictIndex(router)) &&
        language.code !== initialLanguage.code
    ) {
        setLanguage(initialLanguage)
    }

    const { pathname, locale } = router

    useEffect(() => {
        if (pathname === '') {
            router.push(`/${locale}/cy/`)
        }
    }, [pathname, locale, router])

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
