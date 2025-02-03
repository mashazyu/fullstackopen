import filterReducer from './filterReducer'
import deepFreeze from 'deep-freeze'

describe('anecdoteReducer', () => {
    test('returns new state with action filter/setFilter', () => {
      const state = "1234"
      const action = {
        type: 'filter/setFilter',
        payload: "tralala"
      }
  
      deepFreeze(state)
      const newState = filterReducer(state, action)
  
      expect(newState).toEqual(action.payload)
    })
})