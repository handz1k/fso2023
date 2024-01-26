import { useDispatch, useSelector} from 'react-redux'
import { addLike } from '../reducers/anecdoteReducer'
import { notificationVote } from '../reducers/notificationReducer'

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
    dispatch(addLike(id))
  }

  const voteNotification = (name) => {
    dispatch(notificationVote(name))
    setTimeout(() => {
      dispatch(notificationVote(''))
    }, 5000);
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