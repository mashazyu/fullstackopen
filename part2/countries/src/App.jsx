import { useState } from "react";

import Filter from "./components/Filter";

function App() {
  const [filter, setFilter] = useState("");

  const handleFilterChange = (event) => setFilter(event.target.value);

  return (
    <>
      <Filter
        text="find countries"
        filter={filter}
        handleFilterChange={handleFilterChange}
      />
    </>
  );
}

export default App;
