import React, { useState } from "react";

const SearchForm = ({ onSearch }) => {
  const [search, setSearch] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(search);
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <label className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2">
        <span className="text-sm">What is Manga name?</span>
        <input
          type="text"
          onChange={(e) => setSearch(e.currentTarget.value)}
          placeholder="Enter a name..."
          className="input input-bordered max-w-xs w-full"
        />
        <button type="submit" className="btn btn-outline mt-2 sm:mt-0">
          Search
        </button>
      </label>
    </form>
  );
};

export default SearchForm;