import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { Word } from 'osdpjs'
import { ChangeEvent, ChangeEventHandler, FormEvent, useContext, useState } from 'react'
import { LanguageContext } from '../contexts/language'
import { Language } from '../models/language'
import { SupportedWordTypes } from '../models/words'
import { LanguageFromCode, SupportedLanguages } from '../services/languages'
import styles from '../styles/word-search.module.css'

export interface WordSearchProps {
    initialWordType: string
    initialSearchSelect: string
    initialWordToSearch: string
    result: Word | null | undefined
}

export const WordSearch: React.FC<WordSearchProps> = ({
    initialWordType,
    initialSearchSelect,
    initialWordToSearch,
    result,
}) => {
    const initialLanguage = useContext(LanguageContext).language
    const [ language, setLanguage] = useState<Language>(initialLanguage)
    const [wordType, setWordType] = useState<string>(initialWordType)
    const [selectSearch, setSelectSearch] =
        useState<string>(initialSearchSelect)
    const [wordToSearch, setWordToSearch] =
        useState<string>(initialWordToSearch)
    const [ startedNewSearch, setStartedNewSearch ] = useState<boolean>(false)
    const { t } = useTranslation()
    const router = useRouter()

    if (result && wordToSearch !== result.normalForm && !startedNewSearch) {
        setWordToSearch(result.normalForm)
    }

    const handleLanguageSelect = (e: ChangeEvent<HTMLSelectElement>) => {
       const newLanguage = LanguageFromCode(e.target.value)
       if(newLanguage) {
           setLanguage(newLanguage)
       }
    }

    const LanguageSelect: React.FC = () => {
        const languageOpts = SupportedLanguages.map((lang) => (
            <option key={`lang-select-${lang.code}`} value={lang.code}>
                {t(`${lang.name}`)}
            </option>
        ))
        return (
            <select
                value={language.code}
                onChange={handleLanguageSelect}
                className={styles.input}
            >
                {languageOpts}
            </select>
        )
    }

    const WordTypeSelect: React.FC = () => {
        const typeOpts = Object.entries(SupportedWordTypes).map(
            ([wordType, translation]) => (
                <option value={wordType} key={`word-type-select-${wordType}`}>
                    {t(`${translation}`)}
                </option>
            )
        )
        return (
            <select
                value={wordType}
                onChange={(e) => setWordType(e.target.value)}
                className={styles.input}
            >
                {typeOpts}
            </select>
        )
    }

    const DictionaryEntrySelect: React.FC = () => {
        return (
            <select
                value={selectSearch}
                onChange={(e) => setSelectSearch(e.target.value)}
                className={styles.input}
            >
                <option value="false">
                    {t('word-search.search-select.false')}
                </option>
                <option value="true">
                    {t('word-search.search-select.true')}
                </option>
            </select>
        )
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        console.log('word to search', wordToSearch)
        const { locale } = router
        const url = `/${locale}/${language.code}/${wordToSearch}/`
        router.push(
            {
                pathname: url,
                query: {
                    type: wordType,
                    search: selectSearch,
                },
            },
            '',
            { locale: locale }
        )
    }

    const updateWordToSearch = (e: ChangeEvent<HTMLInputElement>) => {
        const newVal = e.target.value
        setWordToSearch(newVal)
        setStartedNewSearch(true)
        console.log('set newVal', newVal)
    }

    return (
        <div className={styles['word-search-container']}>
            <form className={styles['word-search']} onSubmit={handleSubmit}>
                <LanguageSelect />
                <WordTypeSelect />
                <DictionaryEntrySelect />
                <input
                    className={styles.search}
                    type="text"
                    placeholder={t('word-search.search-box')}
                    value={wordToSearch}
                    onChange={updateWordToSearch}
                    required
                />
                <button
                    disabled={!wordToSearch}
                    className={styles.submit}
                    type="submit"
                >
                    {t('word-search.submit')}
                </button>
            </form>
        </div>
    )
}
