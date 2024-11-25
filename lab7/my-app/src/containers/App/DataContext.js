import React, { createContext, useContext, useState } from "react";
import Picture1 from "./../../Icons/PIC.jpg";
import Picture2 from "./../../Icons/PIC2.jpg";
import Picture3 from "./../../Icons/PIC3.avif";

const initialData = [
  { id: 1, title: "Modern Family Home", text: "A spacious modern family home with an open floor plan, perfect for gatherings and entertaining.", image: Picture1, price: 715000, type: 'Cottage' },
  { id: 2, title: "Charming Cottage", text: "A cozy cottage with beautiful gardens, ideal for peaceful living and relaxation.", image: Picture2, price: 540000, type: 'Family House' },
  { id: 3, title: "Luxurious Villa", text: "A luxurious villa featuring stunning architecture and exquisite interior design, perfect for lavish living.", image: Picture3, price: 1610000, type: 'Villa' },
  { id: 4, title: "Dick", text: "A luxurious villa featuring stunning architecture and exquisite interior design, perfect for lavish living.", image: Picture3, price: 1610000, type: 'Villa' },
];

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [data, setData] = useState(initialData);
  const [items, setItems] = useState(data); // зберігаємо items тут

  const handleUpdateItem = (updatedItem) => {
    const isDuplicate = data.some(item => 
      item.title === updatedItem.title && item.id !== updatedItem.id
    );
  
    if (isDuplicate) {
      alert("An item with this title already exists.");
      return;
    }
  
    setData(prevData => prevData.map(item => (item.id === updatedItem.id ? updatedItem : item))); 
  };

  const handleCreateItem = (newItem) => {
    setData((prevData) => [...prevData, newItem]);
  };

  const handleDeleteItem = (id) => {
    setData(prevData => prevData.filter(item => item.id !== id));
  };

  return (
    <DataContext.Provider value={{ data, items, setItems, handleUpdateItem, handleCreateItem, handleDeleteItem }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
