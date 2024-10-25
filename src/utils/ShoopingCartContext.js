import { createContext, useContext, useState } from "react";
import { useAuth } from "../utils/AuthContext";

export const ShoppingCartContext = createContext({});

export function useShoppingCart() {
  return useContext(ShoppingCartContext);
}

export function ShoppingCartProvider({ children }) {
  const { isAuthenticated, user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [userCartData, setUserCartData] = useState([]);

  console.log("User Cart Data:", userCartData);

  const getCartItems = async () => {
    const token = localStorage.getItem("token");
    //console.log(user);
    try {
      setIsLoading(true);
      const response = await fetch(
        `http://localhost:8080/cart/get/${user.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const userCart = await response.json();
        setUserCartData(userCart);
      } else {
        console.error("Failed to fetch user-specific cart.");
      }
    } catch (error) {
      console.error("Error fetching user cart:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateCartItem = async (productId, quantity) => {
    const token = localStorage.getItem("token");
    if (isAuthenticated) {
      try {
        await fetch(`http://localhost:8080/cart/add`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: user.id,
            productId,
            quantity,
          }),
        });
        getCartItems();
      } catch (error) {
        console.error("Error saving user cart:", error);
      }
    }
  };

  function getItemQuantity(id) {
    return userCartData.find((item) => item.product.id === id)?.quantity || 0;
  }

  function increaseCartQuantity(item) {
    const itemExists = userCartData.find(
      (cartItem) => cartItem.product.id === item.product.id
    );
    let quantity;
    if (itemExists) {
      quantity = itemExists.quantity + 1;
      setUserCartData((currentUserCartData) =>
        currentUserCartData.map((cartItem) =>
          cartItem.product.id === item.product.id
            ? { ...cartItem, quantity: quantity }
            : cartItem
        )
      );
    } else {
      quantity = 1;
      setUserCartData((currentUserCartData) => {
        return [...currentUserCartData, { ...item, quantity }];
      });
    }
    updateCartItem(item.product.id, quantity);
  }

  function decreaseCartQuantity(item) {
    let quantity;
    if (item.quantity === 1) {
      deleteCartItem(item);
    } else {
      quantity = item.quantity - 1;
      setUserCartData((currentUserCartData) => {
        return currentUserCartData.map((cartItem) =>
          cartItem.product.id === item.product.id
            ? { ...cartItem, quantity: quantity }
            : cartItem
        );
      });
      updateCartItem(item.product.id, quantity);
    }
  }

  function deleteCartItem(item) {
    setUserCartData((currentCardData) => {
      return currentCardData.filter(
        (currentItem) => currentItem.product.id !== item.product.id
      );
    });
    removeCartItem(item);
  }

  const removeCartItem = async (item) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `http://localhost:8080/cart/delete/${user.id}/${item.product.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        console.log(item.product.id, "DELETED");
      } else {
        console.error("Failed to delete cart item.");
      }
    } catch (error) {
      console.error("Error deleting cart item:", error);
    }
  };

  function totalCartQuantity() {
    return userCartData.reduce((quantity, item) => quantity + item.quantity, 0);
  }

  function clearCart() {
    setUserCartData([]);
  }

  function totalCartValue() {
    return userCartData.reduce(
      (acc, item) => acc + parseInt(item.product.price) * item.quantity,
      0
    );
  }

  return (
    <ShoppingCartContext.Provider
      value={{
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        deleteCartItem,
        totalCartQuantity,
        clearCart,
        getCartItems,
        totalCartValue,
        userCartData,
        isLoading,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
}
