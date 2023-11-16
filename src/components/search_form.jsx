import { useEffect } from 'react'
import { Form } from 'react-router-dom'
import TextField from './TextField'
import SearchFormFields from '../data/search_fields.config.json'
import SelectField from './select_field'
import FuzzyNameOptions from '../data/fuzzy_name_options'

function SearchForm({ name, fuzzy_name, full_address }) {
  const { nameField, fuzzyNameField, addressField } = SearchFormFields

  useEffect(() => {
    document.getElementById('name').value = name
    document.getElementById('full_address').value = full_address
    // document.querySelectorAll('#fuzzy_name options').forEach(option => {
    //   if (option.value === fuzzy_name) {
    //     option.selected = true
    //   }
    // })
  }, [name, full_address])

  const selectedFuzzyName = FuzzyNameOptions.find(option => option.value === fuzzy_name)

  return (
    <>
      <Form action="search">
        <fieldset>
          <legend>
            Search all <a href="https://www.trade.gov/consolidated-screening-list" target="_parent">the screening lists</a> at one time by filling in the search boxes below.
            <br/>
            If you get too many results, try including more information to the additional fields.  If you get too few results, try searching one field at a time.
          </legend>

          <TextField {...nameField} />
          <SelectField {...fuzzyNameField} options={FuzzyNameOptions} defaultValue={selectedFuzzyName} />
          <TextField {...addressField} />

          <div
            id="search-spinner"
            aria-hidden
            hidden={true}
          />
          <div
            className="sr-only"
            aria-live="polite"
          ></div>
          <button type="submit">Search</button>
        </fieldset>
      </Form>
    </>
  )
}

export default SearchForm
