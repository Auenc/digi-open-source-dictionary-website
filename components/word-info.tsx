import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Language, Translation, Word } from 'osdpjs'
import { IsSupported, LanguageFromCode } from '../services/languages'
import styles from '../styles/word-info.module.css'

export interface WordInfoProps {
    word: Word
}

interface externalLink {
    link: string
    name: string
}

const createExternalLinks = (word: Word): externalLink[] => {
    return [
        {
            link: `https://en.wiktionary.org/wiki/${word.normalForm}#Welsh`,
            name: 'Wiktionary',
        },
        {
            link: `http://geiriadur.bangor.ac.uk/#mynd`,
            name: 'Geiriadur Bangor',
        },
    ]
}

export const WordInfo: React.FC<WordInfoProps> = ({ word }) => {
    const router = useRouter()
    const { locale } = router
    const { t } = useTranslation()
    if (!word) {
        return <></>
    }
    const language = LanguageFromCode(word.lang)

    if (!language) {
        console.error('no word provided or unsupported language recieved')
        return <></>
    }

    const confirmed = word.confirmed ? 'confirmed' : 'unconfirmed'

    const BasicInfo: React.FC = () => {
        return (
            <>
                <h2>{t('word-info.basic-info.title')}</h2>
                <table className={styles['info-table']}>
                    <tbody>
                        <tr>
                            <td className={styles.header}>
                                {t('word-info.basic-info.language')}
                            </td>
                            <td>{t(language?.name)}</td>
                        </tr>
                        <tr>
                            <td className={styles.header}>
                                {t('word-info.basic-info.type')}
                            </td>
                            <td>{t(`word-type.${word.type}`)}</td>
                        </tr>
                        <tr>
                            <td className={styles.header}>
                                {t('word-info.basic-info.status')}
                            </td>
                            <td>{confirmed}</td>
                        </tr>
                        <tr>
                            <td className={styles.header}>
                                {t('word-info.basic-info.external-sites')}
                            </td>
                            <td>
                                {createExternalLinks(word).map((link) => (
                                    <a
                                        className={styles['external-link']}
                                        key={link.name}
                                        href={link.link}
                                    >
                                        {link.name}
                                    </a>
                                ))}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </>
        )
    }

    const Translations: React.FC = () => {
        if (!word.translations) {
            return <></>
        }
        const [translations] = word.translations
        const rows = Object.entries(translations).map(
            ([lang, translations], index) => {
                const language = LanguageFromCode(lang)
                if (!language) {
                    return <></>
                }
                const translation = translations.map(
                    (translation: Translation) => {
                        if (!IsSupported(translation.lang)) {
                            return (
                                <span
                                    key={`translation-link-${translation.lang}`}
                                >
                                    {translation.value}
                                </span>
                            )
                        }
                        return (
                            <Link
                                key={`translation-link-${translation.lang}-${translation.value}`}
                                href={{
                                    pathname: `/${locale}/${translation.lang}/${translation.value}`,
                                }}
                            >
                                {translation.value}
                            </Link>
                        )
                    }
                )

                return (
                    <tr key={`translation-${lang}`}>
                        <td className={styles.header}>{t(language?.name)}</td>
                        <td>{translation}</td>
                    </tr>
                )
            }
        )
        return (
            <>
                <h2>{t('word-info.translations.title')}</h2>
                <table className={styles['info-table']}>
                    <tbody>{rows}</tbody>
                </table>
            </>
        )
    }

    const Mutations: React.FC = () => {
        if (!word.mutations) {
            return <></>
        }
        const mutations = [
            {
                name: 'unmutated',
                value: word.mutations.init,
            },
            ...Object.entries(word.mutations)
                .map(([mutationName, mutation]) => {
                    return { name: mutationName, value: mutation }
                })
                .filter(({ name }) => name !== 'init'),
        ]

        const headers = mutations.map(({ name }) => {
            return (
                <th key={`mutation-header-${name}`} className={styles.header}>
                    {t(`word-info.mutations.${name}`)}
                </th>
            )
        })
        const values = mutations.map(({ name, value }) => (
            <td key={`mutation-value-${name}`}>{value}</td>
        ))
        return (
            <>
                <h2>{t('word-info.mutations.title')}</h2>
                <table className={styles['info-table']}>
                    <thead>
                        <tr>{headers}</tr>
                    </thead>
                    <tbody>
                        <tr>{values}</tr>
                    </tbody>
                </table>
            </>
        )
    }

    const Conjugations: React.FC = () => {
        if (!word.conjugations) {
            return <></>
        }
        const conjugations = Object.entries(word.conjugations).map(
            ([name, conjugations]) => {
                return (
                    <table
                        key={`conjugation-table-${name}`}
                        className={styles['info-table']}
                    >
                        <thead>
                            <tr>
                                <th className={styles.header}>
                                    {t(`word-info.conjugations.${name}`)}
                                </th>
                                <th className={styles.header}>
                                    {t('word-info.conjugations.singular')}
                                </th>
                                <th className={styles.header}>
                                    {t('word-info.conjugations.plural')}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className={styles.header}>
                                    {t('word-info.conjugations.first')}
                                </td>
                                <td>{conjugations.singFirst}</td>
                                <td>{conjugations.plurFirst}</td>
                            </tr>
                            <tr>
                                <td className={styles.header}>
                                    {t('word-info.conjugations.second')}
                                </td>
                                <td>{conjugations.singSecond}</td>
                                <td>{conjugations.plurSecond}</td>
                            </tr>
                            <tr>
                                <td className={styles.header}>
                                    {t('word-info.conjugations.third')}
                                </td>
                                <td>{conjugations.singThird}</td>
                                <td>{conjugations.plurThird}</td>
                            </tr>
                        </tbody>
                    </table>
                )
            }
        )
        return (
            <>
                <h2>{t('word-info.conjugations.title')}</h2>
                {conjugations}
            </>
        )
    }

    return (
        <div className={styles['word-info']}>
            <h1>{word.normalForm}</h1>
            <BasicInfo />
            <Translations />
            <Mutations />
            <Conjugations />
        </div>
    )
}
