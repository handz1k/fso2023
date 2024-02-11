const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

require('express-async-errors')


const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith ('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}



blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {username: 1, name: 1})
  response.json(blogs)

})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({error: 'token invalid'})
  }
  
  const user = await User.findById(decodedToken.id)

  const blog = new Blog ({
    title: body.title,
    author: body.author,
    user: user._id,
    url: body.url,
    likes: body.likes
  })

  const savedBlog = await blog.save()
  const populatedBlog = await savedBlog.populate('user', 'name')

  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(populatedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {new: true})
  response.json(updatedBlog)
})

module.exports = blogsRouter