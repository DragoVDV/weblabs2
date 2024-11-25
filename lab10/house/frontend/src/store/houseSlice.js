import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const removeFromCartBackend = createAsyncThunk(
    "house/removeFromCartBackend",
    async (houseId, { rejectWithValue }) => {
      try {
        const response = await axios.delete(`http://127.0.0.1:8000/api/cart/remove/${houseId}/`);
        return { houseId, message: response.data.message };
      } catch (error) {
        return rejectWithValue(error.response?.data || "Failed to remove house from cart.");
      }
    }
  );

export const fetchCartItems = createAsyncThunk(
  "house/fetchCartItems",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/cart/items/");
      return response.data; // Повертаємо список будинків
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch cart items.");
    }
  }
);

// Thunk для додавання будинку до кошика
export const addToCartBackend = createAsyncThunk(
    "house/addToCartBackend",
    async (houseId, { getState, rejectWithValue }) => {
      try {
        const { house } = getState();
        const isAlreadyInCart = house.cart.some((item) => item.id === houseId);
        if (isAlreadyInCart) {
          return rejectWithValue("House is already in the cart.");
        }
  
        const response = await axios.post(`http://127.0.0.1:8000/api/cart/add/${houseId}/`);
        return response.data; // Повертаємо повні дані будинку
      } catch (error) {
        return rejectWithValue(error.response?.data || "Failed to add house to cart.");
      }
    }
  );
  

const houseSlice = createSlice({
  name: "house",
  initialState: {
    houses: [],
    cart: [],
    status: "idle", // "idle" | "loading" | "succeeded" | "failed"
    message: null,
    error: null,
  },
  reducers: {
    clearMessage(state) {
      state.message = null;
    },
    clearCart(state) {
      state.cart = []; // Очищення кошика
    },
  },
  extraReducers: (builder) => {
    builder
      // Обробка додавання до кошика
      .addCase(addToCartBackend.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addToCartBackend.fulfilled, (state, action) => {
        state.status = "succeeded";
        const addedHouse = action.payload; // Отримуємо повний об'єкт будинку
        state.cart.push(addedHouse); // Додаємо об'єкт будинку до кошика
        state.message = `House successfully added to cart.`; // Використовуємо title з об'єкта
      })
      
      .addCase(addToCartBackend.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Обробка отримання елементів кошика
      .addCase(fetchCartItems.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.cart = action.payload; // Повністю оновлюємо кошик
      })
      .addCase(fetchCartItems.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(removeFromCartBackend.pending, (state) => {
        state.status = "loading";
      })
      .addCase(removeFromCartBackend.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.cart = state.cart.filter((item) => item.id !== action.payload.houseId); 
        state.message = action.payload.message;
      })
      .addCase(removeFromCartBackend.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { clearMessage, clearCart } = houseSlice.actions;
export default houseSlice.reducer;
