import { useDispatch, useSelector} from 'react-redux'
import { addAnecdoteLike } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => {
    if (state.filter === '') {
      return state.anecdotes
    } else {
      return state.anecdotes.filter(a => a.content
        .toLowerCase()
        .includes(state.filter)
        )
    }
  })

  const vote = (id) => {
    dispatch(addAnecdoteLike(id))
  }

  const voteNotification = (name) => {
    dispatch(setNotification(`you voted '${name}'`, 5))
  }

  return(
  anecdotes.map(anecdote =>
    <div key={anecdote.id}>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={() => { vote(anecdote.id); voteNotification(anecdote.content) }}>vote</button>
      </div>
    </div>
  ))
}


export default AnecdoteList