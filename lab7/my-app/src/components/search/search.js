import React, { useState } from 'react';
import '../search/search.css';

const SearchComponent = ({ onSearch }) => {
const [searchTerm, setSearchTerm] = useState('');

const handleChange = (event) => {
    setSearchTerm(event.target.value);
};

const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(searchTerm); 
};

return (
    <form onSubmit={handleSubmit}>
    <input
        type="text"
        value={searchTerm}
        onChange={handleChange}
        placeholder="Search..."
        aria-label="Search"
    />
    <button type="submit">Search</button>
    </form>
);
};

export default SearchComponent;
