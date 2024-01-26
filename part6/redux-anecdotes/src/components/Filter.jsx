import { useDispatch } from "react-redux"
import { filterChange } from "../reducers/filterReducer"

const Filter = () => {
  const dispatch = useDispatch()
  const handleChange = (event) => {
    const changeToFilter = event.target.value
    dispatch(filterChange(changeToFilter))
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input name = "filter" onChange={handleChange} />
    </div>
  )
}

export default Filter