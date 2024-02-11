import { forwardRef, useImperativeHandle, useState } from 'react'
import PropTypes from 'prop-types'
import { setNotification } from '../reducers/notificationReducer'
import { createNewBlog } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'
import { Table, Form, Button } from 'react-bootstrap'

const BlogForm = () => {
  const dispatch = useDispatch()

  const addBlog = async (event) => {
    event.preventDefault()
    const newBlogObject = {
      title: event.target.title.value,
      author: event.target.author.value,
      url: event.target.url.value
    }

    event.target.title.value = ''
    event.target.author.value = ''
    event.target.url.value = ''


    dispatch(createNewBlog(newBlogObject))
  }

  return (
    <div>
      <form onSubmit = {addBlog}>
        <div>
          <h2>create new</h2>
          title:
          <input
            type="text"
            name="title"
            placeholder="Title"
          />
        </div>
        <div>
          author:
          <input
            type="text"
            name="author"
            placeholder="Author"
          />
        </div>
        <div>
          url:
          <input
            type="text"
            name="url"
            placeholder="Url"
          />
        </div>
        <Button variant="primary" type="submit">create</Button>
      </form>
    </div>
  )
}


BlogForm.displayName = 'BlogForm'
export default BlogForm