import { useEffect } from 'react'
import { Form, useNavigation } from 'react-router-dom'
import TextField from './text_field.jsx'
import SearchFormFields from '../data/search_fields.config.json'
import SelectField from './select_field'
import FuzzyNameOptions from '../data/fuzzy_name_options'
import './Form/Form.scss'
import { areParamsValid } from '../service.js'
import Spinner from './Spinner/Spinner.jsx'

function SearchForm({ name, fuzzy_name, full_address }) {
  const { nameField, fuzzyNameField, addressField } = SearchFormFields

  const navigation = useNavigation()
  // const searching = navigation.location && areParamsValid(navigation?.location?.search)
  const searching = navigation.state === 'loading'
  console.log(`form searching: ${searching}`)

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
      <Form action="search" className="explorer__form">
        <fieldset>
          <legend>
            Search all <a href="https://www.trade.gov/consolidated-screening-list" target="_parent">the screening lists</a> at one time by filling in the search boxes below.
            <br/>
            If you get too many results, try including more information to the additional fields.  If you get too few results, try searching one field at a time.
          </legend>

          <TextField {...nameField} />
          <SelectField {...fuzzyNameField} options={FuzzyNameOptions} defaultValue={selectedFuzzyName} />
          <TextField {...addressField} />

          <div className="explorer__form__group">
            <button className="explorer__form__submit">
              <i className="fa fa-paper-plane" /> Search
            </button>
          </div>
        </fieldset>
      </Form>
      {/*<Spinner active={searching} />*/}
    </>
  )
}

export default SearchForm
