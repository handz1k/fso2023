const Notification = ({ message }) => {
  if (message === null) {
    return null
  }


  return (
    <div>
      <p>{message}</p>
    </div>
  )
}

Notification.displayName = 'Notification'

export default Notification