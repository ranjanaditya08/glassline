import React from "react";
import { FaRegEdit, FaRupeeSign } from "react-icons/fa";
import { FiDelete } from "react-icons/fi";
import { useAdminContext } from "../utils/AdminContext";

const ProductCard = ({ product, setShowModal, setSelectedProduct }) => {
  const { deleteProduct } = useAdminContext();
  const { id, imageLink, specName, description, price, quantity } = product;

  const onEditProductClick=()=>{
    setSelectedProduct(product); 
    setShowModal(true);
  }

  return (
    <div className="card p-2" style={{ width: "16rem", height: "fit-content" }}>
      <div className="card-img-container">
        <img
          src={imageLink || "https://via.placeholder.com/150"}
          className="card-img-top"
          alt={specName || "Product Image"}
          style={{ height: "150px", objectFit: "cover" }}
        />
      </div>
      <div className="card-body p-2">
        <h5 className="card-title">{specName}</h5>
        <p className="card-text " style={{ fontSize: "0.9rem" }}>
          {description}
        </p>
        <p className="card-text">
          <FaRupeeSign /> {price}
        </p>
        <div className="d-flex justify-content-between align-items-center">
          <span className="badge bg-primary">Available: {quantity}</span>
        </div>
        <div className="d-flex justify-content-between my-2">
          <button
            className="btn btn-warning btn-sm"
            onClick={() => onEditProductClick()}
          >
            <FaRegEdit />
          </button>
          <button
            className="btn btn-danger btn-sm"
            onClick={() => deleteProduct(product)}
          >
            <FiDelete />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
