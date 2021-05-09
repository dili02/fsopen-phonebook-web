import React from "react";

const Filter = ({ handleSearchChange }) => (
  <div>
    filter shows with: <input onChange={handleSearchChange} />
  </div>
);

export default Filter;
