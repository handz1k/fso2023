import { createContext, useReducer, useContext, createElement } from 'react'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "BADREQUEST":
      return `too short anecdote, must have length 5 or more`
    case "ADD":
      if (action.payload) {
        return `anecdote '${action.payload}' added`
      }
      return ''
    case "VOTE":
      if (action.payload) {
        return `anecdote '${action.payload}' voted`
      }
      return ''
    default:
      return console.log('edit to commit')
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, '')
  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  )
}


export const useNotificationValue = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch[0]
}

export const useNotificationDispatch = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch[1]
}