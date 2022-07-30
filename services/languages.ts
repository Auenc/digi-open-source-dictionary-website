import { OSDP, Word } from 'osdpjs'
import { Language } from '../models/language'
import { Language as OLanguage } from 'osdpjs/lib/language'
import { WordType as OWordType } from 'osdpjs/lib/word-type'

export const LanguageWelsh: Language = {
    code: 'cy',
    name: 'languages.welsh',
    class: 'welsh',
}

export const LanguageEnglish: Language = {
    code: 'en',
    name: 'languages.english',
    class: 'english',
}

export const LanguageBreton: Language = {
    code: 'br',
    name: 'languages.breton',
    class: 'breton',
}

export const LanguageCornish: Language = {
    code: 'kw',
    name: 'languages.cornish',
    class: 'cornish',
}

export const LanguageGerman: Language = {
    code: 'de',
    name: 'languages.german',
    class: 'german',
}

export const LanguageIrish: Language = {
    code: 'ga',
    name: 'languages.irish',
    class: 'irish',
}

export const LanguageScottishGaelic: Language = {
    code: 'gd',
    name: 'languages.scottish-gaelic',
    class: 'scottish-gaelic',
}

export const LanguageSpanish: Language = {
    code: 'es',
    name: 'languages.spanish',
    class: 'spanish',
}

export const SupportedLanguages: Language[] = [
    LanguageBreton,
    LanguageCornish,
    LanguageGerman,
    LanguageIrish,
    LanguageScottishGaelic,
    LanguageSpanish,
    LanguageWelsh,
]

export const SupportedLocales: Language[] = [
    LanguageWelsh,
    LanguageBreton,
    LanguageEnglish,
]

export const SearchWord = async (
    dict: string,
    search: string,
    word: string,
    type: string
): Promise<Word | null> => {
    const api = new OSDP(process.env.API_URL as string)
    const result = await api.get({
        lang: dict as OLanguage,
        search: !!search,
        word: word,
        type: type as OWordType,
    })
    if (result.length > 0) {
        return result[0]
    }
    return null
}
