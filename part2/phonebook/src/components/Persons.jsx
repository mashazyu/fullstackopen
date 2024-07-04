const Persons = ({ persons }) => (
  <>
    {persons?.map(({ id, name, number }) => (
      <p key={id}>
        {name} {number}
      </p>
    ))}
  </>
);

export default Persons;
