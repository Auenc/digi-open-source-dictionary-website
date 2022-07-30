import { NextPage } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const About: NextPage = () => {
    return <h1>About</h1>
}

export const getStaticProps = async (params: { locale: string }) => {
    return {
        props: {
            ...(await serverSideTranslations(params.locale, ['common'])),
        },
    }
}

export default About
