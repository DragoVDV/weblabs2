import axios from 'axios';

export const getPosts = async () => {
  try {
    const res = await axios.get('http://127.0.0.1:8000/api/');  // Замість /api/ потрібно вказати правильний шлях до API
    return res.data;  // Повертаємо дані з відповіді
  } catch (err) {
    console.error(err);
    throw err;  // Викидаємо помилку
  }
};

    
    
  
  