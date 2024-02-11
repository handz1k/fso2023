import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'
import loginReducer from './reducers/userReducer'
import usersReducer from './reducers/userlistReducer'


const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogReducer,
    users: loginReducer,
    userlist: usersReducer
  }
})

export default store