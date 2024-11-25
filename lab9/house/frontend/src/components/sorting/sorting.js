import React from 'react';
import './sorting.css';

const SortComponent = ({ onSortChange, onTypeChange }) => {
  const handleSortChange = (e) => {
    onSortChange(e.target.value);
  };

  const handleTypeChange = (e) => {
    onTypeChange(e.target.value);
  };

  return (
    <div className="sort-container">
      <div>
        <label htmlFor="sortName">Sort by Name: </label>
        <select id="sortName" onChange={handleSortChange}>
          <option value="title">A-Z</option>
          <option value="-title">Z-A</option>
        </select>
      </div>
      <div>
        <label htmlFor="sortPrice">Sort by Price: </label>
        <select id="sortPrice" onChange={handleSortChange}>
          <option value="price">Low to High</option>
          <option value="-price">High to Low</option>
        </select>
      </div>
      <div>
        <label htmlFor="sortType">Filter by Type:</label>
        <select id="sortType" onChange={handleTypeChange}>
          <option value="">All Types</option>
          <option value="Villa">Villa</option>
          <option value="Family House">Family House</option>
          <option value="Cottage">Cottage</option>
        </select>
      </div>
    </div>
  );
};

export default SortComponent;
