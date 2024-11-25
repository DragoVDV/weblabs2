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
    justify-content: space-around;
    width: 100%;
    margin-top: 20px;
    box-sizing: border-box; /* Учитываем отступы при расчете размеров */
    overflow: hidden; /* Убираем скролл */
`;




export const StyledButton = styled(Button)`
    background: transparent;
    border-radius: 20px;
    color: white;
`;




