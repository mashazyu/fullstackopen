import { useQueryClient, useMutation } from '@tanstack/react-query' 

import { useNotificationDispatch } from '../NotificationContext'
import { createAnecdote } from '../requests'


const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const dispatch = useNotificationDispatch()
  const newAnecdoteMutation = useMutation({ 
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
    },
    onError: (error) => {
      dispatch({ type: "SET", payload: `error creating new anecdote ${error.message}`})
      setTimeout(() => {dispatch({ type: "RESET" })}, "5000")
    }
  })
  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''

    newAnecdoteMutation.mutate({ content, votes: 0 })
    dispatch({ type: "SET", payload: `anecdote '${content}' is created`})
    setTimeout(() => {dispatch({ type: "RESET" })}, "5000")
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
