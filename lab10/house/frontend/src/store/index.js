import { configureStore } from "@reduxjs/toolkit";
import houseReducer from "./houseSlice";

const store = configureStore({
  reducer: {
    house: houseReducer, // Ключ 'house' має збігатися з `useSelector(state => state.house)`
  },
});

export default store;
