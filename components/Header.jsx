import styles from "./Header.module.css";

const Header = () => {
  return (
    <div className={styles.header}>
      <img className={styles.header_image} src="baseball-16.svg" />
    </div>
  );
};

export default Header;
