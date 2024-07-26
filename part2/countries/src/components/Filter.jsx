const Filter = ({ text, filter, handleFilterChange }) => (
  <div>
    {text} <input value={filter} onChange={handleFilterChange} />
  </div>
);

export default Filter;
