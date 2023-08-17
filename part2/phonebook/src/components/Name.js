const Name = ({person, deletion}) => {
  return (  
    <li>
      {person.name} {person.number}
      <button onClick={() => deletion(person.id)}>delete</button>
    </li>
  )
}

export default Name