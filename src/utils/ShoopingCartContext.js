import { createContext, useContext, useState } from "react";

import useSpecdata from "./useSpecdata";

export const ShoppingCartContext = createContext({});

export function useShoppingCart() {
  return useContext(ShoppingCartContext);
}

export function ShoppingCartProvider({ children }) {

  const { specsData, isLoading } = useSpecdata();

  const [cartItems, setCartItems] = useState([]);

  
  function getItemQuantity(id) {
    return cartItems.find((item) => item.id === id)?.quantity || 0;
  }

 
  function increaseCartQuantity(id) {
    setCartItems((currItems) => {
      const itemExists = currItems.find((item) => item.id === id);

      if (!itemExists) {
        return [...currItems, { id, quantity: 1 }];
      }

      return currItems.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    });
  }

  
  function decreaseCartQuantity(id) {
    setCartItems((currItems) => {
      const item = currItems.find((item) => item.id === id);
      
      if (item?.quantity === 1) {
        return currItems.filter((item) => item.id !== id);
      }

      return currItems.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
    });
  }

  
  function removeFromCart(id) {
    setCartItems((currItems) => currItems.filter((item) => item.id !== id));
  }

  
  function totalCartQuantity() {
    return cartItems.reduce((quantity, item) => quantity + item.quantity, 0);
  }

  return (
    <ShoppingCartContext.Provider
      value={{
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
        totalCartQuantity,
        cartItems,
        specsData,
        isLoading
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
}
