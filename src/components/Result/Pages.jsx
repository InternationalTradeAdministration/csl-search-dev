import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import { filterParams, getSearchParamsString } from '../../service.js'

function pageGenerator(query, current, displayed, total) {
  // let index = Math.max(current - displayed, 1)
  let index = (current - displayed) > 0 ? current - displayed : 1
  const filteredParams = filterParams(query)
  const pages = [];
  if (index > 1) {
    const firstParamsString = getSearchParamsString({ ...filteredParams, offset: 0 })
    pages.push(
      <Link key="link-1" to={`?${firstParamsString}`}>
        <div key="first-page" className="explorer__result__page-item" data-page={1}>First</div>
      </Link>
    )
  }

  while (index <= total && index < current + displayed + 1) {
    const className = index === current ?
      'explorer__result__page-item disabled' :
      'explorer__result__page-item';
    const searchParams = { ...filteredParams, offset: ((index - 1) * 10) }
    const searchParamsString = getSearchParamsString(searchParams)
    const searchUrl = `?${searchParamsString}`
    const currentPage = index
    const paginationContent = (<div key={index} className={className}>{currentPage}</div>)
    pages.push((index === current) ? (paginationContent) : (
      <Link key={`link-${index}`} to={searchUrl}>{paginationContent}</Link>))
    index++
  }

  if (current + displayed < total) {
    const lastParamsString = getSearchParamsString({ ...filteredParams, offset: total * 10 })
    pages.push(
      <Link key={`link-${index}`} to={`?${lastParamsString}`}>
        <div key="last-page" className="explorer__result__page-item">Last</div>
      </Link>
    );
  }
  return pages;
}

const Pages = ({ query, current, displayed, total }) => {
  const pages = pageGenerator(query, current, displayed, total);
  return (
    <div className="explorer__result__pages">
      {pages}
    </div>
  );
};

Pages.propTypes = {
  query: PropTypes.object,
  current: PropTypes.number,
  displayed: PropTypes.number,
  total: PropTypes.number.isRequired,
  // handleClick: PropTypes.func.isRequired,
};

export default Pages;
