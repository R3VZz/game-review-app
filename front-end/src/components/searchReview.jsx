import React, { useState } from "react";

const Search = ({ onSearch }) => {
  const [searchedValue, setSearchedValue] = useState("");

  const handleChange = (event) => {
    const value = event.target.value;
    setSearchedValue(value);
    onSearch(value);
  };

  return (
    <input
      type="text"
      placeholder="Search Game Library"
      onChange={handleChange}
      value={searchedValue}
    />
  );
};

export default Search;