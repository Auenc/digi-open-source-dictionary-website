import { NextPage } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const Translations: NextPage = () => {
    return <h1>Translations!</h1>
}

export const getStaticProps = async (params: { locale: string }) => {
    return {
        props: {
            ...(await serverSideTranslations(params.locale, ['common'])),
        },
    }
}

export default Translations
