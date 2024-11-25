import React from "react";
import Layout from "./Layout/layout"; 
import Home from "./Home/home";
import Catalog from "./Catalog/catalog";
import Footer from "./Footer/footer";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CreateItem from "./Create/Create";
import EditItem from "./Edit/edit";
import Overview from "./View/View";

const App = () => (
  <Router>
  <Layout/>
  <Routes>
  <Route path="/" element={<Home/>}/>
  <Route path="/catalog" element={<Catalog/>} />
  <Route path="/create" element={<CreateItem/>}/>
  <Route path="/edit/:id" element={<EditItem/>}/>
  <Route path="/view/:id" element={<Overview />} />
  </Routes> 
 
  <Footer/>
 </Router>
);

export default App;
