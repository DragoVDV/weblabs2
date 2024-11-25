import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./Layout/layout";
import Footer from "./Footer/Footer";
import Home from "./Home/home";
import Picture1 from "./../../Icons/PIC.jpg";
import Picture2 from "./../../Icons/PIC2.jpg";
import Picture3 from "./../../Icons/PIC3.avif";

const data = [
  {
    title: "Modern Family Home",
    text: "A spacious modern family home with an open floor plan, perfect for gatherings and entertaining.",
    image: Picture1,
    price: 715000,
  },
  {
    title: "Charming Cottage",
    text: "A cozy cottage with beautiful gardens, ideal for peaceful living and relaxation.",
    image: Picture2,
    price: 540000,
  },
  {
    title: "Luxurious Villa",
    text: "A luxurious villa featuring stunning architecture and exquisite interior design, perfect for lavish living.",
    image: Picture3,
    price: 1610000,
  },
];


const App = () => {
  return (
    <div>
    <Layout/>
    <Home data={data}/>
    <Footer/>
    </div>
  );
};

export default App;
