import cx from 'classnames';
import React, { PropTypes } from 'react';
import { reduxForm, Field } from 'redux-form';
import Select from 'react-select';
import { isEmpty, map, trim } from '../../utils/lodash';
import countryList from '../../fixtures/countries';
import sourceList from '../../fixtures/sources';
import './Form.scss';

const TextField = ({ description, input, label, meta: { error } }) => (
  <div className={cx('explorer__form__group', { 'explorer__form__group--error': !!error })}>
    <label htmlFor={input.name}>{label}</label>
    {description ? <div>{description}</div> : null}
    <input type="text" className="explorer__form__input" id={input.name} {...input} />
    {(error && <span className="explorer__form__message">{error}</span>)}
  </div>
);
TextField.propTypes = {
  description: PropTypes.object,
  input: PropTypes.object.isRequired,
  label: PropTypes.string,
  meta: PropTypes.object,
};

const onSelectFn = (onChange) => ({
  false: (value) => onChange(value['value']),
  true:  (values) => onChange(map(values, 'value')),
});
const SelectField = ({ description, input, label = 'Untitled', options, multi = false }) => (
  <div className="explorer__form__group">
    <label htmlFor={label}>{label}</label>
    {description ? <div>{description}</div> : null}
    <Select
      {...input}
      options={options}
      multi={multi} autoBlur
      onBlur={() => input.onBlur(input.value)}
      onChange={onSelectFn(input.onChange)[multi]}
    />
  </div>
);
SelectField.propTypes = {
  description: PropTypes.object,
  input: PropTypes.object.isRequired,
  label: PropTypes.string,
  options: PropTypes.array.isRequired,
  multi: PropTypes.bool,
};

const Form = ({
  error, handleSubmit,
}) => (
  <form className="explorer__form" onSubmit={handleSubmit}>
    <fieldset>
      <legend>
        <p className="DefaultParagraph-1">Search all <a href="https://www.trade.gov/consolidated-screening-list" target="_parent">the screening lists</a> at one time by filling in the search boxes below.  <br/> If you get too many results, try including more information to the additional fields.  If you get too few results, try searching one field at a time.</p>
      </legend>
      <Field
        component={TextField} name="name" label="Name"
        description={<p>Search for an entity&#39;s name or one of its alternative names.</p>}
      />
      <Field
        component={SelectField} name="fuzzyName" label="Fuzzy Name"
        options={[{ label: 'Off', value: '' }, { label: 'On', value: 'true' }]}
        description={<div>
          <p>When set to "off", the spelling of the Name you search for must be correct to get results. When set to "on", the spelling for the Name you search for may be slightly off from the exact spelling. Check the score for each result to determine how close a match it is to the entity's name or its alternative names. A score of 100 is an exact match. Results are returned with the highest scores first.</p>
          <p>Fuzzy search filters out the following common words: co, company, corp, corporation, inc, incorporated, limited, ltd, mrs, ms, mr, organization, sa, sas, llc, university, and univ.  <br/> For example, 'Water Corporation' returns the same results as 'Water' because 'Corporation' is one of the common words.</p>
        </div>}
      />
      <Field
        component={TextField} name="full_address" label="Address"
        description={<p>Search for the street address, city, province, and postal code of an entity.</p>}
      />
      <Field
        component={SelectField} name="sources" label="Sources" options={sourceList} multi
        description={<p>Choose which of the screening lists that you want to search.</p>}
      />
      <Field
        component={SelectField} name="countries" label="Countries" options={countryList} multi
        description={<p>Choose which countries that you want to search. Note, the Nonproliferation Sanctions and ITAR Debarred lists do not include the country with an entity. If you choose to search for entities by country then you will not be searching these two lists.</p>}
      />
      <div className="explorer__form__group">
        <button className="explorer__form__submit pure-button pure-button-primary" onClick={handleSubmit} disabled={!!error}>
          <i className="fa fa-paper-plane" /> Search
        </button>
      </div>
    </fieldset>
  </form>
);
Form.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

function validate(values) {
  const errors = {};
  if (values.fuzzyName === 'true' && isEmpty(trim(values.name))) {
    errors.name = 'Name is required.';
    errors._error = true;
  }
  return errors;
}

export default reduxForm({
  form: 'form',
  validate,
})(Form);
