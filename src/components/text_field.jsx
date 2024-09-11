function TextField({ id, name, displayName, hint, defaultValue, onChange, errors }) {

  let classNames = ['explorer__form__group']

  if (errors) {
    classNames.push('explorer__form__group--error')
  }

  return (
    <div className={classNames.join(' ')}>
      <label htmlFor={id}>{displayName}</label>
      <div className="csl-input-hint">{hint}</div>
      <input id={id} name={name} className="explorer__form__input" type="text" defaultValue={defaultValue} onChange={onChange} />
      {(errors && <span className="explorer__form__message">{errors}</span>)}
    </div>
  )
}

export default TextField
