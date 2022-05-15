type PropsType = {
  currentPage: number;
  pageCount: number;
}

function PaginationList({ currentPage, pageCount }: PropsType): JSX.Element {
  return (
    <ul className="pagination__list">
      {currentPage !== 0 && (
        <li className="pagination__page pagination__page--next" id="next"><a className="link pagination__page-link" href={`page_${currentPage}`}>Назад</a>
        </li>
      )}
      {Array.from({ length: pageCount }, (v, i) => i + 1).map((page) => {
        if (currentPage + 1 === page) {
          return (
            <li
              key={page}
              className="pagination__page pagination__page--active"
            >
              <a className="link pagination__page-link" href={`page_${page}`}>{page}</a>
            </li>
          );
        }
        return (
          <li
            key={page}
            className="pagination__page"
          >
            <a className="link pagination__page-link" href={`page_${page}`}>{page}</a>
          </li>
        );
      })}
      {currentPage !== pageCount - 1 && (
        <li className="pagination__page pagination__page--next" id="next"><a className="link pagination__page-link" href={`page_${currentPage + 2}`}>Далее</a>
        </li>
      )}
    </ul>
  );
}

export default PaginationList;
