const PersonForm = ({nameSubmission, nameValue, nameHandler, numberValue, numberHandler}) => {
  return(
  <form onSubmit = {nameSubmission}>
    <div>
      name:
      <input value = {nameValue}
            onChange = {nameHandler}
      />
    </div>
    <div>
      number:
      <input value = {numberValue}
            onChange = {numberHandler} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>)
}

export default PersonForm