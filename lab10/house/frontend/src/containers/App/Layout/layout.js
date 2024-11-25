import React from "react";
import { StyledHeader, IconsWrapper, Header } from "./layout_styles";
import { HeaderButton } from "../../../components/button/catalog_button";
import {
  TwitterOutlined,
  ShoppingCartOutlined,
  InstagramOutlined,
  FacebookOutlined,
  AliwangwangOutlined,
 

} from "@ant-design/icons";
import { Link } from "react-router-dom";

const Layout = () => (
  <StyledHeader title="House Haven">
    <div style={{alignItems: "center"}}>

      <IconsWrapper>
        <AliwangwangOutlined />
      </IconsWrapper>
      
     <Link to={"/"} style={{textDecoration: 'none'}}>
      <p>House Haven</p>
      </Link>
      
      
    </div>
   
    <div>
      <IconsWrapper>
        <Link to={"/catalog"}>
        <HeaderButton>Catalog</HeaderButton>
        </Link>
      </IconsWrapper>
    </div>
    <div>
    <Link to={'/bincard'}>
      <IconsWrapper>
       
      
        <ShoppingCartOutlined />
        
      </IconsWrapper>
      </Link>
    </div>
  </StyledHeader>
);

export default Layout;