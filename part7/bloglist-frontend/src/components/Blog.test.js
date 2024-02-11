import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    title: 'Testing the front-end',
    author: 'Mark Ait',
    user: '659d6e861c0da0e297468128',
    url: 'www.csaalto.fi',
    likes: 10
  }

  const user = {
    username: 'newUser123',
    name: 'John Doe',
    id: '659d6e861c0da0e297468128'
  }

  const { container } = render(<Blog blog={blog} currentUser={user}/>)

  const div = container.querySelector('.shownInfo')
  expect(div).toHaveTextContent(
    'Testing the front-end'
  )
})

test('show everything after button is pressed', () => {
  const blog = {
    title: 'Testing the front-end',
    author: 'Mark Ait',
    user: '659d6e861c0da0e297468128',
    url: 'www.csaalto.fi',
    likes: 10
  }

  const user = {
    username: 'newUser123',
    name: 'John Doe',
    id: '659d6e861c0da0e297468128'
  }

  render(<Blog blog={blog} currentUser={user} />)

  const viewButton = screen.getByText('view')
  userEvent.click(viewButton)

  expect(screen.getByText('www.csaalto.fi')).toBeInTheDocument()
  expect(screen.getByText(`likes ${blog.likes}`)).toBeInTheDocument()
})

test('liking a blog twice, event handler is called twice', async () => {
  const blog = {
    title: 'Testing the front-end',
    author: 'Mark Ait',
    user: '659d6e861c0da0e297468128',
    url: 'www.csaalto.fi',
    likes: 10
  }

  const user = {
    username: 'newUser123',
    name: 'John Doe',
    id: '659d6e861c0da0e297468128'
  }
  const likeAddition = jest.fn()
  const userHandler = userEvent.setup()

  render(<Blog blog={blog} currentUser={user} likeAddition = {likeAddition} />)

  const viewButton = screen.getByText('view')
  userHandler.click(viewButton)
  const likeButton = screen.getByText('like')
  await userHandler.click(likeButton)
  await userHandler.click(likeButton)
  expect(likeAddition.mock.calls).toHaveLength(2)


})
