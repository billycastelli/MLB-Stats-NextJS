import styles from "./SearchQueryMeta.module.scss";

const SearchQueryMeta = (props) => {
  return (
    <div className="section" style={{ paddingBottom: "4px" }}>
      <div className="columns is-centered is-mobile">
        <div className="column is-two-thirds-desktop is-two-thirds-tablet is-four-fifths-mobile  p-0">
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
