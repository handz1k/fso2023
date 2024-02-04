import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { addNewAnecdote } from '../reducers/anecdoteReducer'

const NewAnecdote = () => {
  const dispatch = useDispatch()
  

  const addAnecdote = async (content) => {
    dispatch(addNewAnecdote(content))
  }

  const addAnecdoteNotification = (content) => {
    dispatch(setNotification(`you added '${content}'`, 5))
  }


  const handleSubmit = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    
    await addAnecdote(content)
    addAnecdoteNotification(content)
  }


return (
    <form onSubmit={handleSubmit}>
      <input name = "anecdote"/>
      <button>create</button>
    </form>
)

}

export default NewAnecdote