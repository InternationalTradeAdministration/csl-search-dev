import Select from 'react-select'

function SelectField({ id, name, displayName, hint, defaultValue, options }) {
  return (
    <div className="explorer__form__group">
      <label htmlFor={id}>{displayName}</label>
      <div className="csl-input-hint" dangerouslySetInnerHTML={{__html: hint}} />
      <Select inputId={id} name={name} defaultValue={defaultValue} options={options}/>
    </div>
  )
}

export default SelectField
