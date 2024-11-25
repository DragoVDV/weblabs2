import React, { useState } from 'react';
import './search.css'; // Для стилів

const SearchComponent = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

 
  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

 
  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(searchQuery); 
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={handleInputChange}
        aria-label="Search"
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchComponent;
