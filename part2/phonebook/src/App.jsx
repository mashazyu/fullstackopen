import { useEffect, useState } from "react";
import axios from "axios";

import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import {
  isInputEmpty,
  isPersonExist,
  filteredPersons,
  isValidPhoneNumber,
} from "./utils";

const App = () => {
  const [persons, setPersons] = useState(null);
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3001/persons")
      .then(({ data }) => setPersons(data));
  }, []);

  const handleNameChange = (event) => setName(event.target.value);
  const handleNumberChange = (event) => setNumber(event.target.value);
  const handleFilterChange = (event) => setFilter(event.target.value);

  const addName = (event) => {
    event.preventDefault();
    const person = {
      id: persons.length + 1,
      name,
      number,
    };

    if (isInputEmpty(name, number)) {
      alert("Either name or number input is empty. Please fill in both fields");
      return;
    }

    if (!isValidPhoneNumber(number)) {
      alert(`${number} is not a valid pnone number`);
      return;
    }

    if (isPersonExist(persons, name, number)) {
      alert(`Either ${name} or ${number} is already added to phonebook`);
      return;
    } else {
      axios.post("http://localhost:3001/persons", person).then(() => {
        setPersons(persons.concat(person));
        setName("");
        setNumber("");
      });
    }
  };

  if (!persons) return null;

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <PersonForm
        addName={addName}
        name={name}
        handleNameChange={handleNameChange}
        number={number}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons persons={filteredPersons(persons, filter)} />
    </div>
  );
};

export default App;
