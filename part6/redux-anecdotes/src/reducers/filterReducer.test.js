import filterReducer from './filterReducer'
import deepFreeze from 'deep-freeze'

describe('anecdoteReducer', () => {
    test('returns new state with action ADD', () => {
      const state = "1234"
      const action = {
        type: 'SET_FILTER',
        payload: "tralala"
      }
  
      deepFreeze(state)
      const newState = filterReducer(state, action)
  
      expect(newState).toEqual(action.payload)
    })
})