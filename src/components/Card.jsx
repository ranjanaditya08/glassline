import React, { useState } from "react";
import { FaRupeeSign } from "react-icons/fa";
import { useShoppingCart } from "../utils/ShoopingCartContext";
import Popup from "./Popup";
import { useAuth } from "../utils/AuthContext";
import { useNavigate } from "react-router-dom";

const Card = ({ specData }) => {
  const { imageSrc, specsName, description, price } = specData;
  const { increaseCartQuantity, isLoading } = useShoppingCart();
  const [showPopup, setShowPopup] = useState(false);
  const { isAuthenticated } = useAuth();

  const navigate = useNavigate();

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      navigate("/login");
    } else {
      increaseCartQuantity({
        product: specData,
        quantity: 1,
      });
      setShowPopup(true);
    }
  };

  return (
    <div>
      <div className="card" style={{ width: "18rem" }}>
        <img src={imageSrc} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{specsName}</h5>
          <p className="card-text">{description}</p>
          <p className="card-text">
            <FaRupeeSign />
            {price}
          </p>
          <button
            className="btn btn-primary"
            onClick={handleAddToCart}
            
          >
            Add to cart
          </button>
          <Popup
            message="Item added to cart!"
            visible={showPopup}
            onClose={() => setShowPopup(false)} // Hide the popup after timeout
          />
        </div>
      </div>
    </div>
  );
};

export default Card;
