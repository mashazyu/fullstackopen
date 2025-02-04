import { vote } from '../reducers/anecdoteReducer'
import { useSelector, useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import anecdotesService from '../services/anecdotes'

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

        await anecdotesService.update({ id, object: updatedAnecdote })
        dispatch(vote({ id, anecdote: updatedAnecdote }))
        dispatch(setNotification(`you voted for "${anecdote.content}"`))
        setTimeout(() => {
            dispatch(setNotification(""))
        }, "5000");
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