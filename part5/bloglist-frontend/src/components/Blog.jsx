import { useState } from 'react'

const Blog = ({ blog, likeAddition, blogDeleter, currentUser }) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [blogVisible, setBlogVisible] = useState(false)
  const hideWhenVisible = { display: blogVisible ? 'none' : '' }
  const showWhenVisible = { display: blogVisible ? '' : 'none' }

  const toggleBlogs = () => {
    setBlogVisible(!blogVisible)
  }

  const setLike = (event) => {
    event.preventDefault()
    likeAddition({
      ...blog, likes: blog.likes + 1
    })
  }

  const removeBlog = (event) => {
    window.confirm(`Remove blog ${blog.title} by ${blog.author}`)
    event.preventDefault()
    blogDeleter(blog)
  }


  return(
    <div>
      <div style = {{ ...blogStyle, ...hideWhenVisible, }} className='shownInfo'>
        {blog.title} {blog.author}
        <button onClick={toggleBlogs}>view</button>
      </div>
      <div style = {{ ...blogStyle, ...showWhenVisible }}>
        <div>{blog.title} {blog.author}
          <button onClick={() => setBlogVisible(false)}>hide</button>
        </div>
        <div>{blog.url}</div>
        <div>likes {blog.likes}<button onClick= {setLike}>like</button></div>
        <div>{blog.user.name}</div>
        {blog.user.name === currentUser.name && (
          <div><button onClick = {removeBlog}>remove</button></div>
        )
        }
      </div>
    </div>
  )}
Blog.displayName = 'Blog'

export default Blog