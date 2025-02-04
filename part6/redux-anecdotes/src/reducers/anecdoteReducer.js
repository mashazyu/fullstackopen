import { createSlice } from '@reduxjs/toolkit'
import anecdotesService from '../services/anecdotes'

const anecdotesSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    create(state, action) {
      state.push(action.payload)
    },
    vote(state, action) {
      const id = action.payload.id
      const anecdote = action.payload.object
      
      return state.map(obj => obj.id === id ? anecdote: obj )
    },
    set(state, action) {
      return action.payload
    }
  }
})

export const { create, set, vote } = anecdotesSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdotesService.getAll()

    dispatch(set(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdotesService.create(content)
    dispatch(create(newAnecdote))
  }
}

export const updateAnecdote = ({ id, object }) => {
  return async dispatch => {
    const newAnecdote = await anecdotesService.update({ id, object })
    dispatch(vote({ id, object }))
  }
}

export default anecdotesSlice.reducer

// const anecdoteReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case 'ADD':
//       return [...state, action.payload]
//     case 'VOTE':
//       return state.map(obj => obj.id === action.payload.id ? {...obj, votes: obj.votes + 1} : obj )
//     default: return state
//   }
// }

// export const create = (content) => {
//   return {
//     type: 'ADD',
//     payload: {
//       content,
//       votes: 0,
//       id: getId()
//     }
//   }
// }

// export const vote = (id) => {
//   return {
//     type: 'VOTE',
//     payload: { id }
//   }
// }

// export default anecdoteReducer