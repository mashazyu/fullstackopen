import { useRef, useState } from "react";

import Notification from "./Notification";

import { isIncorrectInput } from "../utils";

const PersonForm = ({ addName }) => {
  const nameRef = useRef("");
  const numberRef = useRef("");
  const [error, setError] = useState(null);

  const handleOnSubmint = (event) => {
    event.preventDefault();

    if (isIncorrectInput(nameRef.current.value, numberRef.current.value)) {
      setError(`Incorrect input.`);
      return;
    } else {
      addName(nameRef.current.value, numberRef.current.value);
    }
  };

  return (
    <>
      <Notification message={error} />
      <form onSubmit={handleOnSubmint}>
        <div>
          name: <input ref={nameRef} type="text" />
        </div>
        <div>
          number: <input ref={numberRef} type="tel" />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  );
};

export default PersonForm;
