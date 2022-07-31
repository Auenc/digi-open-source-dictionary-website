import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import {
    CreateGetServerSideProps,
    WordPage,
    WordPageProps,
} from '../../components/word-page/word-page.factory'

const dict = 'br'
export const getServerSideProps = async (
    context: GetServerSidePropsContext
) => {
    const { locale } = context
    const wordProps: WordPageProps = await CreateGetServerSideProps(dict, context)

    return {
        props: {
            ...wordProps,
            ...(await serverSideTranslations(locale as string, ['common', 'home'])),
        }
    }
}

export default WordPage
