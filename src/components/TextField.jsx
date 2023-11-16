function TextField({ id, name, displayName, hint, defaultValue }) {
  return (
    <div>
      <label htmlFor={id}>{displayName}</label>
      <div className="csl-input-hint">{hint}</div>
      <input id={id} name={name} defaultValue={defaultValue}/>
    </div>
  )
}

export default TextField
