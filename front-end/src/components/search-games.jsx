import React, { useState } from "react";

const Search = ({ onSearch }) => {
  const [searchedValue, setSearchedValue] = useState("");

  const handleChange = (event) => {
    const value = event.target.value;
    setSearchedValue(value);
    onSearch(value);
  };

  return (
    <div className="search-bar">
      <label>Search: </label>
      <input
        type="text"
        placeholder="Search Game Library"
        onChange={handleChange}
        value={searchedValue}
      />
    </div>

  );
};

export default Search;
