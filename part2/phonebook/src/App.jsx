import { useState } from "react";

import { isInputEmpty, isPersonExist } from "./utils";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");

  const handleNameChange = (event) => setName(event.target.value);
  const handleNumberChange = (event) => setNumber(event.target.value);
  const addName = (event) => {
    event.preventDefault();
    const person = {
      name,
      number,
    };

    if (isInputEmpty(name, number)) {
      alert(
        "Either name or number input is empty. Please fill in both fields."
      );
      return;
    }

    if (isPersonExist(persons, name, number)) {
      alert(`Either ${name} or ${number} is already added to phonebook`);
      return;
    } else {
      setPersons(persons.concat(person));
    }

    setName("");
    setNumber("");
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={name} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={number} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(({ name, number }) => (
        <p key={name}>
          {name} {number}
        </p>
      ))}
    </div>
  );
};

export default App;
