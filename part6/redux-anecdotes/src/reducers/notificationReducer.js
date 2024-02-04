import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    notificationVote(state, action) {
      return action.payload
    }
  }
})

export const { notificationVote, notificationAnecdote } = notificationSlice.actions

export const setNotification = (content, time) => {
  return async dispatch => {
    dispatch(notificationVote(content))
    setTimeout(() => {
      dispatch(notificationVote(''))
    }, time*1000)
  }
}

export default notificationSlice.reducer