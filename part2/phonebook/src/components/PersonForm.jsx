const PersonForm = ({
  addName,
  name,
  handleNameChange,
  number,
  handleNumberChange,
}) => (
  <form onSubmit={addName}>
    <div>
      name: <input value={name} onChange={handleNameChange} />
    </div>
    <div>
      number: <input value={number} onChange={handleNumberChange} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
);

export default PersonForm;
