import React, { useState, useContext } from 'react';
import { Header, Sorting } from "./catalog_style";
import CardItem from '../../../components/CardItem/Carditem';
import styled from 'styled-components';
import { Button } from 'antd';
import { CenteredButton } from '../../../components/button/catalog_button_style';
import { Link, useNavigate } from 'react-router-dom';
import SearchComponent from '../../../components/search/search';

import { DataContext } from '../DataContext';
import SortComponent from '../../../components/sort/sort';


const CardRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: space-around;
  margin-bottom: 20px;
`;

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Catalog = () => {
  const { data } = useContext(DataContext); // Correctly extract data from context
  const [items, setItems] = useState(data); 
  const [selectedType, setSelectedType] = useState('All'); 
  const navigate = useNavigate();

  const handleDelete = (id) => {
    // Assuming you'd want to notify the context provider about deletion
    setItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const handleSearch = (searchTerm) => {
    const normalizedSearchTerm = searchTerm.trim().toLowerCase();
    const filteredItems = data.filter(item =>
      item.title.toLowerCase().includes(normalizedSearchTerm)
    );
    setItems(filteredItems);
  };

  const handleTypeChange = (type) => {
    setSelectedType(type);
    const filteredItems = type === 'All' ? data : data.filter(item => item.type === type);
    setItems(filteredItems);
  };

  const separateElements = () => {
    const rows = [];
    for (let i = 0; i < items.length; i += 3) {
      rows.push(items.slice(i, i + 3));
    }
    return rows;
  };

  return (
    <div className='header'>
      <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center", marginBottom: '10px' }}>
        <SearchComponent onSearch={handleSearch} />   
        <Header>
          <h1>Catalog Page</h1>
        </Header>


        <SortComponent allItems={data} setItems={setItems} />

        {/* <Sorting>
          <SortByName items={items} setItems={setItems} selectedType={selectedType} /> 
          <SortByPrice items={items} setItems={setItems} selectedType={selectedType} />
          <SortByType items={items} setItems={setItems} allItems={data} onTypeChange={handleTypeChange} />
        </Sorting> */}
      </div>
      <CardWrapper>
        {separateElements().map((row, rowIndex) => (
          <CardRow key={rowIndex}>
            {row.map((item) => (
              <div key={item.id} style={{ flex: '0 1 30%' }}>
                <CardItem
                  title={item.title}
                  text={item.text}
                  imageSrc={item.image}
                  price={item.price}
                  type={item.type}
                  id={item.id}
                  onDelete={() => handleDelete(item.id)}
                  onClick={() => navigate(`/view/${item.id}`)}
                />
              </div>
            ))}
          </CardRow>
        ))}
      </CardWrapper>

      <Link to={"/create"} style={{ textDecoration: 'none' }}>
        <CenteredButton size="large">Create</CenteredButton>
      </Link>
    </div>
  );
};

export default Catalog;
