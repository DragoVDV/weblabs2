import React from "react";
import { Card, Button } from "antd";
import { useNavigate } from "react-router-dom";

const { Meta } = Card;

const CardItem = ({ title, text, imageSrc, price, type, id, onDelete, onAddToCart }) => {
  const navigate = useNavigate();

  return (
    <Card
      hoverable
      style={{
        width: 350,
        borderRadius: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      }}
      cover={<img style={{ borderRadius: "20px 20px 0 0", width: "100%" }} alt="example" src={imageSrc} />}
      onClick={() => navigate(`/view/${id}`)}
    >
      <Meta title={<h3>{title}</h3>} description={<p>{text}</p>} />
      <div style={{ marginTop: "15px", textAlign: "center" }}>
        <p>
          <strong>Price:</strong> ${price}
        </p>
        <p>
          <strong>Type:</strong> {type}
        </p>
      </div>
      <div
        style={{ display: "flex", justifyContent: "center", gap: "10px", marginTop: "15px" }}
      >
        <Button
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/edit/${id}`);
          }}
          type="primary"
        >
          Edit
        </Button>
        <Button
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          danger
        >
          Delete
        </Button>
      </div>
      <Button
        style={{ marginTop: "15px" }}
        onClick={(e) => {
          e.stopPropagation();
          onAddToCart();
        }}
      >
        Add to cart
      </Button>
    </Card>
  );
};

export default CardItem;
