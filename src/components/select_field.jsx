import Select from 'react-select'

function SelectField({ id, name, displayName, hint, defaultValue, options }) {
  return (
    <>
      <label htmlFor={id}>{displayName}</label>
      <div className="csl-input-hint" dangerouslySetInnerHTML={{__html: hint}} />
      <Select id={id} name={name} defaultValue={defaultValue} options={options}/>
    </>
  )
}

export default SelectField
