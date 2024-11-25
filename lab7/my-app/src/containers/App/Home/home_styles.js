import styled from 'styled-components';
import { Button } from 'antd';


export const SectionWrapper = styled.div`
    display: flex;
    background-color: #bdaeac;

    width: 100%;
    justify-content: space-between;
    padding: 0 100px;
    box-sizing: border-box;
    overflow: hidden;
    gap: 20px;
`;

export const StyledText = styled.div`
    
    width: 50%; /* 50% для текста */
    padding-top: 70px;
    color: white;
    font-size: 16px;
    h1 {
        font-size: 40px;
        color: white;
    }
`;

export const ImageWrapper = styled.div`
    
    width: 50%; /* 50% для изображения */
    display: flex;
    justify-content: center;
    padding: 70px 0px;
    
    img {
       
        max-width: 100%; /* Адаптивное изображение */
        
    }
`;

export const CardWrapper = styled.div`
    display: flex;
    justify-content: center;
    width: 80%;
    margin: auto;
    box-sizing: border-box;
    flex-wrap: wrap; /* Дозволяє переносити картки на новий ряд */

    & > div {
        width: 250px; /* Зафіксована ширина картки */
        margin: 20px; /* Відступи між картками */
    }
`;






export const StyledButton = styled(Button)`
    background: transparent;
    border-radius: 20px;
    color: white;
`;




const ScrollableContainer = styled.div`
  display: flex;
 
  overflow-x: auto; // Allow horizontal scrolling
  scroll-behavior: smooth; // Smooth scrolling effect
  width: 100%; // Full width
`;

const ArrowButton = styled(Button)`
  position: absolute;
  z-index: 1; // Ensure buttons are on top
  top: 50%;
  transform: translateY(-50%);
`;

const LeftArrow = styled(ArrowButton)`
  left: 10px; // Position left
`;

const RightArrow = styled(ArrowButton)`
  right: 10px; // Position right
`;