import { createSlice } from '@reduxjs/toolkit'

const getId = () => (100000 * Math.random()).toFixed(0)

const anecdotesSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    create(state, action) {
      const content = action.payload

      state.push({
        content,
        votes: 0,
        id: getId(),
      })
    },
    vote(state, action) {
      const id = action.payload.id
      
      return state.map(obj => obj.id === id ? {...obj, votes: obj.votes + 1} : obj )
    },
    set(state, action) {
      return action.payload
    }
  }
})

export const { create, set, vote } = anecdotesSlice.actions
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