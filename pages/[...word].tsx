import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'
import { Word } from 'osdpjs'
import { WordInfo } from '../components/word-info'
import { WordSearch } from '../components/word-search'
import { SearchWord } from '../services/languages'
import styles from '../styles/word.module.css'

export const getServerSideProps: GetServerSideProps = async (
    context: GetServerSidePropsContext
) => {
    let [dict, word] = context.query.word as string[]
    let { type, search } = context.query
    const { locale } = context
    if (!word) {
        word = ''
    }
    if (!type) {
        type = 'verb'
    }
    if (!search) {
        search = 'false'
    }
    if (!dict) {
        dict = 'cy'
    }
    const wordResult = await SearchWord(
        dict as string,
        search as string,
        word as string,
        type as string
    )

    console.log('got my word bro', dict, word)

    return {
        props: {
            wordToSearch: word,
            type: type,
            search: search,
            result: wordResult,
            ...(await serverSideTranslations(locale as string, [
                'common',
                'home',
            ])),
        },
    }
}

export interface WordPageProps {
    wordToSearch: string
    type: string
    search: string
    result: Word
}

export const WordPage: NextPage<WordPageProps> = ({
    wordToSearch,
    type,
    search,
    result,
}) => {
    console.log('result', result)
    return (
        <>
            <WordSearch
                initialSearchSelect={search}
                initialWordToSearch={wordToSearch}
                initialWordType={type}
                result={result}
            />
            <div className={styles.container}>
                <Head>
                    <title>Open Celtic Dictionary; Digi Web-Interface</title>
                    <meta
                        name="description"
                        content="Generated by create next app"
                    />
                    <link rel="icon" href="/digi_v2.png" />
                </Head>
                <WordInfo word={result} />
            </div>
        </>
    )
}

export default WordPage
