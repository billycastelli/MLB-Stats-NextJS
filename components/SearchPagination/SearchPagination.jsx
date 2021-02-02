import styles from "./SearchPagination.module.scss";

const SearchPagination = ({ router, data, requestedResultSize }) => {
  const toNextPage = () => {
    let currentPage = parseInt(router.query.page);
    console.log(currentPage);
    let nextPage = ++currentPage;
    console.log(nextPage);

    router.push({
      pathname: router.pathname,
      query: { q: router.query.q, page: nextPage },
    });
  };

  const toPrevPage = () => {
    let currentPage = parseInt(router.query.page);
    console.log(currentPage);
    let prevPage = --currentPage;
    console.log(prevPage);

    router.push({
      pathname: router.pathname,
      query: { q: router.query.q, page: prevPage },
    });
  };

  return (
    <div className="columns is-centered">
      {router.query.page <= 1 && (
        <button onClick={toPrevPage} className={styles[`page-button-hidden`]}>
          Prev
        </button>
      )}
      {router.query.page > 1 && (
        <button onClick={toPrevPage} className={styles[`page-button-visible`]}>
          Prev
        </button>
      )}
      {router.query.page * requestedResultSize >= data.total.value && (
        <button onClick={toNextPage} className={styles[`page-button-hidden`]}>
          Next
        </button>
      )}
      {router.query.page * requestedResultSize < data.total.value && (
        <button onClick={toNextPage} className={styles[`page-button-visible`]}>
          Next
        </button>
      )}
    </div>
  );
};

export default SearchPagination;
