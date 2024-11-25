import React, { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Input, Button, message, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { DataContext } from "../App/DataContext"; // Імпорт контексту

const EditContainer = styled.div`
  max-width: 600px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  background-color: #f9f9f9;
`;

const EditItem = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, handleUpdateItem } = useContext(DataContext);

  const itemToEdit = data.find(item => item.id === Number(id));
  const [editedItem, setEditedItem] = React.useState(itemToEdit); // Використовуємо початкове значення з контексту

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedItem({ ...editedItem, [name]: value });
  };

  const handleImageChange = (info) => {
    const file = info.file.originFileObj || info.file;

    if (file instanceof Blob) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditedItem({ ...editedItem, image: reader.result });
      };
      reader.readAsDataURL(file);
    } else {
      console.error("The uploaded file is not a valid Blob or File object.");
    }
  };

  const checkForDuplicates = (name) => {
    return data.some((item, idx) => item.title === name && item.id !== editedItem.id);
  };

  const handleSubmit = () => {
    console.log("updateItem:", handleUpdateItem); // Додайте це для перевірки
    const updatedItem = { ...editedItem, id: itemToEdit.id };
    if (checkForDuplicates(updatedItem.title)) {
      message.error("An item with this title already exists.");
      return;
    }

    handleUpdateItem(updatedItem); 
    message.success("Item updated successfully!");
    navigate("/catalog");
  };

  return (
    <EditContainer>
      <h2>Edit Item</h2>
      <Form layout="vertical" onFinish={handleSubmit}>
        <Form.Item label="Title" required>
          <Input
            name="title"
            value={editedItem.title}
            onChange={handleInputChange}
          />
        </Form.Item>
        <Form.Item label="Description" required>
          <Input
            name="text"
            value={editedItem.text}
            onChange={handleInputChange}
          />
        </Form.Item>
        <Form.Item label="Price" required>
          <Input
            name="price"
            type="number"
            value={editedItem.price}
            min={0}
            onChange={handleInputChange}
          />
        </Form.Item>
        <Form.Item label="Image">
          <Upload
            beforeUpload={() => false}
            onChange={handleImageChange}
            maxCount={1}
          >
            <Button icon={<UploadOutlined />}>Upload Image</Button>
          </Upload>
          {editedItem.image && (
            <img
              src={editedItem.image}
              alt="Preview"
              style={{ marginTop: "10px", maxWidth: "100%" }}
            />
          )}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Save Changes
          </Button>
          <Button
            type="default"
            style={{ marginLeft: "10px" }}
            onClick={() => navigate("/catalog")}
          >
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </EditContainer>
  );
};

export default EditItem;
