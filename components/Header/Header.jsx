import styles from "./Header.module.css";
import Link from "next/link";

const Header = () => {
  return (
    <div className={styles.header}>
      <span className={styles.brand}>
        <Link href="/">
          <a>
            <img className={styles.header_image} src="/baseball-16.svg" />{" "}
          </a>
        </Link>
        QuickStats
      </span>
    </div>
  );
};

export default Header;
