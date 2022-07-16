import Link from "next/link";
import styles from "../styles/Nav.module.css";

export const Nav: React.FC = () => {
  return (
    <nav className={styles.nav}>
      <ul className={styles.links}>
        <li>
          <Link href="/">Dictionary</Link>
        </li>
      </ul>
    </nav>
  );
};
