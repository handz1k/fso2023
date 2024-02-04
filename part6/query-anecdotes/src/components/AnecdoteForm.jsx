import {useMutation, useQueryClient } from '@tanstack/react-query'
import { postAnecdote } from '../requests/requests'
import { useNotificationDispatch, useNotificationValue } from '../NotificationContext'



const AnecdoteForm = () => {
  const dispatch = useNotificationDispatch()
  const queryClient = useQueryClient()
  const newAnecdoteMutation = useMutation({
    mutationFn: postAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey:['anecdotes']})
    },
    onError: () => {
      dispatch({'type': 'BADREQUEST'})
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({content, votes: 0})
    dispatch({'type': 'ADD', 'payload': content})
    setTimeout(() => {
      dispatch({'type': 'ADD', 'payload': ''})
    }, 5000);
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
