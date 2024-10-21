import { createContext, useContext, useState } from "react";
import { useAuth } from "./AuthContext";

const AdminContext = createContext();

export const AdminCartProvider = ({ children }) => {
  const { user } = useAuth();
  const [productCartData, setProductCartData] = useState([]);

  const addProduct = async (product) => {
    
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `http://localhost:8080/admin/add/${user.id}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(product),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add product");
      }

      await getAllProduct(); // Refresh product data after successful add
    } catch (error) {
      console.error("Error saving Admin cart:", error);
    }
  };

  const editProduct =  (product) => {
    
    try {
       addProduct(product);
    } catch (error) {
      console.error("Error editing product:", error);
    }
  };

  const deleteProduct = async (item) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `http://localhost:8080/admin/delete/${user.id}/${item.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete product");
      }

      // Remove the product from the local state after successful delete
      setProductCartData((currentCartData) =>
        currentCartData.filter((currentItem) => currentItem.id !== item.id)
      );
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const getAllProduct = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`http://localhost:8080/admin/${user?.id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }

      const data = await response.json();
      setProductCartData(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  return (
    <AdminContext.Provider
      value={{ productCartData, addProduct, editProduct, deleteProduct, getAllProduct }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdminContext = () => useContext(AdminContext);
