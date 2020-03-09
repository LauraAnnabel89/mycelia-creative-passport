import React, { useState } from "react";

const SearchBar = props => {
  const [searchValue, setSearchValue] = useState("");

  const handleSearchInputChanges = e => {
    setSearchValue(e.target.value);
  };

  const resetInputField = () => {
    setSearchValue("");
  };

  const callSearchFunction = e => {
    e.preventDefault();
    props.search(searchValue);
    resetInputField();
  };

  return (
    <form className="SearchBar">
      <input
        value={searchValue}
        onChange={handleSearchInputChanges}
        type="text"
      />
      <input
        onClick={callSearchFunction}
        type="submit"
        value="SEARCH"
        className="button"
      />
      <div className="search" />
    </form>
  );
};

export default SearchBar;
