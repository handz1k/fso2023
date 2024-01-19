import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Togglable from './components/Toggable'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [author, setAuthor] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')


  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs.sort(blog => blog.likes).reverse() )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])


  const addLike = async (blogObject) => {
    try {
      await blogService.addLike(blogObject.id, blogObject)
      setBlogs(blogs.map(blog => blog.id !== blogObject.id ? blog : blogObject))
    } catch (exception) {
      setTimeout(() => {
        setErrorMessage(null)
      }, 2000)
    }
  }

  const removeBlog = async (blogObject) => {
    try {
      await blogService.deleteBlog(blogObject.id)
      setBlogs(blogs.filter(blog => blog.id !== blogObject.id))
    } catch (exception) {
      console.log(exception)
    }
  }

  const submitBlog = async (blogObject) => {
    try {
      blogFormRef.current.toggleVisibility()
      const blog = await blogService.create(blogObject)
      setSuccessMessage(`a new blog ${blog.title} by ${author} added`)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 3000)
      setBlogs([...blogs, blog])
      ReadableStreamDefaultReader()
    } catch (exception) {
      setTimeout(() => {
        setErrorMessage(null)
      }, 2000)
    }
  }

  const handeLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 2000)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    setUser('')
    setUsername('')
    setPassword('')
  }


  const loginForm = () => (
    <div>
      <Notification message = {errorMessage}/>
      <form onSubmit = {handeLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type ="submit">login</button>
      </form>
    </div>
  )

  const blogList = () => (
    <Togglable buttonLabel="new blog" ref={blogFormRef}>
      <BlogForm createBlog={submitBlog}/>
    </Togglable>
  )


  return (
    <div>
      {!user && loginForm()}
      {user &&
      <div>
        <h2>blogs</h2>
        <Notification message = {successMessage}/>
        <p>{user.username} logged in</p>
        <button onClick={handleLogout} type = "submit">logout</button>
        {blogList()}
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} likeAddition={addLike} blogDeleter={removeBlog} currentUser = {user}/>
        )}
      </div>}
    </div>
  )}

export default App