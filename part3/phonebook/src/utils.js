export const getExistingPerson = (persons, newName) =>
  persons.find(({ name }) => name.toLowerCase() === newName.toLowerCase());

export const filteredPersons = (persons, filter) =>
  persons.filter(({ name }) =>
    name.toLowerCase().includes(filter.toLowerCase())
  );
