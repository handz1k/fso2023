import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'

const usersSlice = createSlice({
  name: 'userlist',
  initialState: [],
  reducers: {
    returnUsers(state, action) {
      return action.payload
    }
  }
})

export const { returnUsers } = usersSlice.actions

export const getUsers = () => {
  return async dispatch => {
    const users = await loginService.getAll()
    dispatch(returnUsers(users))
  }
}

export default usersSlice.reducer