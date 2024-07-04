export const isPersonExist = (persons, newName, newNumber) =>
  persons.some(
    ({ name, number }) =>
      name.toLowerCase() === newName.toLowerCase() || number === newNumber
  );
