import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { LanguageContext } from "../contexts/language";
import { SupportedWordTypes } from "../models/words";
import { SupportedLanguages } from "../services/languages";
import styles from "../styles/word-search.module.css";

export interface WordSearchProps {
  initialWordType: string,
  initialSearchSelect: string
  initialWordToSearch: string
}

export const WordSearch: React.FC<WordSearchProps> = ({initialWordType, initialSearchSelect, initialWordToSearch}) => {
  const { language, changeLanguage } = useContext(LanguageContext);
  const [wordType, setWordType] = useState<string>(initialWordType);
  const [selectSearch, setSelectSearch] = useState<string>(initialSearchSelect);
  const [wordToSearch, setWordToSearch] = useState<string>(initialWordToSearch);
  const { t } = useTranslation();
  const router = useRouter();

  const handleLanguageSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    const newLangCode = e.target.value;
    const language = SupportedLanguages.find(
      (lang) => lang.code === newLangCode
    );
    if (!language) {
      throw new Error("non-support language selected");
    }
    changeLanguage(language);
  };

  const LanguageSelect: React.FC = () => {
    const languageOpts = SupportedLanguages.map((lang) => (
      <option key={`lang-select-${lang.code}`} value={lang.code}>
        {t(`word-search.${lang.name}`)}
      </option>
    ));
    return (
      <select
        value={language.code}
        onChange={handleLanguageSelect}
        className={styles.input}
      >
        {languageOpts}
      </select>
    );
  };

  const WordTypeSelect: React.FC = () => {
    const typeOpts = Object.entries(SupportedWordTypes).map(
      ([wordType, translation]) => (
        <option value={wordType} key={`word-type-select-${wordType}`}>
          {t(`word-search.${translation}`)}
        </option>
      )
    );
    return (
      <select
        value={wordType}
        onChange={(e) => setWordType(e.target.value)}
        className={styles.input}
      >
        {typeOpts}
      </select>
    );
  };

  const DictionaryEntrySelect: React.FC = () => {
    return (
      <select
        value={selectSearch}
        onChange={(e) => setSelectSearch(e.target.value)}
        className={styles.input}
      >
        <option value="false">{t("word-search.search-select.false")}</option>
        <option value="true">{t("word-search.search-select.true")}</option>
      </select>
    );
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    router.push({
      pathname: "/",
      query: {
        dict: language.code,
        word: wordToSearch,
        type: wordType,
        search: selectSearch,
      },
    });
  };

  return (
    <div className={styles["word-search-container"]}>
      <form className={styles["word-search"]} onSubmit={handleSubmit}>
        <LanguageSelect />
        <WordTypeSelect />
        <DictionaryEntrySelect />
        <input
          className={styles.search}
          type="text"
          placeholder={t("word-search.search-box")}
          value={wordToSearch}
          onChange={(e) => setWordToSearch(e.target.value)}
          required
        />
        <button
          disabled={!wordToSearch}
          className={styles.submit}
          type="submit"
        >
          {t("word-search.submit")}
        </button>
      </form>
    </div>
  );
};
