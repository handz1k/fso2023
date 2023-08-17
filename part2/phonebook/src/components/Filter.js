const Filter = ({filterValue, filterHandler}) =>{
  return (
    <div>
    filter shown with
      <input
      value = {filterValue}
      onChange = {filterHandler}
      />
    </div>
  )
  }

  export default Filter

