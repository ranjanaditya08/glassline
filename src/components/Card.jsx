import React, { useState } from "react";
import { FaRupeeSign } from "react-icons/fa";
import { useShoppingCart } from "../utils/ShoopingCartContext";
import Popup from "./Popup";
import { useAuth } from "../utils/AuthContext";
import { useNavigate } from "react-router-dom";

const Card = ({ specData }) => {
  const { imageSrc, specsName, description, price } = specData;
  const { increaseCartQuantity } = useShoppingCart();
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
    <div className="card mb-4" style={{ width: "18rem", height: "100%" }}>
      <img src={imageSrc} className="card-img-top" alt={specsName} style={{ height: "150px", objectFit: "cover" }} />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title mb-2" style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{specsName}</h5>
        <p className="card-text flex-grow-1" style={{ overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box", WebkitBoxOrient: "vertical", WebkitLineClamp: "3" }}>
          {description}
        </p>
        <p className="card-text">
          <FaRupeeSign />
          {price}
        </p>
        <button className="btn btn-primary" onClick={handleAddToCart}>
          Add to cart
        </button>
      </div>
      <Popup message="Item added to cart!" visible={showPopup} onClose={() => setShowPopup(false)} />
    </div>
  );
};

export default Card;
