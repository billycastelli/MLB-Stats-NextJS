import styles from "./SearchPagination.module.scss";

const SearchPagination = ({ router, data, requestedResultSize }) => {
  const toNextPage = () => {
    let currentPage = parseInt(router.query.page);
    let nextPage = ++currentPage;

    router.push({
      pathname: router.pathname,
      query: { q: router.query.q, page: nextPage },
    });
  };

  const toPrevPage = () => {
    let currentPage = parseInt(router.query.page);
    let prevPage = --currentPage;

    router.push({
      pathname: router.pathname,
      query: { q: router.query.q, page: prevPage },
    });
  };

  return (
    <div className="container section" style={{ padding: "2 rem" }}>
      <div className="columns is-centered is-mobile">
        {router.query.page <= 1 && (
          <button onClick={toPrevPage} className={styles[`page-button-hidden`]}>
            Prev
          </button>
        )}
        {router.query.page > 1 && (
          <button
            onClick={toPrevPage}
            className={styles[`page-button-visible`]}
          >
            Prev
          </button>
        )}
        {router.query.page * requestedResultSize >= data.total.value && (
          <button onClick={toNextPage} className={styles[`page-button-hidden`]}>
            Next
          </button>
        )}
        {router.query.page * requestedResultSize < data.total.value && (
          <button
            onClick={toNextPage}
            className={styles[`page-button-visible`]}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchPagination;
