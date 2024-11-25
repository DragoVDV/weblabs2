import React from "react";
import ModelPicture from "../../../Icons/Bitmap.png";
import {
  SectionWrapper,
  StyledText,
  StyledButton,
  CardWrapper,
  ImageWrapper,
} from "./home_styles";
import CardItem from "../../../components/CardItem/Carditem";


const Home = (props) => {
  const data = props.data || [];
  return (
    <div>
      <SectionWrapper>
        <StyledText>
          <h1>Explore Stylish Homes & Designs</h1>
          <p>
            Discover our stunning selection of houses and home designs that
            cater to all styles and preferences. Our curated collection features
            innovative architecture, contemporary aesthetics, and functional
            living spaces that make every house feel like a home. From cozy
            cottages to modern villas, we have something for everyone. Experience
            the perfect blend of comfort and elegance, designed to elevate your
            living experience. Our knowledgeable team is here to assist you in
            finding the ideal home that meets your needs and aspirations.
          </p>
          <StyledButton size="large">Show More</StyledButton>
        </StyledText>
        <ImageWrapper>
         <img src={ModelPicture} alt="A stylish home model" /> {/* Add meaningful alt text */}
        </ImageWrapper>

      </SectionWrapper>
      
      <CardWrapper>
        {data.map(({ title, text, image, price }, idx) => (
          <CardItem
            key={idx}
            title={title}
            text={text}
            imageSrc={image}
            price={price}
            id={idx}
          />
        ))}
      </CardWrapper>
    </div>
  );
};

export default Home;
