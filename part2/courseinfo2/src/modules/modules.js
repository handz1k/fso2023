const Header = ({name}) => {
  return (
    <div>
      <h2>
      <b>
        {name}
      </b>
      </h2>
    </div>
  )
}

const Part = ({part}) => {
  return (
    <p>
    {part.name} {part.exercises}
    </p>
  )
}

const Content = ({parts}) => {
  return (
    <div>
      {parts.map(part => (<Part key = {part.id} part = {part} />))}
    </div>
  )
}


const Course = ({courses}) => {
  return courses.map((course) =>
    <div>
      <Header name = {course.name}/>
      <Content parts = {course.parts}/>
      <Total total = {course.parts}/>
    </div>
  )
}



const Total = ({total}) => {
  const totalExercises = total.map(exerciseAmount => exerciseAmount.exercises)
  const totalSum = totalExercises.reduce((a,s) => a+s )
  return (
    <div>
      <b>
        total of {totalSum} exercises
      </b>
    </div>
  )
}

export default Course