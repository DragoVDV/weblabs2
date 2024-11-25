import styled from 'styled-components';

// Стилі для Header
export const Header = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 10px;
  text-decoration: none;
`;

// Стилі для контейнера карток
// Стилі для контейнера карток
// Стилі для контейнера карток
export const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr); // Три колонки с равной шириной
  gap: 20px; // Расстояние между карточками
  margin-top: 30px;
  justify-items: center; // Центрирует карточки по горизонтали
`;


export const Catalogfunc = styled.div `
    display: flex;
    justify-content: space-around;
    align-items: center;
    display: flex;
    margin: 40px;
`;