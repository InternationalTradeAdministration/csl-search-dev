import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { stringify } from 'querystring';
import { assign, camelCase, isEmpty, omitBy, reduce, snakeCase } from '../utils/lodash';
import { Form, Result, Spinner } from '../components';
import { fetchResultsIfNeeded } from '../actions';
import './App.scss';

class App extends Component {
  componentDidMount() {
    const { dispatch, query } = this.props;
    dispatch(fetchResultsIfNeeded(query));
  }
  handlePaging = (e) => {
    e.preventDefault();
    if (!e.target.dataset.page) return;

    const { dispatch, query } = this.props;
    const offset = (parseInt(e.target.dataset.page, 10) - 1) * 10;
    const params = assign({}, omitBy(query, isEmpty), { offset });
    dispatch(fetchResultsIfNeeded(params));
    this.push(params);
  }
  handleSubmit = (form) => {
    const params = reduce(omitBy(form, isEmpty), (result, value, _key) => {
      const key = snakeCase(_key);
      return assign(
        result, { [key]: Array.isArray(value) ? value.join(',') : value });
    }, {});
    this.props.dispatch(fetchResultsIfNeeded(params));
    this.push(params);
  }
  push(params) {
    this.props.history.push(`?${stringify(params)}`);
  }
  render() {
    const { query, results } = this.props;
    const formValues = reduce(
      query,
      (result, value, key) => assign(result, { [camelCase(key)]: value }),
      {});
    return (
      <div className="explorer">
        <h1 className="Header-1"><b>Search the Consolidated Screening List</b></h1>
        <p className="DefaultParagraph-1">Search <a href="http://export.gov/ecr/eg_main_023148.asp">eleven screening lists</a> at one time by filling in the search boxes below.  If you get too many results, try including more information to the additional fields.  If you get too few results, try searching one field at a time.</p>

        <div className="explorer__content">
          <Form onSubmit={this.handleSubmit} initialValues={formValues} />
          <Spinner active={results.isFetching} />
          <Result results={results} onPaging={this.handlePaging} query={query} />
        </div>
      </div>
    );
  }
}
App.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  query: PropTypes.object.isRequired,
  results: PropTypes.object,
};

function mapStateToProps(state, ownProps) {
  const query = ownProps.history.getCurrentLocation().query;
  const { results } = state;
  return {
    query,
    results,
  };
}

export default connect(mapStateToProps)(App);
