export const isPersonExist = (persons, newName, newNumber) =>
  persons.some(
    ({ name, number }) =>
      name.toLowerCase() === newName.toLowerCase() || number === newNumber
  );

export const isInputEmpty = (name, number) => name === "" || number === "";
