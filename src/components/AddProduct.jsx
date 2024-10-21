import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useAdminContext } from "../utils/AdminContext";

function AddProduct({showModal, setShowModal, selectedProduct}) {
  const { addProduct , editProduct} = useAdminContext();
  
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

 // console.log(glassData);
  

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

  useEffect(() => {
    if (selectedProduct) {
      setGlassData({
        id:selectedProduct.id,
        specName: selectedProduct.specName,
        category: selectedProduct.category,
        imageLink: selectedProduct.imageLink,
        price: selectedProduct.price,
        description: selectedProduct.description,
        quantity: selectedProduct.quantity,
        type: selectedProduct.type,
      });
    }
  }, [selectedProduct]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    
    const errors = validate();
    setFormErrors(errors);
    
    if (Object.keys(errors).length === 0) {
      if (selectedProduct) {
        editProduct(glassData)
      } else {
        addProduct(glassData);
      }
  
      handleClose();
      resetForm(); 
    }
  };

  const handleClose = () => {
    setShowModal(false);
    resetForm();
  };

  const handleShow = () => {
    setShowModal(true);
  };

  const resetForm = () => {
    setGlassData({
      specName: "",
      category: "men",
      imageLink: "",
      price: "",
      description: "",
      quantity: 0,
      type: "",
    });
    setFormErrors({});
  };

  return (
    <div>
      <div className="d-flex justify-content-between px-3 my-2">
        <h3>Manage Glasses</h3>
        <Button variant="primary" onClick={handleShow}>
          Add Glasses
        </Button>
      </div>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Glasses</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form id="glassesForm" onSubmit={handleFormSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Glasses Name</Form.Label>
              <Form.Control
                type="text"
                name="specName"
                value={glassData.specName}
                onChange={handleInputChange}
                isInvalid={!!formErrors.specName}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.specName}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Select
                name="category"
                value={glassData.category}
                onChange={handleInputChange}
              >
                <option value="men">Men</option>
                <option value="women">Women</option>
                <option value="kid">Kid</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Image Link</Form.Label>
              <Form.Control
                type="text"
                name="imageLink"
                value={glassData.imageLink}
                onChange={handleInputChange}
                isInvalid={!!formErrors.imageLink}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.imageLink}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={glassData.price}
                onChange={handleInputChange}
                min="1"
                isInvalid={!!formErrors.price}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.price}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                value={glassData.description}
                onChange={handleInputChange}
                isInvalid={!!formErrors.description}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.description}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="number"
                name="quantity"
                value={glassData.quantity}
                onChange={handleInputChange}
                min="0"
                isInvalid={!!formErrors.quantity}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.quantity}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Type</Form.Label>
              <Form.Control
                type="text"
                name="type"
                value={glassData.type}
                onChange={handleInputChange}
                isInvalid={!!formErrors.type}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.type}
              </Form.Control.Feedback>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleFormSubmit}>
            Save Glasses
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default AddProduct;
