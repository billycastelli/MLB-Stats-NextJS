import styles from "./Header.module.css";
import Link from "next/link";
import SearchInput from "../SearchInput/SearchInput";

const Header = () => {
  return (
    <div className={styles.header}>
      <span className={styles.brand}>
        <Link href="/">
          <a>
            <img className={styles.header_image} src="/baseball-16.svg" />{" "}
          </a>
        </Link>
        {/* QuickStats */}
      </span>

      <div className={styles.search}>
        <div className={styles.headerLink}>
          <Link href="/compare">
            <a>Comparison Tool</a>
          </Link>
        </div>
        <SearchInput />
      </div>
    </div>
  );
};

export default Header;
