import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { useAdminContext } from "../utils/AdminContext";
import { useAuth } from "../utils/AuthContext";
import AddProduct from "./AddProduct";

const AdminPage = () => {
  const { user } = useAuth();
  const { productCartData, getAllProduct } = useAdminContext();
  //console.log(productCartData);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    if (user && user.id) {
      getAllProduct();
    }
  }, [user]);

  return (
    <div>
      <AddProduct
        showModal={showModal}
        setShowModal={setShowModal}
        selectedProduct={selectedProduct}
      />
  
      <div className="product-list">
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3 mt-2">
          {productCartData.length !== 0 &&
            productCartData.map((specData, idx) => (
              <div className="col" key={`${specData?.id}${idx}`}>
                <ProductCard
                  product={specData}
                  showModal={showModal}
                  setShowModal={setShowModal}
                  setSelectedProduct={setSelectedProduct}
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
