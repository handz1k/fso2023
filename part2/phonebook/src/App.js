import { useState, useEffect } from 'react'
import Filter from './components/Filter.js'
import PersonForm from './components/PersonForm.js'
import Persons from './components/Persons.js'
import phonebookService from './services/phonebook.js'
import Notification from './components/Notification.js'
import DeleteNotification from './components/DeleteNotification.js'
import './index.css'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newStringFilter, setStringFilter] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, seterrorMessage] = useState(null)


  useEffect(() => {
      phonebookService.getAll().then(persons =>
      {setPersons(persons)
    })
  },[])

  const addName = (event) => {
    event.preventDefault()
    const nameObject = {name: newName,
       number: newNumber}
    if (persons.some(personsName => personsName.name  === newName) && window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
      const nameToUpdate = persons.find(personsName => personsName.name === newName)
      const idOfNewName = nameToUpdate.id
      const changedName = {...nameToUpdate, number: newNumber}
      phonebookService.changeNumber(idOfNewName,changedName)
      .then(returnedName => {setPersons(persons.map(name => name.id !== idOfNewName ? name : returnedName))})
      .catch(error => {
        seterrorMessage(`Information of ${changedName.name} has already been removed from server`)
        setTimeout(() => {
          setSuccessMessage(null)}, 5000)
        setPersons(persons.filter(name => name.id !== idOfNewName))}
        )
    } else {

    phonebookService.create(nameObject)
    .then(returnedName => {setPersons(persons.concat(returnedName))
    setNewName('')})
    setSuccessMessage(`Added ${nameObject.name}`)
    setTimeout(() => {
      setSuccessMessage(null)}, 5000)
    }}

  const deleteNameFromPhonebook = (id) => {
    const nameToConfirm = persons.find(name => name.id === id)
    if (window.confirm(`Delete ${nameToConfirm.name}`)) {
    phonebookService.deleteName(id).then(() => {setPersons(persons.filter(name => name.id !== id))})
    .catch(error => {
      alert(`the id ${id} has already been deleted from the server but you got this error ${error}`)
      setPersons(persons.filter(name => name.id !== id))
    })}
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterInput = (event) => {
    console.log(event.target.value)
    setStringFilter(event.target.value)
  }

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(newStringFilter)
  );


  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message = {successMessage}/>
      <DeleteNotification message = {errorMessage}/>
      <Filter filterValue={newStringFilter} filterHandler={handleFilterInput}/>
      <h3>add a new</h3>
      <PersonForm nameSubmission={addName} nameValue={newName} nameHandler={handleNameChange}
      numberValue = {newNumber} numberHandler ={handleNumberChange}/>
      <h2>Numbers</h2>
      <Persons filteredPeople = {filteredPersons} deletionFunction={deleteNameFromPhonebook}/>
    </div>
  )
}

export default App