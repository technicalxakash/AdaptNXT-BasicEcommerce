

import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ items: [], total: 0 });
  const { token } = useContext(AuthContext);

  const fetchCart = async () => {
    try {
      const res = await axios.get("http://localhost:8080/user/cart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCart(res.data);
      console.log("Cart updated", res.data);
    } catch (error) {
      console.error("Failed to fetch cart", error);
    }
  };

  const updateCartCount = () => {
    fetchCart();
  };

  useEffect(() => {
    if (token && cart.items.length === 0) {
      fetchCart();
    }
  }, [token]);

  return (
    <CartContext.Provider value={{ cart, refreshCart: fetchCart, updateCartCount, cartItemCount: cart.items.length }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);