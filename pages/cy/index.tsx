import { Index } from '../../components/dictionary/index'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export const getStaticProps = async (params: { locale: string }) => {
    return {
        props: {
            ...(await serverSideTranslations(params.locale, ['common'])),
        },
    }
}

export default Index
