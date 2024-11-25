import React from "react";
import { StyledHeader, IconsWrapper, Header } from "./layout_styles";

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
        <TwitterOutlined />

        <FacebookOutlined />

        <InstagramOutlined />
      </IconsWrapper>
    </div>
    <div>
    <Link to={'catalog'}>
      <IconsWrapper>
       
      
        <ShoppingCartOutlined />
      </IconsWrapper>
      </Link>
    </div>
  </StyledHeader>
);

export default Layout;