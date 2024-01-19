const Blog = require("../models/blog")
const _ = require('lodash')

const blogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    blogs: 4,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    blogs: 6,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    blogs: 22,
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    blogs: 40,
    __v: 0
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    blogs: 53,
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    blogs: 22,
    __v: 0
  }  
]

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item.likes
  }
  return blogs.length === 0
  ? 0
  : blogs.reduce(reducer, 0)
}


const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return 0
  let maxLikes = 0
  let blogObject = 0
  blogs.forEach(blog => {
    if (blog.likes >= maxLikes) {
      maxLikes = blog.likes
      blogObject = blog
    }})

  return {
    author: blogObject.author,
    likes: blogObject.likes,
    title: blogObject.title
  }
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return 0
  const blogObject = _.orderBy(blogs, ['blogs'], ['desc'])
  const authorWithMostBlogs = _.head(blogObject)
  return {
    author: authorWithMostBlogs.author,
    blogs: authorWithMostBlogs.blogs
  }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) return 0
  const blogObject = _.orderBy(blogs, ['likes'], ['desc'])
  const authorWithMostBlogs = _.head(blogObject)
  const blogsByAuthor = _.filter(blogs, {'author': authorWithMostBlogs.author})
  const totalBlogs = _.reduce(blogsByAuthor, function(sum, n) {
    return sum + n.likes }
    ,0)

  return {
    author: authorWithMostBlogs.author,
    likes: totalBlogs
  }
}

const blogsInDb = async () => {
  const totalBlogs = await Blog.find({})
  return totalBlogs.map(blog => blog.toJSON())
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
  blogsInDb
}