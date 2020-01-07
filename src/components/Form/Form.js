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
    {description ? <p>{description}</p> : null}
    <input type="text" className="explorer__form__input" id={input.name} {...input} />
    {(error && <span className="explorer__form__message">{error}</span>)}
  </div>
);
TextField.propTypes = {
  description: PropTypes.string,
  input: PropTypes.object.isRequired,
  label: PropTypes.string,
  meta: PropTypes.object,
};

const onSelectFn = (onChange) => ({
  false: (value) => onChange(value['value']),
  true:  (values) => onChange(map(values, 'value')),
});
const SelectField = ({ description, input, label = 'Untitled', name, options, multi = false }) => (
  <div className="explorer__form__group">
    <label htmlFor={name}>{label}</label>
    {description ? <p>{description}</p> : null}
    <div>
      <Select
        {...input}
        options={options}
        multi={multi} autoBlur
        onBlur={() => input.onBlur(input.value)}
        onChange={onSelectFn(input.onChange)[multi]}
      />
    </div>
  </div>
);
SelectField.propTypes = {
  description: PropTypes.string,
  input: PropTypes.object.isRequired,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  multi: PropTypes.bool,
};

const Form = ({
  error, handleSubmit,
}) => (
  <form className="explorer__form" onSubmit={handleSubmit}>
    <fieldset>
      <Field
        component={TextField} name="q" label="Keyword"
        description="Search for words in the name, alternative names (aliases), title of the entity, and additional remarks regarding the entity."
      />
      <Field
        component={TextField} name="name" label="Name"
        description="Search for an entity&#39;s name or one of its alternative names."
      />
      <Field
        component={SelectField} name="fuzzyName" label="Fuzzy Name"
        options={[{ label: 'Off', value: '' }, { label: 'On', value: 'true' }]}
        description={<div>
          <p>When set to off, the spelling of the Name you search for must be correct to get results. When set to on, the spelling for the Name you search for may be slightly off. Check the score for each result to determine how close a match it is to the entity's name or its alternative names. A score of 100 is an exact match. Results are returned with the highest scores first.</p>
          <p>Fuzzy search filters out the following common words: co, company, corp, corporation, inc, incorporated, limited, ltd, mrs, ms, mr, organization, sa, sas, llc, university, and univ.  For example, 'Water Corporation' returns the same results as 'Water' because 'Corporation' is one of the common words.</p>
        </div>}
      />
      <Field
        component={TextField} name="address" label="Address"
        description="Search for the street address, city, province, and postal code of an entity."
      />
      <Field
        component={SelectField} name="sources" label="Sources" options={sourceList} multi
        description="Choose which of the screening lists that you want to search."
      />
      <Field
        component={SelectField} name="countries" label="Countries" options={countryList} multi
        description="Choose which countries that you want to search. Note, the Nonproliferation Sanctions and ITAR Debarred lists do not include the country with an entity. If you choose to search for entities by country then you will not be searching these two lists."
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
