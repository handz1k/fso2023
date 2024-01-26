import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    notificationVote(state, action) {
      if (action.payload) {
        return `you voted '${action.payload}'` 
      }
      return ''
    },
    notificationAnecdote(state, action) {
      if (action.payload) {
        return `you added '${action.payload}'`
      }
      return ''
    }
  }
})

export const { notificationVote, notificationAnecdote } = notificationSlice.actions
export default notificationSlice.reducer