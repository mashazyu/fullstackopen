export const getExistingPerson = (persons, newName) =>
  persons.find(({ name }) => name.toLowerCase() === newName.toLowerCase());

export const isNumberExist = (persons, newNumber) =>
  persons.some(
    ({ number }) =>
      number.replace(/[\s.-]/g, "") === newNumber.replace(/[\s.-]/g, "")
  );

export const filteredPersons = (persons, filter) =>
  persons.filter(({ name }) =>
    name.toLowerCase().includes(filter.toLowerCase())
  );
