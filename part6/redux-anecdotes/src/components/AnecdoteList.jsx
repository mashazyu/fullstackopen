import { vote } from '../reducers/anecdoteReducer'
import { useSelector, useDispatch } from 'react-redux'

const AnecdoteList = () => {
    const anecdotes = useSelector(({ anecdotes, filter }) => {
        if (filter.length === 0) return anecdotes

        return anecdotes.filter(({ content }) => content.toLowerCase().includes(filter.toLowerCase()))
    })
    const anecdotesToDisplay = [...anecdotes].sort((a, b) => Number(b.votes) - Number(a.votes))
    const dispatch = useDispatch()
  
    const onVote = (id) => {
      dispatch(vote(id))
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