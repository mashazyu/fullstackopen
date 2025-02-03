import { create } from './reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const onCreate = (event) => {
        event.preventDefault()
    
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
    
        dispatch(create(content))
    }

    return (
        <>
            <h2>create new</h2>
            <form onSubmit={onCreate}>
                <div><input name="anecdote" /></div>
                <button>create</button>
            </form>
        </>
    )
}

export default AnecdoteForm