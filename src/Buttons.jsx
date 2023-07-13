const Buttons = ({ response, page, setPage }) => {
  return (
    <div className="btn-container">
      <button
        onClick={() => setPage((old) => Math.max(old - 1, 0))}
        disabled={page === 0}
        className="btn btn-hipster"
      >
        Previous Page
      </button>
      <span>Current Page: {page}</span>
      <button
        className="btn"
        onClick={() => {
          if (!response.isPreviousData && response.data.total_pages > page) {
            setPage((page) => page + 1);
          }
        }}
        disabled={response.isPreviousData || !response.data.total_pages > page}
      >
        Next Page
      </button>
    </div>
  );
};

export default Buttons;
