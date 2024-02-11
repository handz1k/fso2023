import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Togglable from './components/Toggable'
import Notification from './components/Notification'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { handleLogin, handleLogout, initializeBlogUser } from './reducers/userReducer'
import { getUsers } from './reducers/userlistReducer'
import './Userlist.css'

const UserList = () => {
  const users = useSelector(state => state.userlist);
  return (
    <div>
      <h1>Users</h1>
      <div className="users-container">
        <div className="users-header">
          <b>blogs created</b>
        </div>
        {users.map((user) => (
          <div key={user.id} className="user-entry">
            <div className="user-name">{user.name}</div>
            <div className="blog-count">{user.blogs.length}</div>
          </div>
        ))}
      </div>
    </div>
  )
}


const DefaultPath = ({ blogs, blogFormRef, user }) => {
  const blogList = () => (
    <Togglable buttonLabel="new blog" ref={blogFormRef}>
      <BlogForm/>
    </Togglable>
  )
  return (
    <div>
      {blogList()}
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} currentUser = {user}/>
      )}
    </div>
  )
}

const App = () => {

  const blogFormRef = useRef()
  const dispatch = useDispatch()
  const blogs = useSelector(state => {
    return state.blogs
  })
  const user = useSelector(state => state.users)


  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(initializeBlogUser())
  }, [dispatch])

  useEffect(() => {
    dispatch(getUsers())
  }, [dispatch])


  const handleLoginToBlogs = async (event) => {
    event.preventDefault()
    const username = event.target.username.value
    const password = event.target.password.value
    dispatch(handleLogin(username, password))
  }

  const handleLogoutFromBlogs = async (event) => {
    event.preventDefault()
    dispatch(handleLogout())
  }


  const loginForm = () => (
    <div>
      <Notification/>
      <form onSubmit = {handleLoginToBlogs}>
        <div>
          username
          <input
            type="text"
            name="username"
          />
        </div>
        <div>
          password
          <input
            type="password"
            name="password"
          />
        </div>
        <button type ="submit">login</button>
      </form>
    </div>
  )

  return (
    <div className='container'>
      {!user && loginForm()}
      {user &&
      <div>
        <h2>blogs</h2>
        <Notification/>
        <p>{user.username} logged in</p>
        <button onClick={handleLogoutFromBlogs} type = "submit">logout</button>
      </div>}
      <Routes>
        <Route path="/" element={<DefaultPath blogs={blogs} blogformRef={blogFormRef} user={user}/>}/>
        <Route path="/users" element={<UserList/>}/>
      </Routes>
    </div>
  )}

export default App