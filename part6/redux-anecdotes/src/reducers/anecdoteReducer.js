import { createSlice } from '@reduxjs/toolkit'

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

const anecdotesSlice = createSlice({
  name: 'anecdotes',
  initialState,
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
    }
  }
})

export const { create, vote } = anecdotesSlice.actions
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