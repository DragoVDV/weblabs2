import React from "react";
import { Card, Button, Modal, message } from "antd";
import { useNavigate } from "react-router-dom";

const { Meta } = Card;

const CardItem = ({ title = 'No title.', text, imageSrc, price, type, id, onDelete, onClick }) => {
  const navigate = useNavigate();


  const handleClick = () => {
    navigate(`/view/${id}`);
  };


  const handleDelete = () => {
    Modal.confirm({
      title: "Are you sure you want to delete this item?",
      content: "This action cannot be undone.",
      okText: "Yes, delete it",
      okType: "danger",
      cancelText: "Cancel",
      onOk: onDelete, // Викликаємо onDelete для видалення в батьківському компоненті
    });
  };  

  return (
    <Card
      hoverable
      style={{
        width: 350,
        borderRadius: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center"
      }}
      cover={
        <img
          style={{ borderRadius: "20px 20px 0 0", width: "100%" }}
          alt="example"
          src={imageSrc}
        />
      }
      onClick={handleClick}
    >
      <Meta title={<h3>{title}</h3>} description={<p>{text}</p>} />

      <div style={{ marginTop: "15px", textAlign: "center" }}>
        <p><strong>Price:</strong> ${price}</p>
        <p><strong>Type:</strong> {type}</p>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '15px' }}>
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
            handleDelete(); // Викликаємо handleDelete для підтвердження видалення
          }}
          danger
        >
          Delete
        </Button>
      </div>
    </Card>
  );
};

export default CardItem;
