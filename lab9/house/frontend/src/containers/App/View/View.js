import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CenteredButton } from '../../../components/button/catalog_button';

import './view_style.css';

const Overview = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null); // Стан для зберігання даних елемента
  const navigate = useNavigate();  // Ініціалізуємо хук useNavigate

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/${id}/`);
        setItem(response.data);
      } catch (error) {
        console.error("Error fetching item:", error);
      }
    };

    fetchItem();
  }, [id]);

  if (!item) {
    return <div>Item not found</div>;
  }

  return (
    <div className="overview-container">
      <h1 className="overview-title">{item.title}</h1>
      <img className="overview-image" src={`http://127.0.0.1:8000${item.image}`} alt={item.title} />
      <p className="overview-text">{item.description}</p>
      <p className="overview-price">Price: ${item.price}</p>
      <p className="overview-type">Type: {item.type}</p>
      <CenteredButton onClick={() => navigate(-1)}>Go back</CenteredButton> 
    </div>
  );
};

export default Overview;
