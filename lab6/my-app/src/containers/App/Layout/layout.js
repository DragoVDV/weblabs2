import React from "react";
import { StyledHeader, IconsWrapper } from "./layout_styles";
import {
  TwitterOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
  InstagramOutlined,
  FacebookOutlined,
  AliwangwangOutlined,
} from "@ant-design/icons";

const Layout = () => (
  <StyledHeader title="House Haven">
    <div>
      <IconsWrapper>
        <AliwangwangOutlined />
      </IconsWrapper>
      <p>House Haven</p>
    </div>
    <div>
      <IconsWrapper>
        <TwitterOutlined />

        <FacebookOutlined />

        <InstagramOutlined />
      </IconsWrapper>
    </div>
    <div>
      <IconsWrapper>
        <SearchOutlined />

        <ShoppingCartOutlined />
      </IconsWrapper>
    </div>
  </StyledHeader>
);

export default Layout;