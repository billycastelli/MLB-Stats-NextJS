import styles from "./SearchQueryMeta.module.scss";

const SearchQueryMeta = (props) => {
  return (
    <div className="section" style={{ paddingBottom: "0" }}>
      <div className="columns is-centered">
        <div className="column is-two-thirds  p-0">
          <p className={styles.metaText}>
            {props.prefix}
            <span className={styles.metaTextBold}>{props.query}</span>
            {props.count && <span> ({props.count} results found)</span>}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SearchQueryMeta;
