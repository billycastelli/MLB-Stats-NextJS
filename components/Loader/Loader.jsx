import styles from "./Loader.module.scss";

const Loader = (props) => {
  return (
    <div className={styles.loadingDiv}>
      <span className={styles.loadingText}>{props.text}</span>
      <img className={styles.spin} src="/baseball-16.svg" />
    </div>
  );
};

export default Loader;
