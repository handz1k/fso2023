import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from '../services/anecdotes'


const anecdoteSlice = createSlice ({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    addLike(state, action) {
      const anecdoteId = action.payload
      const anecdoteToChange = state.find(a => a.id === anecdoteId)
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1
      }
      return state.map(anecdote => anecdote.id !== anecdoteId ? anecdote : changedAnecdote)
      .sort((anecdote, secondAnecdote) => secondAnecdote.votes - anecdote.votes)
    },
    createAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload.sort((anecdote, secondAnecdote) => secondAnecdote.votes - anecdote.votes)
    }
  }
})

export const { addLike, createAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const addNewAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(createAnecdote(newAnecdote))
  }
}

export const addAnecdoteLike = id => {
  return async (dispatch, getState) => {
    const currentState = getState()
    const anecdoteToChange = currentState.anecdotes.find(a => a.id === id)
    const editedAnecdote = {
      ...anecdoteToChange,
      votes: anecdoteToChange.votes + 1
    }

    const changedAnecdote = await anecdoteService.addLike(id, editedAnecdote)
    dispatch(addLike(changedAnecdote.id))
  }
}

export default anecdoteSlice.reducer