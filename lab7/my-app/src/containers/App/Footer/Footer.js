import React from "react";
import { Wrapper, IconsWrapper, VerticalLine, LogoWrapper, StyledText } from "./Footer.styled";
import { TwitterOutlined, InstagramOutlined, LinkedinOutlined, YoutubeOutlined, AliwangwangOutlined } from "@ant-design/icons";

const Footer = () => {
    return (
      <Wrapper>
        <LogoWrapper>
          <AliwangwangOutlined />
          <h1>Home Haven</h1>
        </LogoWrapper>
        <p>
          Discover your dream home <br />
          with a perfect blend of comfort and style, offering a unique aesthetic expression <br />
          in architecture, landscaping, and interior design.
        </p>
        <VerticalLine />
        <IconsWrapper>
          <YoutubeOutlined style={{ color: '#FF0000' }} />
          <TwitterOutlined style={{ color: '#03A9F4' }} />
          <LinkedinOutlined style={{ color: '#007AB9' }} />
          <InstagramOutlined style={{ color: '#3A9F4' }} />
        </IconsWrapper>
        <VerticalLine />
        <StyledText>© Home Haven all rights reserved</StyledText>
      </Wrapper>
    );
  };
  
  export default Footer;
  