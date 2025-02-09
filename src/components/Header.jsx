import React, { useEffect } from "react";
import { FaCartPlus } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useShoppingCart } from "../utils/ShoopingCartContext";
import { useAuth } from "../utils/AuthContext";
import { CiUser } from "react-icons/ci";
import { MdOutlineAdminPanelSettings } from "react-icons/md";

const Header = () => {
  const navigate = useNavigate();
  const { totalCartQuantity, clearCart, getCartItems } = useShoppingCart();
  const { isAuthenticated, login, logout, user, role } = useAuth();

  const handleLoginClick = () => {
    login();
    navigate("/login");
  };

  const handleLogoutClick = () => {
    clearCart();
    logout();
    navigate("/login");
  };

  const handleAdminPage = () => {
    if (isAuthenticated && role === "SELLER") {
      navigate("/admin");
    }
  };

  useEffect(() => {
    user.id && getCartItems();
  }, [user.id, isAuthenticated]);

  return (
    <nav className="navbar navbar-light position-sticky top-0 z-3 bg-body-tertiary shadow-lg">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <Link className="navbar-brand" to="/">
          <img src="/GlassLine_logo.png" alt="logo" id="logo" />
          GlassLine
        </Link>

        <div className="d-flex justify-content-center flex-grow-1">
          <ul className="navbar-nav d-flex flex-row gap-3 custom-font-weight">
            <li className="nav-item">
              <Link
                className="nav-link active text-danger"
                aria-current="page"
                to="/"
              >
                HOME
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/men">
                MEN
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/women">
                WOMEN
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/kids">
                KIDS
              </Link>
            </li>
          </ul>
        </div>

        <div className="d-flex align-items-center position-relative me-3">
          <Link to="/cart">
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
              fontSize: "0.75rem",
            }}
          >
            {totalCartQuantity()}
          </div>
        </div>

        {isAuthenticated ? (
          <>
            <button className="user mx-1 text-center" onClick={handleAdminPage}>
              {user?.firstName}
              {role === "USER" ? (
                <CiUser />
              ) : (
                <MdOutlineAdminPanelSettings color="blue" className="fs-4" />
              )}
            </button>
            <button
              className="btn btn-light bg-body-tertiary border-black"
              onClick={handleLogoutClick}
            >
              Logout
            </button>
          </>
        ) : (
          <button
            className="btn btn-light bg-body-tertiary border-black"
            onClick={handleLoginClick}
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
};

export default Header;
