import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('BlogForm updates the parent state and calls onSubmit', async () => {
  const user = userEvent.setup()
  const createBlog = jest.fn()

  render(<BlogForm createBlog={createBlog}/>)
  const inputTitle = screen.getByPlaceholderText('Title')
  const inputAuthor = screen.getByPlaceholderText('Author')
  const inputUrl = screen.getByPlaceholderText('Url')

  const sendButton = screen.getByText('create')

  await user.type(inputTitle, 'testing this')
  await user.type(inputAuthor, 'Mark Ait')
  await user.type(inputUrl, 'www.sss.com')
  await user.click(sendButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('testing this')


})