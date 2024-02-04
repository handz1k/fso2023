import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query'
import { getAllAnecdotes, updateAnecdote } from './requests/requests'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useNotificationDispatch, useNotificationValue } from './NotificationContext'

const App = () => {

  const queryClient = useQueryClient()
  const dispatch = useNotificationDispatch()
  const notification = useNotificationValue()

  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey:['anecdotes']})
    },
  })

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
    dispatch({'type': 'VOTE', 'payload': anecdote.content})
    setTimeout(() => {
      dispatch({'type': 'VOTE', 'payload': ''})
    }, 5000);
  }
  
  const getAnecdotes = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAllAnecdotes,
    refetchOnWindowFocus: false,
    retry: false
  })

  if ( getAnecdotes.isLoading ) {
    return <div>loading</div>
  }

  if ( getAnecdotes.isError ) {
    return <div>anecdote service not available due to problems in server</div>
  }

  const anecdotes = getAnecdotes.data
  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification notification={notification} />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => { handleVote(anecdote)}}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
