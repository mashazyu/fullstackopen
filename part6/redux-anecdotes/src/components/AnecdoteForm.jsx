import { create } from '../reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const onCreate = (event) => {
        event.preventDefault()
    
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
    
        dispatch(create(content))
        dispatch(setNotification(`you created note "${content}"`))
        setTimeout(() => {
            dispatch(setNotification(""))
        }, "5000");
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