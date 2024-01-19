import { useState } from 'react'

const Button = ({handleClick, text}) => {
  return(
  <button onClick = {handleClick}>
    {text}
  </button>
  )
}

const StatisticLine = (props) => {
  return (
    <table>
      <tbody>
        <tr>
          <td>{props.text}</td>
          <td>{props.value}</td>
        </tr>
      </tbody>
    </table>
  );
};


const Statistics = (props) => {
  const allScores = props.good + props.neutral + props.bad
  const averageScores = (props.good - props.bad) / allScores
  const positiveScores = props.good / allScores * 100
  if (allScores > 0) {
  return (
  <div>
    <h1> statistics </h1>
    <StatisticLine text="good" value ={props.good} />
    <StatisticLine text="neutral" value ={props.neutral} />
    <StatisticLine text="bad" value ={props.bad} />
    <StatisticLine text="all" value ={allScores} />
    <StatisticLine text="average" value ={averageScores} />
    <StatisticLine text="positive" value = {`${positiveScores}%`} />
  </div>
  )
  }
  return (
    <p> No feedback given </p>
  )
}
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1> give feedback </h1>
      <Button handleClick={() => setGood(good + 1)} text = "good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text = "neutral" />
      <Button handleClick={() => setBad(bad + 1)} text = "bad" />
      <Statistics good = {good} neutral = {neutral} bad = {bad}/>
    </div>
  )
}

export default App