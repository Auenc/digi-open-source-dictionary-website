import { Header } from "./header"
import styles from '../styles/Layout.module.css'

export const Layout: React.FC = () => {
    return <div className={styles.container}>
        <Header />
    </div>
}