export const getExistingPerson = (persons, newName) =>
  persons.find(({ name }) => name.toLowerCase() === newName.toLowerCase());

export const isNumberExist = (persons, newNumber) =>
  persons.some(
    ({ number }) =>
      number.replace(/[\s.-]/g, "") === newNumber.replace(/[\s.-]/g, "")
  );

const isInputEmpty = (name, number) => name === "" || number === "";
const isValidPhoneNumber = (number) => /^[\+\(]?[\d\-\.\s]+$/.test(number);

export const filteredPersons = (persons, filter) =>
  persons.filter(({ name }) =>
    name.toLowerCase().includes(filter.toLowerCase())
  );

export const isIncorrectInput = (name, number) => {
  let error = null;

  if (isInputEmpty(name, number)) {
    error = "Either name or number input is empty. Please fill in both fields";
  }

  if (!isValidPhoneNumber(number)) {
    error = `${number} is not a valid pnone number`;
  }

  return error;
};

export const generateId = (persons) => {
  const largestId = Math.max(...persons.map(({ id }) => id));

  return (largestId + 1).toString();
};
