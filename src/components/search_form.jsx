import { useEffect, useState } from 'react'
import { Form } from 'react-router-dom'
import TextField from './text_field.jsx'
import SearchFormFields from '../data/search_fields_config.json'
import SelectField from './select_field'
import FuzzyNameOptions from '../data/fuzzy_name_options'
import SourcesOptions from '../data/sources'
import CountriesOptions from '../data/countries'
import './Form/Form.scss'

function SearchForm({ name, fuzzy_name, full_address, sources, countries }) {
  const { nameField, fuzzyNameField, addressField, sourcesField, countriesField } = SearchFormFields

  useEffect(() => {
    document.getElementById('name').value = name
    document.getElementById('full_address').value = full_address
  }, [name, full_address])

  const selectedFuzzyName = FuzzyNameOptions.find(option => option.value === fuzzy_name)
  const selectedSources = SourcesOptions.filter((option) => sources.includes(option.value))
  const selectedCountries = CountriesOptions.filter((option) => countries.includes(option.value))
  const multiSelectOptions = { isMulti: true, delimiter: ',' }

  const [nameValue, setNameValue] = useState(name)

  const [fuzzyNameValue, setFuzzyNameValue] = useState(fuzzy_name)

  const validateFormValues = ({ name, fuzzy_name }) => {
    const newErrors = {}
    if (fuzzy_name === 'true' && name.length === 0) {
      newErrors.name = ['Name is required.']
    }
    return newErrors
  }

  const [errors, setErrors] = useState(validateFormValues({ name, fuzzy_name }))

  const handleNameChange = (event) => {
    const newNameValue = event.target.value.trim()
    setNameValue(newNameValue)
    setErrors(validateFormValues({ name: newNameValue, fuzzy_name: fuzzyNameValue }))
  }


  const handleFuzzyNameChange = (event) => {
    const newFuzzyNameValue = event.value
    setFuzzyNameValue(newFuzzyNameValue)
    setErrors(validateFormValues({ name: nameValue, fuzzy_name: newFuzzyNameValue }))
  }

  return (
    <>
      <Form action="search" className="explorer__form">
        <fieldset>
          <legend>
            Search all <a href="https://www.trade.gov/consolidated-screening-list" target="_parent">the screening
            lists</a> at one time by filling in the search boxes below.
            <br />
            If you get too many results, try including more information to the additional fields. If you get too few
            results, try searching one field at a time.
          </legend>

          <TextField {...nameField} onChange={handleNameChange} errors={errors.name} />
          <SelectField {...fuzzyNameField} options={FuzzyNameOptions} defaultValue={selectedFuzzyName}
                       onChange={handleFuzzyNameChange} />
          <TextField {...addressField} />
          <SelectField {...sourcesField} options={SourcesOptions} defaultValue={selectedSources}
                       additionalOptions={multiSelectOptions} />
          <SelectField {...countriesField} options={CountriesOptions} defaultValue={selectedCountries}
                       additionalOptions={multiSelectOptions} />

          <div className="explorer__form__group">
            <button className="explorer__form__submit" disabled={Object.keys(errors).length > 0}>
              <i className="fa fa-paper-plane" /> Search
            </button>
          </div>
        </fieldset>
      </Form>
    </>
  )
}

export default SearchForm
