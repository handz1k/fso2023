import Name from './Name.js'

const Persons = ({filteredPeople,deletionFunction}) =>{
return(
  <div>
    <ul>
      {filteredPeople.map(name => <Name key = {name.name} person = {name} deletion = {deletionFunction}/>)}
    </ul>
  </div>
)}

export default Persons