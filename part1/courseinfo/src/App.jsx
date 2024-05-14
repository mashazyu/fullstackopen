const Header = (props) => <h1>{props.course}</h1>
const Part = (props) => <p>{props.name} {props.number}</p>
const Content = (props) => props.content.map(({name, number}) => <Part key={name} name={name} number={number} />)
const Total = (props) => <p>Number of exercises {props.total}</p>

function App() {
  const course = 'Half Stack application development'
  const content = [
    {name: 'Fundamentals of React', number: 10},
    {name: 'Using props to pass data', number: 7},
    {name: 'State of a component', number: 14}
  ]
  let total = 0;
  content.forEach(({number}) => total += number)

  return (
    <div>
      <Header course={course} />
      <Content content={content} />
      <Total total={total} />
    </div>
  )
}

export default App