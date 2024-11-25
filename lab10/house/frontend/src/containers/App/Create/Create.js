import React from "react";
import { Form, Input, Button, message, Select, Upload } from "antd";
import { useNavigate } from "react-router-dom";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import Cookies from "js-cookie";
import "./Create_style.css";

const { Option } = Select;

const CreateItem = () => {
    const navigate = useNavigate();
    const csrfToken = Cookies.get("csrftoken");

    const handleSubmit = async (values) => {
        const formData = new FormData();
        formData.append("title", values.title);
        formData.append("description", values.text); // Оновлено з "text" на "description"
        formData.append("image", values.image[0].originFileObj);
        formData.append("price", values.price);
        formData.append("type", values.type);

        // Перевірка вмісту formData
        for (let [key, value] of formData.entries()) {
            console.log(`${key}:`, value);
        }

        try {
            await axios.post("http://127.0.0.1:8000/api/create/", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "X-CSRFToken": csrfToken
                }
            });
            message.success("Item created successfully!");
            navigate("/");
        } catch (error) {
            if (error.response) {
                console.error("Response data:", error.response.data);
            } else {
                console.error("Error:", error.message);
            }
            message.error(`Failed to create item: ${error.response?.data?.detail || error.message}`);
        }
    };

    return (
        <div className="create-item-container">
            <Form layout="vertical" onFinish={handleSubmit}>
                <Form.Item label="Title" name="title" rules={[{ required: true, message: 'Please enter a title!' }]}>
                    <Input />
                </Form.Item>
                <Form.Item label="Description" name="text" rules={[{ required: true, message: 'Please enter a description!' }]}>
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Image"
                    name="image"
                    valuePropName="fileList"
                    getValueFromEvent={(e) => e && e.fileList}
                    rules={[{ required: true, message: 'Please upload an image!' }]}
                >
                    <Upload beforeUpload={() => false} listType="picture">
                        <Button icon={<UploadOutlined />}>Upload Image</Button>
                    </Upload>
                </Form.Item>
                <Form.Item label="Price" name="price" rules={[{ required: true, message: 'Please enter a price!' }]}>
                    <Input type="number" min={0} />
                </Form.Item>
                <Form.Item label="Type" name="type" rules={[{ required: true, message: 'Please select a type!' }]}>
                    <Select placeholder="Select type">
                        <Option value="Cottage">Cottage</Option>
                        <Option value="Family House">Family House</Option>
                        <Option value="Villa">Villa</Option>
                    </Select>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">Create Item</Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default CreateItem;
