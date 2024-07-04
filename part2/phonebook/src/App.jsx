import { useState } from "react";

import { isPersonExist } from "./utils";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");

  const handleNameChange = (event) => setNewName(event.target.value);
  const addName = (event) => {
    event.preventDefault();
    const person = {
      name: newName,
    };

    if (isPersonExist(persons, newName)) {
      alert(`${newName} is already added to phonebook`);
    } else {
      setPersons(persons.concat(person));
    }

    setNewName("");
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(({ name }) => (
        <p key={name}>{name}</p>
      ))}
    </div>
  );
};

export default App;
