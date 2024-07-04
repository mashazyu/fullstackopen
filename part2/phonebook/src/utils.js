export const isPersonExist = (persons, newName, newNumber) =>
  persons.some(
    ({ name, number }) =>
      name.toLowerCase() === newName.toLowerCase() || number === newNumber
  );

export const isInputEmpty = (name, number) => name === "" || number === "";

export const filteredPersons = (persons, filter) =>
  persons.filter(({ name }) =>
    name.toLowerCase().includes(filter.toLowerCase())
  );
