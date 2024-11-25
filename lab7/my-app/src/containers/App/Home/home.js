import React, { useContext, useState } from "react";
import ModelPicture from "../../../Icons/Bitmap.png";
import { useNavigate } from "react-router-dom";
import { SectionWrapper, StyledText, StyledButton, CardWrapper, ImageWrapper } from "./home_styles";
import CardItem from "../../../components/CardItem/Carditem";
import { CenteredButton } from '../../../components/button/catalog_button_style';
import { Link } from "react-router-dom";
import { DataContext } from "../DataContext"; 

const Home = () => {
  const { data, handleDeleteItem } = useContext(DataContext); 
  const [showAll, setShowAll] = useState(false);
  const navigate = useNavigate();

  
  const displayedItems = showAll ? data : data.slice(0, 3);

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
          <Link to="/catalog" style={{ textDecoration: 'none' }}>
            <StyledButton size="large">Show More</StyledButton>
          </Link>
        </StyledText>
        <ImageWrapper>
          <img src={ModelPicture} alt="A stylish home model" />
        </ImageWrapper>
      </SectionWrapper>
              
      <CardWrapper>
        {displayedItems.map(({ id, title, text, image, price, type }) => (
          <CardItem
            key={id}
            title={title}
            text={text}
            imageSrc={image}
            price={price}
            id={id}
            type={type}
            onDelete={() => handleDeleteItem(id)} // Викликаємо функцію видалення з контексту
            onClick={() => navigate(`/view/${id}`)}
          />
        ))}
      </CardWrapper>

     
      {data.length > 3 && (
        <CenteredButton size="large" onClick={() => setShowAll(!showAll)}>
          {showAll ? "Show Less" : "Show More"}
        </CenteredButton>
      )}

      <Link to="/catalog" style={{ textDecoration: 'none' }}> 
        <CenteredButton size="large">Catalog</CenteredButton>
      </Link>
    </div>
  );
};

export default Home;
  