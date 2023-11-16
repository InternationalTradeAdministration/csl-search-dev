import React from 'react';
import PropTypes from 'prop-types'
import 'spinkit/spinkit.css';
import './Spinner.scss';

const Spinner = (props) => {
  if (!props.active) return null;
  return (
    <div className="explorer__spinner">
      <div className="sk-circle">
        <div className="sk-circle-dot"></div>
        <div className="sk-circle-dot"></div>
        <div className="sk-circle-dot"></div>
        <div className="sk-circle-dot"></div>
        <div className="sk-circle-dot"></div>
        <div className="sk-circle-dot"></div>
        <div className="sk-circle-dot"></div>
        <div className="sk-circle-dot"></div>
        <div className="sk-circle-dot"></div>
        <div className="sk-circle-dot"></div>
        <div className="sk-circle-dot"></div>
        <div className="sk-circle-dot"></div>
      </div>
    </div>
  );
};

Spinner.propTypes = {
  active: PropTypes.bool.isRequired,
};

export default Spinner;
