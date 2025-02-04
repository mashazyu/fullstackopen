import { useDispatch } from 'react-redux'

import { create } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import anecdotesService from '../services/anecdotes'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const onCreate = async (event) => {
        event.preventDefault()
    
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
    
        const anecdote = await anecdotesService.create(content)

        dispatch(create(anecdote))
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