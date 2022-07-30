import React from 'react'
import { Language } from '../models/language'
import { LanguageWelsh } from '../services/languages'

export interface ContextData {
    language: Language
    changeLanguage: (val: Language) => void
}

export const LanguageContext = React.createContext<ContextData>({
    language: LanguageWelsh,
    changeLanguage: (_value: Language) => {},
})
