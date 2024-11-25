import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartItems, removeFromCartBackend, clearMessage } from "../../../store/houseSlice";
import { message } from "antd";
import "./BinCard_styled.css"; // Підключаємо CSS файл

const CartPage = () => {
  const dispatch = useDispatch();
  const { cart, status, error, message: reduxMessage } = useSelector((state) => state.house);

  const [rentalDays, setRentalDays] = useState({}); // Стан для кількості днів оренди

  useEffect(() => {
    dispatch(fetchCartItems());
  }, [dispatch]);

  useEffect(() => {
    if (reduxMessage) {
      message.success(reduxMessage);
      dispatch(clearMessage());
    }
  }, [reduxMessage, dispatch]);

  useEffect(() => {
    if (status === "failed" && error) {
      message.error(error);
    }
  }, [status, error]);

  const handleDaysChange = (id, days) => {
    setRentalDays((prev) => ({
      ...prev,
      [id]: days < 1 ? 1 : days,
    }));
  };

  const handleRemove = (houseId) => {
    dispatch(removeFromCartBackend(houseId));
    setRentalDays((prev) => {
      const updatedDays = { ...prev };
      delete updatedDays[houseId];
      return updatedDays;
    });
  };

  const totalCount = cart.reduce(
    (total, house) => total + house.price * (rentalDays[house.id] || 1),
    0
  );

  return (
    <div className="cart-container">
      <h1 className="cart-header">Your Cart</h1>
      {status === "loading" ? (
        <p className="cart-loading">Loading...</p>
      ) : cart.length > 0 ? (
        <>
          {cart.map((house) => (
            <div key={house.id} className="cart-item">
              <img
                src={`http://127.0.0.1:8000${house.image}`}
                alt={house.title}
                className="cart-item-image"
              />
              <div className="cart-item-details">
                <h3 className="cart-item-title">{house.title}</h3>
                <p className="cart-item-price">Price per day: ${house.price}</p>
                <p className="cart-item-type">Type: {house.type}</p>
                <div className="cart-item-days">
                  <button
                    className="cart-item-button"
                    onClick={() =>
                      handleDaysChange(house.id, (rentalDays[house.id] || 1) - 1)
                    }
                  >
                    -
                  </button>
                  <span className="cart-item-days-count">{rentalDays[house.id] || 1}</span>
                  <button
                    className="cart-item-button"
                    onClick={() =>
                      handleDaysChange(house.id, (rentalDays[house.id] || 1) + 1)
                    }
                  >
                    +
                  </button>
                </div>
                <button
                  className="cart-item-remove"
                  onClick={() => handleRemove(house.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <div className="cart-total">
            <h3>Total Count: ${totalCount.toFixed(2)}</h3>
          </div>
        </>
      ) : (
        <p className="cart-empty">Your cart is empty.</p>
      )}
    </div>
  );
};

export default CartPage;
