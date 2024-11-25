import React from "react";
import { StyledHeader, IconsWrapper, Header } from "./layout_styles";
import { CenteredButton } from "../../../components/button/catalog_button_style";
import {
  TwitterOutlined,
  SearchOutlined,
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
      
      <Link to="/" style={{textDecoration:"none", color: "black"}}>
      <p>House Haven</p>
      </Link>
      
      
    </div>
    <Link to="/catalog" style={{ textDecoration: 'none' }}> 
        <CenteredButton size="large">Catalog</CenteredButton>
      </Link>
    <div>
      <IconsWrapper>
        <TwitterOutlined />

        <FacebookOutlined />

        <InstagramOutlined />
      </IconsWrapper>
    </div>
    <div>
      <IconsWrapper>
       

        <ShoppingCartOutlined />
      </IconsWrapper>
    </div>
  </StyledHeader>
);

export default Layout;