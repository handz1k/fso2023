import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'

const loginSlice = createSlice({
  name: 'users',
  initialState: null,
  reducers: {
    loginToBlogs(state, action) {
      return action.payload
    },
    logoutFromBlogs(state, action) {
      return state = null
    },
    initializeUser(state, action) {
      return action.payload
    }
  }
})


export const { loginToBlogs, logoutFromBlogs, initializeUser } = loginSlice.actions


export const handleLogin = (username, password) => {
  return async dispatch => {
    const user = await loginService.login({ username,
      password })
    window.localStorage.setItem(
      'loggedBlogappUser', JSON.stringify(user)
    )
    blogService.setToken(user.token)
    dispatch(loginToBlogs(user))
  }
}

export const handleLogout = () => {
  return async dispatch => {
    window.localStorage.removeItem('loggedBlogappUser')
    dispatch(logoutFromBlogs())
  }
}

export const initializeBlogUser = () => {
  return async dispatch => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      dispatch(initializeUser(user))
    }
  }
}

export default loginSlice.reducer
