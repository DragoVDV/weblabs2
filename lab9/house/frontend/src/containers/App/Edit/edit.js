import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Input, Button, message, Select, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import styled from "styled-components";
import Cookies from "js-cookie";
import useByid from "../../../hooks/useById";

const { Option } = Select;

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
  const csrfToken = Cookies.get("csrftoken");

  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]); // Стан для зображень



  useByid(form)

  const handleSubmit = async (values) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("price", values.price);
    formData.append("type", values.type);

    // Додаємо файл зображення лише якщо він є
    if (fileList.length > 0) {
        formData.append("image", fileList[0].originFileObj);
    }

    try {
        await axios.put(`http://127.0.0.1:8000/api/${id}/update/`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                "X-CSRFToken": csrfToken
            }
        });
        message.success("Item updated successfully!");
        navigate("/catalog");
    } catch (error) {
        if (error.response && error.response.data) {
            const errors = error.response.data;
            for (let key in errors) {
                if (errors.hasOwnProperty(key)) {
                    // Перевіряємо, чи є errors[key] масивом
                    const errorMessage = Array.isArray(errors[key])
                        ? errors[key].join(", ")
                        : errors[key];
                    message.error(`${key}: ${errorMessage}`);
                }
            }
        } else {
            // Загальна помилка, якщо немає специфічних помилок валідації
            message.error(`Failed to update item: ${error.message}`);
        }
    }
};

  // Обробник зміни файлів
  const handleFileChange = ({ fileList }) => {
    setFileList(fileList);
  };

  return (
    <EditContainer>
      <h2>Edit Item</h2>
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: 'Please enter a title!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: 'Please enter a description!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Price"
          name="price"
          rules={[{ required: true, message: 'Please enter a price!' }]}
        >
          <Input type="number" min={0} />
        </Form.Item>
        <Form.Item
          label="Type"
          name="type"
          rules={[{ required: true, message: 'Please select a type!' }]}
        >
          <Select placeholder="Select type">
            <Option value="Cottage">Cottage</Option>
            <Option value="Family House">Family House</Option>
            <Option value="Villa">Villa</Option>
          </Select>
        </Form.Item>
        <Form.Item label="Image" name="image">
          <Upload
            beforeUpload={() => false}
            fileList={fileList} // Встановлюємо стан для fileList
            onChange={handleFileChange} // Використовуємо обробник зміни файлів
            maxCount={1}
            listType="picture"
          >
            <Button icon={<UploadOutlined />}>Upload Image</Button>
          </Upload>
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
