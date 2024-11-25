import React from "react";
import { Card, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { Footer } from "./CardItem_styles";

const { Meta } = Card;

const CardItem = ({ title = 'No title.', text, imageSrc, price, id, type, onDelete, onClick }) => {
  const navigate = useNavigate();

  return (
    <Card
      hoverable
      style={{ width: 350, borderRadius: "20px" }}
      cover={<img style={{ borderRadius: "20px" }} alt="example" src={imageSrc} />}
      onClick={onClick} // Use the onClick prop for navigation
    >
      <Meta title={title} description={text} />
      <Footer>
        <div style={{ display: "flex", justifyContent: 'center', alignItems: "center" }}>
          <div style={{ gap: "20px", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <p>${price}</p>
            <p>Type: {type}</p>
            <div style={{ display: 'flex', gap: '10px' }}>
              <Button 
                onClick={(e) => {
                  e.stopPropagation(); // Prevent navigation when clicking edit
                  navigate(`/edit/${id}`);
                }}
                type="primary"
              >
                Edit
              </Button>
              <Button 
                onClick={(e) => {
                  e.stopPropagation(); // Prevent navigation when clicking delete
                  onDelete(); // Call the delete function
                }} 
                type="danger"
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      </Footer>
    </Card>
  );
};

export default CardItem;
