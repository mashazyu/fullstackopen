import { vote } from '../reducers/anecdoteReducer'
import { useSelector, useDispatch } from 'react-redux'

const AnecdoteList = () => {
    const anecdotes = useSelector(state => state)
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