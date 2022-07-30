import { useTranslation } from "next-i18next";
import { useContext } from "react";
import { LanguageContext } from "../contexts/language";
import styles from "../styles/title.module.css";

export const Title: React.FC = () => {
  const { t } = useTranslation();
  const { language } = useContext(LanguageContext);
  return (
    <h1 className={`${styles.title} ${styles[language.class]}`}>
      {t("title")}
    </h1>
  );
};
