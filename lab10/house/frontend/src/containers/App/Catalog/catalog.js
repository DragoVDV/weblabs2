import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { message } from "antd";
import axios from "axios";
import CardItem from "../../../components/ItemCard/itemCard";
import { Header, CardsContainer, Catalogfunc } from "./catalog_styles";
import SearchComponent from "../../../components/search/search";
import SortComponent from "../../../components/sorting/sorting";
import { clearMessage, addToCartBackend } from "../../../store/houseSlice";
import Cookies from "js-cookie";
import { StyledButton } from "../Home/home_styles";

const Catalog = () => {
  const [houses, setHouses] = useState([]);
  const [sortOption, setSortOption] = useState("");
  const [houseType, setHouseType] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Отримуємо повідомлення з Redux
  const reduxMessage = useSelector((state) => state.house.message);

  // Відображаємо повідомлення, якщо воно існує
  useEffect(() => {
    if (reduxMessage) {
      message.success(reduxMessage); // Відображаємо повідомлення
      dispatch(clearMessage()); // Очищаємо повідомлення, щоб уникнути дублювання
    }
  }, [reduxMessage, dispatch]);

  // Завантаження даних
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
    const csrfToken = Cookies.get("csrftoken");

    try {
      await axios.delete(`http://127.0.0.1:8000/api/${id}/delete/`, {
        headers: {
          "X-CSRFToken": csrfToken,
        },
      });
      setHouses((prevHouses) => prevHouses.filter((house) => house.id !== id));
    } catch (error) {
      console.error("Failed to delete item:", error);
    }
  };

  const handleAddToCart = (id) => {
    dispatch(addToCartBackend(id))
      .unwrap()
      .catch((err) => {
        message.error(`Failed to add house to cart: ${err}`);
      });
  };

  return (
    <div>
      <Header>
        <h1>Catalog Page</h1>
      </Header>
      <Catalogfunc>
        <SearchComponent onSearch={handleSearch} />
        <SortComponent onSortChange={handleSortChange} onTypeChange={handleTypeChange} />
      </Catalogfunc>
      <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
        <StyledButton
          size="large"
          style={{ color: "black" }}
          onClick={() => navigate("/create")}
        >
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
              onDelete={() => handleDelete(house.id)} // Видалення об'єкта
              onAddToCart={() => handleAddToCart(house.id)} // Додавання до кошика
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
