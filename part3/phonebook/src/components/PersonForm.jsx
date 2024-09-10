import { useEffect, useRef, useState } from "react";

import Notification from "./Notification";

const PersonForm = ({ addName }) => {
  const nameRef = useRef("");
  const numberRef = useRef("");
  const [error, setError] = useState(null);

  useEffect(() => {
    if (error !== null) setTimeout(() => setError(null), 5000);
  }, [error]);

  const handleOnSubmint = async (event) => {
    event.preventDefault();

    const isSuccess = await addName(
      nameRef.current.value,
      numberRef.current.value
    );

    if (isSuccess) {
      nameRef.current.value = "";
      numberRef.current.value = "";
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
