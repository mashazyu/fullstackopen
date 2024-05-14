const Header = (props) => <h1>{props.course}</h1>
const Content = (props) => props.content.map(({part, exercises}) => 
  <p key={part}>{part} {exercises}</p>)
const Total = (props) => <p>Number of exercises {props.total}</p>

function App() {
  const course = 'Half Stack application development'
  const content = [
    {part: 'Fundamentals of React', exercises: 10},
    {part: 'Using props to pass data', exercises: 7},
    {part: 'State of a component', exercises: 14}
  ]
  let total = 0;
  content.forEach(({exercises}) => total+= exercises)

  return (
    <div>
      <Header course={course} />
      <Content content={content} />
      <Total total={total} />
    </div>
  )
}

export default App