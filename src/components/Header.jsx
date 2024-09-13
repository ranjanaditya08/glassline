import React from "react";
import { FaCartPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useShoppingCart } from "../utils/ShoopingCartContext";


const Header = () => {

  const {totalCartQuantity} = useShoppingCart();
  //console.log(totalCartQuantity);

  return (
    <nav className="navbar navbar-light position-sticky top-0 z-3 bg-body-tertiary shadow-lg">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <Link className="navbar-brand" to={`/`}>
          <img src={"/GlassLine_logo.png"} alt="logo" id="logo" />
          GlassLine
        </Link>

        <div className="d-flex justify-content-center flex-grow-1">
          <ul className="navbar-nav d-flex flex-row  gap-3 custom-font-weight">
            <li className="nav-item">
              <Link
                className="nav-link active text-danger"
                aria-current="page"
                to={`/`}
              >
                HOME
              </Link>
            </li>
            <li className="nav-item ">
              <Link className="nav-link" to={`/men`}>
                MEN
              </Link>
            </li>
            <li className="nav-item font-weight-bolder">
              <Link className="nav-link" to={`/women`}>
                WOMEN
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={`/kids`}>
                KIDS
              </Link>
            </li>
          </ul>
        </div>

        <div className="d-flex align-items-center position-relative me-3">
          <div className="">
            <Link to={`/cart`}>
              <FaCartPlus className="fs-3" />
            </Link>
            <div
              className="rounded-circle bg-danger d-flex justify-content-center align-items-center position-absolute"
              style={{
                color: "white",
                width: "1rem",
                height: "1rem",
                bottom: 0,
                right: 0,
                transform: "translate(25%, 25%)",
                fontSize: "0.75rem", // Adjusts font size to fit within the badge
              }}
            >
              {totalCartQuantity()}
            </div>
          </div>
        </div>

        <button className="btn btn-light bg-body-tertiary border-black">
          Login
        </button>
      </div>
    </nav>
  );
};

export default Header;
