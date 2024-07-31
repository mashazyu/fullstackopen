import { useEffect, useState } from "react";

import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Notification from "./components/Notification";

import { useFetchAndFilterPersons } from "./hooks/useFetchAndFilterPersons";
import { getExistingPerson, isNumberExist } from "./utils";

const App = () => {
  const [filter, setFilter] = useState("");
  const [message, setMessage] = useState(null);
  const { persons, create, update, destroy, error, setError } =
    useFetchAndFilterPersons(filter);

  useEffect(() => {
    if (error !== null) setTimeout(() => setError(null), 5000);
  }, [error]);

  useEffect(() => {
    if (message !== null) setTimeout(() => setMessage(null), 5000);
  }, [message]);

  const handleFilterChange = (event) => setFilter(event.target.value);
  const handleDelete = ({ id, name }) => {
    if (confirm(`Delete ${name}?`)) {
      destroy(id).then(({ name }) => setMessage(`Deleted ${name}`));
    }
  };

  const addName = (name, number) => {
    const person = {
      name,
      number,
    };

    if (isNumberExist(persons, number)) {
      setError(`Number ${number} is assigned to one of the existing contacts.`);
      return;
    }

    const existingPerson = getExistingPerson(persons, name);
    if (existingPerson) {
      update(person, existingPerson.id).then((updatedPerson) => {
        if (updatedPerson && !error) {
          setMessage(`Updated ${updatedPerson.name}`);
        }
      });
    } else {
      create(person).then((newPerson) => {
        if (newPerson && !error) {
          setMessage(`Added ${newPerson?.name}`);
        }
      });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={error || message} isError={error} />
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h2>Add new</h2>
      <PersonForm addName={addName} />
      <h2>Numbers</h2>
      {persons && <Persons persons={persons} handleDelete={handleDelete} />}
    </div>
  );
};

export default App;
