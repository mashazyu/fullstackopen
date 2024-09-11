import { useEffect, useState } from "react";

import personsService from "../services/persons";
import { filteredPersons } from "../utils";

export const useFetchAndFilterPersons = (filter) => {
  const [persons, setPersons] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    personsService
      .getAll()
      .then((data) => setPersons(data))
      .catch((error) => {
        setError(
          `The following error occured while retrieving data from the server: '${error}'.`
        );
      });

    return () => controller.abort();
  }, [filter]);

  const create = async (person) =>
    personsService
      .create(person)
      .then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));

        return returnedPerson;
      })
      .catch((error) => {
        setError(
          `The following error occured while creating new contact '${
            error?.response?.data?.error || error
          }'.`
        );
      });

  const update = async (person, id) =>
    personsService
      .update(person, id)
      .then((returnedPerson) => {
        const updatedPersons = persons.map((person) =>
          person.id === returnedPerson.id ? returnedPerson : person
        );
        setPersons(updatedPersons);

        return returnedPerson;
      })
      .catch((error) => {
        setError(
          `The following error occured while creating new contact '${
            error?.response?.data?.error || error
          }'.`
        );
      });

  const destroy = async (id) =>
    personsService
      .destroy(id)
      .then((person) => {
        setPersons(persons.filter(({ id }) => id !== person.id));

        return person;
      })
      .catch((error) => {
        setError(`Error occured while deleting a contact: '${error}'.`);
      });

  const filtered = persons ? filteredPersons(persons, filter) : [];

  return {
    persons: filtered,
    setPersons,
    create,
    update,
    destroy,
    error,
    setError,
  };
};
