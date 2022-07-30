import { useTranslation } from "next-i18next";
import styles from "../styles/title.module.css";

export const Title: React.FC = () => {
  const { t } = useTranslation();
  return <h1 className={styles.title}>{t("title")}</h1>;
};
