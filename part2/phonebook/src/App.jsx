import { useEffect, useState } from "react";

import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import {
  isInputEmpty,
  getExistingPerson,
  isNumberExist,
  filteredPersons,
  isValidPhoneNumber,
} from "./utils";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState(null);
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    personService
      .getAll()
      .then((initialData) => setPersons(initialData))
      .catch((error) => {
        alert(
          `The following error occured while retrieving data from the server: '${error}'.`
        );
      });
  }, []);

  const handleNameChange = (event) => setName(event.target.value);
  const handleNumberChange = (event) => setNumber(event.target.value);
  const handleFilterChange = (event) => setFilter(event.target.value);
  const handleDelete = ({ id, name }) => {
    if (confirm(`Delete ${name}?`)) {
      personService
        .destroy(id)
        .then((person) =>
          setPersons(persons.filter(({ id }) => id !== person.id))
        )
        .catch((error) => {
          alert(`Error occured while deleting a contact: '${error}'.`);
        });
    }
  };

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

    if (isNumberExist(persons, number)) {
      alert(`${number} is already assigned to one of the users`);
      return;
    }

    const existingPerson = getExistingPerson(persons, name);
    if (existingPerson) {
      personService
        .update(person, existingPerson.id)
        .then((returnedPerson) => {
          const updatedPersons = persons.map((person) =>
            person.id === returnedPerson.id ? returnedPerson : person
          );
          setPersons(updatedPersons);
          setName("");
          setNumber("");
        })
        .catch((error) => {
          alert(
            `The following error occured while creating new contact '${error}'.`
          );
        });
    } else {
      personService
        .create(person)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson));
          setName("");
          setNumber("");
        })
        .catch((error) => {
          alert(
            `The following error occured while creating new contact '${error}'.`
          );
        });
    }
  };

  if (!persons) return null;

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h2>Add new</h2>
      <PersonForm
        addName={addName}
        name={name}
        handleNameChange={handleNameChange}
        number={number}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons
        persons={filteredPersons(persons, filter)}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default App;
