import { useTranslation } from "next-i18next";
import Link from "next/link";
import styles from "../styles/Nav.module.css";

export const Nav: React.FC = () => {
  const { t } = useTranslation();
  return (
    <nav className={styles.nav}>
      <ul className={styles.links}>
        <li className={styles.link}>
          <Link href="/">{t("nav.dictionary")}</Link>
        </li>
        <li className={styles.link}>
          <Link href="/numbers">{t("nav.numbers")}</Link>
        </li>
        <li className={styles.link}>
          <Link href="/translations">{t("nav.translations")}</Link>
        </li>
        <li className={styles.link}>
          <Link href="/help">{t("nav.help")}</Link>
        </li>
        <li className={styles.link}>
          <Link href="/about">{t("nav.about")}</Link>
        </li>
        <li className={styles.link}>
          <Link href="/settings">{t("nav.settings")}</Link>
        </li>
      </ul>
    </nav>
  );
};
