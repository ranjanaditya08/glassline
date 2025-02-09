import CartCard from "./CartCard";
import { useShoppingCart } from "../utils/ShoopingCartContext";
import CartShimmer from "./CartShimmer";
import { useEffect, useRef } from "react";
import { useAuth } from "../utils/AuthContext";

const Cart = () => {
  const { user, isAuthenticated } = useAuth();
  const {
    userCartData,
    isLoading,
    totalCartQuantity,
    getCartItems,
    totalCartValue,
  } = useShoppingCart();

  const scrollPosition = useRef(0);

  useEffect(() => {
    user.id && getCartItems();
  }, [user.id, isAuthenticated]);

  const handleScroll = () => {
    scrollPosition.current = window.scrollY;
  };

  useEffect(() => {
    if (!isLoading) {
      window.scrollTo(0, scrollPosition.current);
    }
  },[isLoading]);

  const quantity = totalCartQuantity();

  return userCartData.length === 0 && quantity === 0 ? (
    <CartShimmer />
  ) : (
    <section className="h-100">
      <div className="container h-100 py-5">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-10">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h3 className="fw-normal mb-0">Shopping Cart</h3>
            </div>

            {!isLoading &&
              userCartData.map((item, idx) => (
                <CartCard
                  data={item}
                  key={`${item?.product.id}${idx}`}
                  handleScroll={handleScroll}
                />
              ))}

            <div className="card">
              <div className="card-body">
                <p className="mb-0 me-5 d-flex align-items-center float-end">
                  <span className="small text-muted me-2">Order total:</span>
                  <span className="lead fw-normal">₹{totalCartValue()}</span>
                </p>
              </div>
            </div>

            <div className="card">
              <div className="card-body">
                <button
                  type="button"
                  data-mdb-button-init
                  data-mdb-ripple-init
                  className="btn btn-warning btn-block btn-lg"
                >
                  Proceed to Pay
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;
