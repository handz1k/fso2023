import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    blogLike(state, action) {
      const blogId = action.payload.id
      const blogToChange = state.find(b => b.id === blogId)
      const changedBlog = {
        ...blogToChange,
        likes: blogToChange.likes + 1
      }
      return state.map(blog => blog.id !== blogId ? blog : changedBlog)
        .sort((blog, secondBlog) => secondBlog.likes - blog.likes)

    },
    setBlogs(state, action) {
      return action.payload.sort((blog, secondBlog) => secondBlog.likes - blog.likes)
    },
    createBlog(state, action) {
      state.push(action.payload)
    },
    removeBlog(state, action) {
      const blogToRemoveId = action.payload
      const blogToRemove = state.find(b => b.id === blogToRemoveId)
      return state.filter(b => b !== blogToRemove)
    }
  }
})

export const { blogLike, createBlog, setBlogs, removeBlog } = blogSlice.actions

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createNewBlog = content => {
  return async dispatch => {
    const newBlog = await blogService.create(content)
    dispatch(createBlog(newBlog))
  }
}

export const addLikeBlog = (id, object) => {
  return async dispatch => {
    const likedBlog = await blogService.addLike(id, object)
    dispatch(blogLike(likedBlog))
  }
}

export const removeBlogs = (id) => {
  return async dispatch => {
    await blogService.deleteBlog(id)
    dispatch(removeBlog(id))
  }
}

export default blogSlice.reducer