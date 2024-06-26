import { useState } from 'react'

const Header = ({ text }) => <h1>{text}</h1>
const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)
const StatisticLine = ({ text, value }) => (
  <tr>
    <td>{text}</td> 
    <td>{value}</td>
  </tr>
)
const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad
  const average = (good - bad) / all // good: 1, neutral: 0, bad: -1
  const positive = (good / all) * 100

  let stats
  if (all === 0) {
    stats = <p>No feedback given</p>
  } else {
    stats = (
      <table>
        <tbody>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="all" value={all} />
          <StatisticLine text="average" value={average ? average : 0} />
          <StatisticLine text="positive" value={`${positive ? positive : 0} %`} />
        </tbody>
      </table>
    )
  }

  return (
    <>
      <Header text="statistics" />
      {stats}
    </>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleClick = (handler, value) => () => handler(value)
 
  return (
    <>
      <Header text="give feedback" />
      <div>
        <Button onClick={handleClick(setGood, good + 1)} text="good" />
        <Button onClick={handleClick(setNeutral, neutral + 1)} text="neutral" />
        <Button onClick={handleClick(setBad, bad + 1)} text="bad" />
      </div>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  )
}

export default App