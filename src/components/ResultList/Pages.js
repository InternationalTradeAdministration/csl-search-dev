import React, { PropTypes } from 'react';

function pageGenerator(current, displayed, total) {
  let index = (current - displayed) > 0 ? current - displayed : 1;
  const pages = [];
  while (index > 0 && index < total && index < current + displayed + 1) {
    const className = index === current ?
            'explorer__result__page-item' :
            'explorer__result__page-item disabled';
    pages.push(<div key={index} className={className} data-page={index}>{index++}</div>);
  }
  return pages;
}

const Pages = ({ current, displayed, total, handleClick }) => {
  const pages = pageGenerator(current, displayed, total);
  return (
    <div className="explorer__result__pages" onClick={handleClick}>
      {pages}
    </div>
  );
};

Pages.propTypes = {
  current: PropTypes.number,
  displayed: PropTypes.number,
  total: PropTypes.number.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default Pages;
