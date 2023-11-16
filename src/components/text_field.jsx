function TextField({ id, name, displayName, hint, defaultValue }) {
  return (
    <div className="explorer__form__group">
      <label htmlFor={id}>{displayName}</label>
      <div className="csl-input-hint">{hint}</div>
      <input id={id} name={name} className="explorer__form__input" type="text" defaultValue={defaultValue}/>
    </div>
  )
}

export default TextField
