const mongoose = require('mongoose')
const app = require('../app')
const testHelper = require('../utils/test_helper')
const supertest = require('supertest')
const Blog = require('../models/blog')
const User = require('../models/user')
const bcrypt = require('bcrypt')

const api = supertest(app)


describe('when there are initially some notes saved', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(testHelper.blogs)
  })

  test('blogs are returned as json', async () => {
    await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
  })

  test('the object contains the field "id"', async () => {
    const response = await api.get('/api/blogs')
    console.log(response.body[0].id)
    expect(response.body[0].id).toBeDefined()
  })

  test('can add blogs with POST request', async () => {
    const newBlog = {
      "title": "Adding blogs",
      "author": "Mark Tia",
      "url": "http://blogadder.com",
      "likes": 50
    }

    await api.post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await testHelper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(testHelper.blogs.length + 1)

  })
})

describe('adding a blog and testing the values', () => {
  
  test('adding a blog without likes sets it to 0', async () => {
    const newBlog = {
      "title": "Adding blogs",
      "author": "Mark Tia",
      "url": "http://blogadder.com"
    }
    const response = await api.post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)
  
    expect(response.body).toMatchObject({ ...newBlog, likes: 0 })
  })
  test('adding a blog without title or url returns 400', async () => {
    const newBlog = {
      "author": "Mark Dds",
      "likes": 0
    }
    const blogsAtStart = await testHelper.blogsInDb()

    await api.post('/api/blogs')
    .send(newBlog)
    .expect(400)
    const blogsAtEnd = await testHelper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length)
  })
})

describe('deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await testHelper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api.delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)

    const blogsAtEnd = await testHelper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length-1)
    const contents = blogsAtEnd.map(b => b.title)
    expect(contents).not.toContain(blogToDelete.title)
  })
})

describe('editing of a blog', () => {
  test('editing likes of a blog', async () => {

    const newBlog = {
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 10,
      blogs: 4,
    }

    const blogsAtStart = await testHelper.blogsInDb()
    const blogToEdit = blogsAtStart[0]

    await api.put(`/api/blogs/${blogToEdit.id}`)
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await testHelper.blogsInDb()
    const editedBlog = blogsAtEnd.find(blog => blog.id === blogToEdit.id)

    expect(editedBlog.title).toBe("React patterns")
    expect(editedBlog.likes).toBe(10)
  })
})

describe('when there is initially one user at db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('secret', 10)
    const user = new User ({ username: 'root', passwordHash: passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await testHelper.usersInDb()
    const newUser = {
      username: 'mait',
      password: 'ilovecleartextpws',
      name: 'Mark Ait',
    }
    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    
    const usersAtEnd = await testHelper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)
    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails with proper statuscode and message if user already exists', async () => {
    const usersAtStart = await testHelper.usersInDb()
    const newUser = {
      username: 'root',
      password: 'testpw',
      name: 'Andrew',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('expected `username` to be unique')
    const usersAtEnd = await testHelper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)


  })

})


afterAll(async () => {
  await mongoose.connection.close()
})