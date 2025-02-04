import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import AnecdoteList from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'
import Filter from './components/Filter'
import Notification from './components/Notification'

import anecdotesService from './services/anecdotes'
import { set } from './reducers/anecdoteReducer'
import anecdotes from './services/anecdotes'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    anecdotesService
      .getAll().then(anecdotes => dispatch(set(anecdotes)))
  }, [])

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter/>
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App