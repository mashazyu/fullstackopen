export const isPersonExist = (persons, newName) =>
  persons.some(({ name }) => name.toLowerCase() === newName.toLowerCase());
