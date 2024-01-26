import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { notificationAnecdote } from '../reducers/notificationReducer'

const NewAnecdote = () => {
  const dispatch = useDispatch()
  

  const addAnecdote = (content) => {
    dispatch(createAnecdote(content))
  }

  const addAnecdoteNotification = (content) => {
    dispatch(notificationAnecdote(content))
    setTimeout(() => {
      dispatch(notificationAnecdote(''))
    }, 5000)
  }


  const handleSubmit = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    
    addAnecdote(content)
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