import React from "react";
import { BiMinus, BiPlus } from "react-icons/bi";
import { FiDelete } from "react-icons/fi";
import { useShoppingCart } from "../utils/ShoopingCartContext";

const CartCard = ({ data, handleScroll }) => {
  const { imageSrc, specsName, description, price } = data.product;
  const { increaseCartQuantity, decreaseCartQuantity, deleteCartItem } =
    useShoppingCart();

  const handleIncrease = () => {
    handleScroll();
    increaseCartQuantity(data)
  }

  const handleDecrease = () => {
    handleScroll();
    decreaseCartQuantity(data)
  }

  return (
    <div className="card rounded-3 mb-4">
      <div className="card-body p-4">
        <div className="row d-flex justify-content-between align-items-center">
          <div className="col-md-2 col-lg-2 col-xl-2">
            <img
              src={imageSrc}
              className="img-fluid rounded-3"
              alt={specsName}
            />
          </div>
          <div className="col-md-3 col-lg-3 col-xl-3">
            <p className="lead fw-normal mb-2">{specsName}</p>
            <p className="text-muted">{description}</p>
          </div>
          <div className="col-md-3 col-lg-3 col-xl-2 d-flex">
            <button
              className="btn btn-link px-2"
              onClick={handleDecrease}
            >
              <BiMinus />
            </button>

            <input
              type="number"
              className="form-control form-control-sm"
              min="0"
              value={data.quantity}
              readOnly
            />

            <button
              className="btn btn-link px-2"
              onClick={handleIncrease}
            >
              <BiPlus />
            </button>
          </div>
          <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
            <h5 className="mb-0">₹{price}</h5>
          </div>
          <div className="col-md-1 col-lg-1 col-xl-1 text-end">
            <button
              onClick={() => deleteCartItem(data)}
              className="btn btn-link"
            >
              <FiDelete className="fs-3" color="red" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartCard;
