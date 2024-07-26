const Filter = ({ text, filter, handleFilterChange }) => (
  <>
    {text} <input value={filter} onChange={handleFilterChange} />
  </>
);

export default Filter;
