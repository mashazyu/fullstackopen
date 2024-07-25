import { useEffect, useState } from "react";

import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Notification from "./components/Notification";
import {
  generateId,
  getExistingPerson,
  filteredPersons,
  isNumberExist,
} from "./utils";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState(null);
  const [filter, setFilter] = useState("");
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    personService
      .getAll()
      .then((initialData) => setPersons(initialData))
      .catch((error) => {
        setError(
          `The following error occured while retrieving data from the server: '${error}'.`
        );
      });
  }, []);

  useEffect(() => {
    if (error !== null) setTimeout(() => setError(null), 5000);
  }, [error]);

  useEffect(() => {
    if (message !== null) setTimeout(() => setMessage(null), 5000);
  }, [message]);

  const handleFilterChange = (event) => setFilter(event.target.value);
  const handleDelete = ({ id, name }) => {
    if (confirm(`Delete ${name}?`)) {
      personService
        .destroy(id)
        .then((person) => {
          setPersons(persons.filter(({ id }) => id !== person.id));
          setMessage(`Deleted ${person.name}`);
        })
        .catch((error) => {
          setError(`Error occured while deleting a contact: '${error}'.`);
        });
    }
  };

  const addName = (name, number) => {
    const person = {
      id: generateId(persons),
      name,
      number,
    };

    if (isNumberExist(persons, number)) {
      setError(`Number ${number} is assigned to one of the existing contacts.`);
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
          setMessage(`Updated ${returnedPerson.name}`);
        })
        .catch((error) => {
          setError(
            `The following error occured while creating new contact '${error}'.`
          );
        });
    } else {
      personService
        .create(person)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson));
          setMessage(`Added ${returnedPerson.name}`);
        })
        .catch((error) => {
          setError(
            `The following error occured while creating new contact '${error}'.`
          );
        });
    }
  };

  if (!persons) return null;

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={error} />
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h2>Add new</h2>
      <PersonForm addName={addName} />
      <h2>Numbers</h2>
      <Persons
        persons={filteredPersons(persons, filter)}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default App;
