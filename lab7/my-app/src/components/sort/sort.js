import React, { useState, useEffect } from 'react';
import { useData } from '../../containers/App/DataContext';
import './sort.css'; // Путь до вашого CSS файлу

const SortComponent = ({ allItems, setItems }) => {
    const [sortValue, setSortValue] = useState({
        name: 'nameAsc',
        price: 'priceAsc',
        type: 'All'
    });

    useEffect(() => {
        sortItems();
    }, [sortValue, allItems]);


    const handleNameSortChange = (event) => {
        const value = event.target.value;
        setSortValue((prev) => ({ ...prev, name: value }));
    };

    const handlePriceSortChange = (event) => {
        const value = event.target.value;
        setSortValue((prev) => ({ ...prev, price: value }));
    };

    const handleTypeChange = (event) => {
        const value = event.target.value;
        setSortValue((prev) => ({ ...prev, type: value }));
    };

    const sortItems = () => {
        // Якщо вибрано тип "All", не фільтруємо елементи
        let filteredItems = sortValue.type === 'All' ? [...allItems] : allItems.filter(item => item.type === sortValue.type);
    
        // Сортуємо спочатку по назві
        if (sortValue.name === 'nameAsc') {
            filteredItems.sort((a, b) => a.title.localeCompare(b.title));
        } else if (sortValue.name === 'nameDesc') {
            filteredItems.sort((a, b) => b.title.localeCompare(a.title));
        }
    
        // Потім сортуємо по ціні
        if (sortValue.price === 'priceAsc') {
            filteredItems.sort((a, b) => a.price - b.price);
        } else if (sortValue.price === 'priceDesc') {
            filteredItems.sort((a, b) => b.price - a.price);
        }
    
        // Оновлюємо стан з відфільтрованими та відсортованими елементами
        setItems(filteredItems);
    };
    
    

    const uniqueTypes = [...new Set(allItems.map(item => item.type)), 'All'];

    return (
        <div className="sort-container">
            <div>
                <label htmlFor="sortName">Sort by Name: </label>
                <select id="sortName" value={sortValue.name} onChange={handleNameSortChange}>
                    <option value="nameAsc">A-Z</option>
                    <option value="nameDesc">Z-A</option>
                </select>
            </div>
            <div>
                <label htmlFor="sortPrice">Sort by Price: </label>
                <select id="sortPrice" value={sortValue.price} onChange={handlePriceSortChange}>
                    <option value="priceAsc">Low to High</option>
                    <option value="priceDesc">High to Low</option>
                </select>
            </div>
            <div>
                <label htmlFor="sortType">Filter by Type: </label>
                <select id="sortType" value={sortValue.type} onChange={handleTypeChange}>
                    {uniqueTypes.map((type, index) => (
                        <option key={index} value={type}>{type}</option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default SortComponent;
