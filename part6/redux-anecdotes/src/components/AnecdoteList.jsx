import { useSelector, useDispatch } from 'react-redux'

import { updateAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector(({ anecdotes, filter }) => {
        if (filter.length === 0) return anecdotes

        return anecdotes.filter(({ content }) => content.toLowerCase().includes(filter.toLowerCase()))
    })
    const anecdotesToDisplay = [...anecdotes].sort((a, b) => Number(b.votes) - Number(a.votes))
    const dispatch = useDispatch()
  
    const onVote = async (id) => {
        const anecdote = anecdotes.find(item => item.id === id)
        const updatedAnecdote = {
            ...anecdote,
            votes: anecdote.votes + 1
        }

        dispatch(updateAnecdote({ id, object: updatedAnecdote }))
        dispatch(setNotification({ message: `you voted for "${anecdote.content}"`, duration: 3 }))
    }

    return (
        <>
            {anecdotesToDisplay.map(anecdote =>
                <div key={anecdote.id}>
                <div>
                    {anecdote.content}
                </div>
                <div>
                    has {anecdote.votes}
                    <button onClick={() => onVote(anecdote.id)}>vote</button>
                </div>
                </div>
            )}
        </>
    )
    }

export default AnecdoteList