  import React, { useState, useEffect } from 'react';

  import { useNavigate } from 'react-router-dom';
  import axios from 'axios';
  import CardItem from '../../../components/ItemCard/itemCard';
  
  import { CardsContainer } from '../Catalog/catalog_styles'
  import { CenteredButton } from '../../../components/button/catalog_button';
  import { Homebutton } from '../../../components/button/catalog_button';
  import { SectionWrapper, StyledText, ImageWrapper } from './home_styles';
  import model from '../../../../../frontend/src/icons/Bitmap.png'



  const Home = () => {
    const [houses, setHouses] = useState([]);
    const [showAll, setShowAll] = useState(false);
    const navigate = useNavigate();

   
console.log(CardItem); // Should not be undefined

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get("http://127.0.0.1:8000/api/", {
            params: {
              showMore: showAll,  
            }
          });
          setHouses(response.data);
        } catch (error) {
          console.error("Error loading houses: ", error);
        }
      };

      fetchData();
    }, [showAll]);  // Викликаємо fetchData щоразу при зміні showAll

    return (
      <div>
        <SectionWrapper>
          <StyledText>
            <h1>Explore Stylish Homes & Designs</h1>
            <p>
            Discover our stunning selection of houses and home designs that cater to all styles and preferences,
             from modern minimalism to classic elegance. Whether you're looking for a cozy apartment or a luxurious villa, 
             we have something to match your vision. Explore our wide range of architectural styles, 
            premium finishes, and thoughtful layouts that ensure comfort and sophistication in every home
            </p>
            <Homebutton size="large" onClick={() => navigate('/catalog')}>
                Catalog
            </Homebutton>
          </StyledText>
          <ImageWrapper>
            <img src={model} alt="A stylish home model" />
          </ImageWrapper>
        </SectionWrapper>
        
        <CardsContainer>
          {houses.length > 0 ? (
            houses.map((house) => (
              <CardItem
                key={house.id}
                title={house.title}
                text={house.description}
                imageSrc={`http://127.0.0.1:8000${house.image}`}
                price={house.price}
                id={house.id}
                type={house.type}
                onDelete={() => console.log("Delete action for", house.id)}
                onClick={() => console.log("Card clicked", house.id)}
              />
            ))
          ) : (
            <p>No houses found.</p>
          )}
        </CardsContainer>

        {/* Кнопка "Show More" тепер під картками */}
        <div style={{ textAlign: 'center', marginTop: '20px', color: "black" }}>
          <CenteredButton size="large" onClick={() => setShowAll(prev => !prev)} style={{ color: 'black' }}>
            {showAll ? "Show Less" : "Show More"}
          </CenteredButton>
        </div>
      </div>
    );
  };

  export default Home;
