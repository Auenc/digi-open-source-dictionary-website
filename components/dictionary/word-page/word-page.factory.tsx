import {
    GetServerSideProps,
    GetServerSidePropsContext,
    GetServerSidePropsResult,
    NextPage,
} from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import { Word } from 'osdpjs'
import { SearchWord } from '../../../services/languages'
import { WordSearch } from '../../word-search'
import styles from '../../../styles/word.module.css'
import Head from 'next/head'
import { WordInfo } from '../../word-info'

type getServerProps = (
    dict: string,
    context: GetServerSidePropsContext
) => Promise<WordPageProps>

export const CreateGetServerSideProps: getServerProps = async (
    dict: string,
    context: GetServerSidePropsContext
): Promise<WordPageProps> => {
    let { type, search, word } = context.query

    if (!word) {
        word = ''
    }
    if (!type) {
        type = 'verb'
    }
    if (!search) {
        search = 'false'
    }
    const wordResult = await SearchWord(
        dict,
        search as string,
        word as string,
        type as string
    )
    return {
        wordToSearch: word as string,
        type: type as string,
        search: search as string,
        result: wordResult,
    }
}

export interface WordPageProps {
    wordToSearch: string
    type: string
    search: string
    result: Word | null
}

export const WordPage: NextPage<WordPageProps> = (props) => {
    const { wordToSearch, type, search, result } = props
    const router = useRouter()
    const { locale } = router
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
                {result && <WordInfo word={result} />}
            </div>
        </>
    )
}
