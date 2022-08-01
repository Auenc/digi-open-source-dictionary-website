import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import styles from '../styles/nav.module.css'

export const Nav: React.FC = () => {
    const { t } = useTranslation()
    const router = useRouter()
    const {locale} = router
    return (
        <nav className={styles.nav}>
            <ul className={styles.links}>
                <li className={styles.link}>
                    <Link href={`/${locale}/cy/`}>{t('nav.dictionary')}</Link>
                </li>
                <li className={styles.link}>
                    <Link href={`/${locale}/numbers`}>{t('nav.numbers')}</Link>
                </li>
                <li className={styles.link}>
                    <Link href={`/${locale}/translations`}>{t('nav.translations')}</Link>
                </li>
                <li className={styles.link}>
                    <Link href={`/${locale}/help`}>{t('nav.help')}</Link>
                </li>
                <li className={styles.link}>
                    <Link href={`/${locale}/about`}>{t('nav.about')}</Link>
                </li>
                <li className={styles.link}>
                    <Link href={`/${locale}/settings`}>{t('nav.settings')}</Link>
                </li>
            </ul>
        </nav>
    )
}
