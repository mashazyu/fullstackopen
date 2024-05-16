import { useState } from 'react'

const Header = ({ text }) => <h1>{text}</h1>
const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)
const Statistics = ({ text, value }) => <p>{text} {value}</p>

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
      <Header text="statistics" />
        <Statistics text="good" value={good} />
        <Statistics text="neutral" value={neutral} />
        <Statistics text="bad" value={bad} />
    </>
  )
}

export default App