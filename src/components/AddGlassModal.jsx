import React, { useRef, useState } from "react";
import { useAdminContext } from "../utils/AdminContext";

function AddGlassModal() {
  const { addProduct } = useAdminContext();

  const modalRef = useRef(null);

 // console.log(modalRef.current);


  const [glassData, setGlassData] = useState({
    specName: "",
    category: "men", // default to men
    imageLink: "",
    price: "",
    description: "",
    quantity: 0,
    type: "",
  });

  const [formErrors, setFormErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setGlassData({
      ...glassData,
      [name]: value,
    });
  };

  const validate = () => {
    const errors = {};

    if (!glassData.specName.trim()) {
      errors.specName = "Glass Name is required";
    }

    if (!glassData.imageLink.trim()) {
      errors.imageLink = "Image Link is required";
    }

    if (!glassData.price) {
      errors.price = "Price is required";
    } else if (glassData.price <= 0) {
      errors.price = "Price must be a positive number";
    }

    if (!glassData.description.trim()) {
      errors.description = "Description is required";
    }

    if (glassData.quantity < 0) {
      errors.quantity = "Quantity cannot be negative";
    }

    if (!glassData.type.trim()) {
      errors.type = "Type is required";
    }

    return errors;
  };

  // console.log(formErrors);

  const handleFormSubmit = (e) => {
    e.preventDefault();
  
    const errors = validate();
    setFormErrors(errors);
  
    // Use 'errors' directly, not 'formErrors' because 'formErrors' is updated asynchronously
    if (Object.keys(errors).length === 0) {
      addProduct(glassData);


      if (modalRef.current) {
        const modalElement = window.bootstrap.Modal.getInstance(modalRef.current);
        modalElement.hide();
      }
  
      setGlassData({
        specName: "",
        category: "men",
        imageLink: "",
        price: "",
        description: "",
        quantity: 0,
        type: "",
      });
  
    }
  };
  
  return (
    <div>
      <div className="d-flex justify-content-between px-3 my-2">
        <h3>Manage Glasses</h3>
        <button
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#addGlassesModal"
        >
          Add Glasses
        </button>
      </div>

      <div
        className="modal fade"
        id="addGlassesModal"
        tabIndex="-1"
        aria-labelledby="addGlassesModalLabel"
        aria-hidden="true"
        ref={modalRef}
        >
        
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addGlassesModalLabel">
                Add New Glasses
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form id="glassesForm">
                <div className="mb-3">
                  <label htmlFor="specName" className="form-label">
                    Glasses Name
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      formErrors.specName ? "is-invalid" : ""
                    }`}
                    id="specName"
                    name="specName"
                    value={glassData.specName}
                    onChange={handleInputChange}
                  />
                  {formErrors.specName && (
                    <div className="invalid-feedback">
                      {formErrors.specName}
                    </div>
                  )}
                </div>

                <div className="mb-3">
                  <label htmlFor="category" className="form-label">
                    Category
                  </label>
                  <select
                    className="form-control"
                    id="category"
                    name="category"
                    value={glassData.category}
                    onChange={handleInputChange}
                  >
                    <option value="men">Men</option>
                    <option value="women">Women</option>
                    <option value="kid">Kid</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label htmlFor="imageLink" className="form-label">
                    Image Link
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      formErrors.imageLink ? "is-invalid" : ""
                    }`}
                    id="imageLink"
                    name="imageLink"
                    value={glassData.imageLink}
                    onChange={handleInputChange}
                  />
                  {formErrors.imageLink && (
                    <div className="invalid-feedback">
                      {formErrors.imageLink}
                    </div>
                  )}
                </div>

                <div className="mb-3">
                  <label htmlFor="price" className="form-label">
                    Price
                  </label>
                  <input
                    type="number"
                    className={`form-control ${
                      formErrors.price ? "is-invalid" : ""
                    }`}
                    id="price"
                    name="price"
                    value={glassData.price}
                    onChange={handleInputChange}
                    min="1"
                  />
                  {formErrors.price && (
                    <div className="invalid-feedback">{formErrors.price}</div>
                  )}
                </div>

                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <textarea
                    className={`form-control ${
                      formErrors.description ? "is-invalid" : ""
                    }`}
                    id="description"
                    name="description"
                    value={glassData.description}
                    onChange={handleInputChange}
                  ></textarea>
                  {formErrors.description && (
                    <div className="invalid-feedback">
                      {formErrors.description}
                    </div>
                  )}
                </div>

                <div className="mb-3">
                  <label htmlFor="quantity" className="form-label">
                    Quantity
                  </label>
                  <input
                    type="number"
                    className={`form-control ${
                      formErrors.quantity ? "is-invalid" : ""
                    }`}
                    id="quantity"
                    name="quantity"
                    value={glassData.quantity}
                    onChange={handleInputChange}
                    min="1"
                  />
                  {formErrors.quantity && (
                    <div className="invalid-feedback">
                      {formErrors.quantity}
                    </div>
                  )}
                </div>

                <div className="mb-3">
                  <label htmlFor="type" className="form-label">
                    Type
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      formErrors.type ? "is-invalid" : ""
                    }`}
                    id="type"
                    name="type"
                    value={glassData.type}
                    onChange={handleInputChange}
                  />
                  {formErrors.type && (
                    <div className="invalid-feedback">{formErrors.type}</div>
                  )}
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                onClick={handleFormSubmit}
              >
                Save Glasses
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddGlassModal;
