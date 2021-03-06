import styles from "./Footer.module.scss";

const Footer = () => {
  return (
    <div className={styles.footer}>
      <p className={styles.footerText}>By William Castelli</p>
      <br />
      <p className={`${styles.footerText} ${styles.githubLink}`}>
        Github <a href="https://github.com/billycastelli">@billycastelli</a>
      </p>
    </div>
  );
};

export default Footer;
