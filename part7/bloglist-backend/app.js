const express = require('express')
const http = require('http')
const app = express()
require('dotenv').config()
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const middleware = require('./utils/middleware')
const mongoose = require('mongoose')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')


const MONGODB_URI = process.env.NODE_ENV === 'test'
? process.env.TEST_MONGODB_URI
: process.env.MONGODB_URI

const mongoUrl = MONGODB_URI

mongoose.connect(mongoUrl)
.then(() => {
  console.log('connected to MongoDB')
})
.catch((error) => {
  console.log('error connecting to MongoDB:', error.message)
})

app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/tests')
  app.use('/api/testing', testingRouter)}

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)


module.exports = app

 