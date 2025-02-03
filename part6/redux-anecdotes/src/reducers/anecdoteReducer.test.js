import reducer from './anecdoteReducer'
import deepFreeze from 'deep-freeze'

describe('anecdoteReducer', () => {
  test('returns new state with action anecdotes/create', () => {
    const state = []
    const action = {
      type: 'anecdotes/create',
      payload: {
        content: 'the app state is in redux store',
        votes: 0,
        id: 1
      }
    }

    deepFreeze(state)
    const newState = reducer(state, action)

    expect(newState).toHaveLength(1)
    expect(newState.map(s => s.content)).toContainEqual(action.payload)
  })

  test('returns new state with increased number of votes on VOTE action', () => {
    const state = [
        {
            content: 'the app state is in redux store',
            votes: 3,
            id: 1
        }
    ]
    const action = {
      type: 'anecdotes/vote',
      payload: {
        id: 1
      }
    }

    deepFreeze(state)
    const newState = reducer(state, action)

    expect(newState[0]).toEqual({
        content: 'the app state is in redux store',
        votes: 4,
        id: 1
    })
  })
})