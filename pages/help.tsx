import { NextPage } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const Help: NextPage = () => {
    return <h1>Help!</h1>
}

export const getStaticProps = async (params: { locale: string }) => {
    return {
        props: {
            ...(await serverSideTranslations(params.locale, ['common'])),
        },
    }
}

export default Help
