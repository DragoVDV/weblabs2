import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; 
import CardItem from "../../../components/ItemCard/itemCard";
import { Header, CardsContainer, Catalogfunc } from "./catalog_styles";
import SearchComponent from "../../../components/search/search";
import SortComponent from "../../../components/sorting/sorting";
import Cookies from "js-cookie";
import { StyledButton } from "../Home/home_styles";


const Catalog = () => {
  const [houses, setHouses] = useState([]);
  const [sortOption, setSortOption] = useState(""); 
  const [houseType, setHouseType] = useState(""); 
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate()

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/", {
          params: {
            ordering: sortOption,
            type: houseType,  
            search: searchQuery,
          },
        });
        setHouses(response.data);
      } catch (error) {
        console.error("Error loading houses: ", error);
      }
    };

    fetchData();
  }, [sortOption, houseType, searchQuery]);

  const handleSortChange = (option) => {
    setSortOption(option); 
  };

  const handleTypeChange = (type) => {
    setHouseType(type); 
  };

  const handleSearch = (query) => {
    setSearchQuery(query); 
  };

  const handleDelete = async (id) => {
    const csrfToken = Cookies.get("csrftoken"); // Отримуємо CSRF-токен з cookies

    try {
      await axios.delete(`http://127.0.0.1:8000/api/${id}/delete/`, {
        headers: {
          "X-CSRFToken": csrfToken, // Додаємо CSRF-токен до заголовків
        },
      });
      // Видаляємо елемент зі списку після успішного видалення
      setHouses(houses.filter((house) => house.id !== id));
    } catch (error) {
      console.error("Failed to delete item:", error);
    }
  };

  return (
    <div className="header">
      <Header>
        <h1>Catalog Page</h1>
      </Header>
      <Catalogfunc>
        <SearchComponent onSearch={handleSearch} /> 
        <SortComponent onSortChange={handleSortChange} onTypeChange={handleTypeChange} />
      </Catalogfunc>
      <div style={{display:'flex', justifyContent:'center', marginTop:'20px',}}>
      <StyledButton size="large" style={{color:'black'}} onClick={() => navigate('/create')}>
              Create
          </StyledButton>
          </div>
      <CardsContainer>
        {houses.length > 0 ? (
          houses.map((house) => (
            <CardItem
              key={house.id}
              title={house.title}
              text={house.description}
              imageSrc={`http://127.0.0.1:8000${house.image}`}
              price={house.price}
              id={house.id}
              type={house.type}
              onDelete={() => handleDelete(house.id)} // Викликаємо handleDelete з house.id
              onClick={() => console.log("Card clicked", house.id)}
            />
          ))
        ) : (
          <p>No houses found.</p>
        )}
      </CardsContainer>
      
    </div>
  );
};

export default Catalog;
