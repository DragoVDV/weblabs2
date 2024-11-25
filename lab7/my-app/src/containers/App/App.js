// App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./Layout/layout";
import Footer from "./Footer/Footer";
import Home from "./Home/home";
import Catalog from './Catalog/catalog';
import EditItem from "../Edit/edit"; 
import CreateItem from "./Create/Create";
import Overview from "./View/view";
import { DataProvider } from "./DataContext";

const App = () => (
  <DataProvider>
    <Router>
      <Layout />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/edit/:id" element={<EditItem />} />
        <Route path="/create" element={<CreateItem />} />
        <Route path="/view/:id" element={<Overview />} /> 
      </Routes>
      <Footer />
    </Router>
  </DataProvider>
);

export default App;
