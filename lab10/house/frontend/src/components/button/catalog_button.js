// catalog_button_style.js
import styled from 'styled-components'; // Ensure this is present
import { Button } from 'antd';
// Create a styled button
export const CenteredButton = styled(Button)`
background: transparent;
    border-radius: 20px;
    color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 50px auto;
  color: black;
 

  // Add any additional styles here
`;
export const HeaderButton = styled(Button)`
background: transparent;
    border-radius: 20px;
    color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  
  color: black;
 

  span {
  font-size: 16px;
  }
`;

export const Homebutton = styled(Button)`
background: transparent;
    border-radius: 20px;
    color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
  `