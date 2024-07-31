const Persons = ({ persons, handleDelete }) => (
  <>
    {persons?.map(({ id, name, number }) => (
      <p key={id}>
        {name} {number}{" "}
        <button onClick={() => handleDelete({ id, name })}>delete</button>
      </p>
    ))}
  </>
);

export default Persons;
