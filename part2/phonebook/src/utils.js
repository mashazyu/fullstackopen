export const isPersonExist = (persons, newName, newNumber) =>
  persons.some(
    ({ name, number }) =>
      name.toLowerCase() === newName.toLowerCase() ||
      number.replace(/[\s.-]/g, "") === newNumber.replace(/[\s.-]/g, "")
  );

export const isInputEmpty = (name, number) => name === "" || number === "";
export const isValidPhoneNumber = (number) =>
  /^[\+\(]?[\d\-\.\s]+$/.test(number);

export const filteredPersons = (persons, filter) =>
  persons.filter(({ name }) =>
    name.toLowerCase().includes(filter.toLowerCase())
  );
