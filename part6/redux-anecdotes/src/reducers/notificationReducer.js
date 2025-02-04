import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    set(state, action) {
      return action.payload
    }
  }
})

export const { set } = notificationSlice.actions

export const setNotification = ({ message, duration }) => {
  return async dispatch => {
    dispatch(set(message))
    setTimeout(() => {
        dispatch(set(""))
    }, duration * 1000);
    
  }
}

export default notificationSlice.reducer