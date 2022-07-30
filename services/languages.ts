import { Language } from "../models/language";

export const LanguageWelsh: Language = {
    code: "cy",
    name: "languages.welsh",
    class: "welsh"
}

export const LanguageEnglish: Language = {
    code: "en",
    name: "languages.english",
    class: "english"
}

export const LanguageBreton: Language = {
    code: "br",
    name: "languages.breton",
    class: "breton"
}

export const LanguageCornish: Language = {
    code: "kw",
    name: "languages.cornish",
    class: "cornish"
}

export const LanguageGerman: Language = {
    code: "de",
    name: "languages.german",
    class: "german"
}

export const LanguageIrish: Language = {
    code: "ga",
    name: "languages.irish",
    class: "irish"
}

export const LanguageScottishGaelic: Language = {
    code: "gd",
    name: "languages.scottish-gaelic",
    class: "scottish-gaelic"
}

export const LanguageSpanish: Language = {
    code: "es",
    name: "languages.spanish",
    class: "spanish"
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