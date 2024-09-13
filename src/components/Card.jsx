import React from "react";
import { FaRupeeSign } from "react-icons/fa";
import { useShoppingCart } from "../utils/ShoopingCartContext";

const Card = ({ specData }) => {
  const { id, imageSrc, specsName, description, price } = specData;
  const { increaseCartQuantity } = useShoppingCart();

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
            onClick={() => increaseCartQuantity(id)}
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
