import { useTranslation } from "next-i18next";
import { ChangeEvent, useContext } from "react";
import { LanguageContext } from "../contexts/language";
import { SupportedWordTypes } from "../models/words";
import { SupportedLanguages } from "../services/languages";
import styles from "../styles/word-search.module.css";

export const WordSearch: React.FC = () => {
  const { language, changeLanguage } = useContext(LanguageContext);
  const { t } = useTranslation();

  const handleLanguageSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    const newLangCode = e.target.value
    const language = SupportedLanguages.find(lang => lang.code === newLangCode)
    if(!language) {
      throw new Error("non-support language selected")
    }
    changeLanguage(language)
  }

  const LanguageSelect: React.FC = () => {
    const languageOpts = SupportedLanguages.map((lang) => (
      <option key={`lang-select-${lang.code}`} value={lang.code}>
        {t(`word-search.${lang.name}`)}
      </option>
    ));
    return <select value={language.code} onChange={handleLanguageSelect} className={styles.input}>{languageOpts}</select>;
  };

  const WordTypeSelect: React.FC = () => {
    const typeOpts = Object.entries(SupportedWordTypes).map(
      ([wordType, translation]) => (
        <option key={`word-type-select-${wordType}`}>
          {t(`word-search.${translation}`)}
        </option>
      )
    );
    return <select className={styles.input}>{typeOpts}</select>;
  };

  const DictionaryEntrySelect: React.FC = () => {
    return (
      <select className={styles.input}>
        <option value="false">{t("word-search.search-select.false")}</option>
        <option value="true">{t("word-search.search-select.true")}</option>
      </select>
    );
  };

  return (
    <div className={styles["word-search-container"]}>
      <div className={styles["word-search"]}>
        <LanguageSelect />
        <WordTypeSelect />
        <DictionaryEntrySelect />
        <input
          className={styles.search}
          type="text"
          placeholder={t("word-search.search-box")}
        />
        <button className={styles.submit} type="submit">
          {t("word-search.submit")}
        </button>
      </div>
    </div>
  );
};
