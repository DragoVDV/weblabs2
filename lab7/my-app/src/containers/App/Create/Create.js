import React, { useState, useContext } from "react";
import { Form, Input, Button, message, Select } from "antd";
import { useNavigate } from "react-router-dom";
import { DataContext } from '../DataContext'; // Import your DataContext
import "./CreateItem.css";

const { Option } = Select;

const CreateItem = () => {
    const { data, handleCreateItem } = useContext(DataContext); // Use useContext to get data and onCreate
    const navigate = useNavigate();
    const [newItem, setNewItem] = useState({ title: "", text: "", image: "", price: 0, type: "", id: "" });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewItem({ ...newItem, [name]: value });
    };

    const checkForDuplicates = (name) => {
        return data.some((item) => item.title === name);
    };

    const handleSelectChange = (value) => {
        setNewItem((prev) => ({ ...prev, type: value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setNewItem((prev) => ({ ...prev, image: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = () => {
        if (checkForDuplicates(newItem.title)) {
            message.error("An item with this title already exists.");
            return;
        }

        // Find the maximum ID among the current items and increment it by 1
        const maxId = data.reduce((max, item) => (item.id > max ? item.id : max), 0);
        const itemWithId = {
            ...newItem,
            id: maxId + 1,
        };

        handleCreateItem(itemWithId); // Pass the new item to the onCreate function
        message.success("Item created successfully!");

        // Navigate to the new item's page
        navigate(`/view/${itemWithId.id}`);

        // Reset the form
        setNewItem({ title: "", text: "", image: "", price: 0, type: "", id: "" });
    };

    return (
        <div className="create-item-container">
            <Form layout="vertical" onFinish={handleSubmit}>
                <Form.Item label="Title" required>
                    <Input
                        name="title"
                        value={newItem.title}
                        onChange={handleInputChange}
                        required
                    />
                </Form.Item>
                <Form.Item label="Description" required>
                    <Input
                        name="text"
                        value={newItem.text}
                        onChange={handleInputChange}
                        required
                    />
                </Form.Item>
                <Form.Item label="Image" required>
                    <input type="file" accept="image/*" onChange={handleImageChange} required />
                </Form.Item>
                {newItem.image && (
                    <Form.Item label="Image Preview">
                        <img src={newItem.image} alt="Preview" style={{ width: '200px', height: 'auto' }} />
                    </Form.Item>
                )}
                <Form.Item label="Price" required>
                    <Input
                        name="price"
                        type="number"
                        min={0}
                        value={newItem.price}
                        onChange={handleInputChange}
                        required
                    />
                </Form.Item>
                <Form.Item label="Type" required>
                    <Select
                        value={newItem.type}
                        onChange={handleSelectChange}
                        placeholder="Select type"
                        required
                    >
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
