import { Link } from 'react-router-dom';

type PropsType = {
  currentPage: number;
  pageCount: number;
}

function PaginationList({ currentPage, pageCount }: PropsType): JSX.Element {
  if (pageCount === 0) {
    pageCount = 1;
  }

  return (
    <ul className="pagination__list">
      {currentPage !== 0 && (
        <li className="pagination__page pagination__page--next" id="next">
          <Link className="link pagination__page-link" to={`page_${currentPage}`}>Назад</Link>
        </li>
      )}
      {Array.from({ length: pageCount }, (v, i) => i + 1).map((page) => {
        if (currentPage + 1 === page) {
          return (
            <li
              key={page}
              className="pagination__page pagination__page--active"
            >
              <Link className="link pagination__page-link" to={`page_${page}`}>{page}</Link>
            </li>
          );
        }
        return (
          <li
            key={page}
            className="pagination__page"
          >
            <Link className="link pagination__page-link" to={`page_${page}`}>{page}</Link>
          </li>
        );
      })}
      {currentPage !== pageCount - 1 && (
        <li className="pagination__page pagination__page--next" id="next">
          <Link className="link pagination__page-link" to={`page_${currentPage + 2}`}>Далее</Link>
        </li>
      )}
    </ul>
  );
}

export default PaginationList;
