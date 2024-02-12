import React, { useState } from 'react';
import axios from 'axios';
import './ProductDetailsModal.css'; // Import the CSS file for additional styling

const ProductDetailsModal = ({ product, onClose, onDelete, onUpdate }) => {
  const [updatedProduct, setUpdatedProduct] = useState({
    ...product,
    name: product.name || '',
    quantity: product.quantity || 0,
    images: product.images || [],
  });

  // ... (existing code)

const handleUpdate = async () => {
  try {
    const url = `http://ec2-13-233-152-110.ap-south-1.compute.amazonaws.com:5000/product/updateproductByid/${product._id}`;

    // Your Bearer token goes here
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1N2M2NGRjMGU3MWYxYzVmNGUwM2RiMSIsImVtYWlsIjoid2FzZWVtQGdtYWlsLmNvbSIsImlhdCI6MTcwMzc4ODI3MX0.1JTIgP6eDuhocVxwtGnviszdPwFNHzRgz2p9nSOoy-A';

    const response = await axios.put(url, updatedProduct, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    // console.log('Block 1');

    if (response.status === 200) {
      // If the update is successful, trigger the onUpdate callback
      onUpdate(updatedProduct);
      // Close the modal
      onClose();
    } else {
      console.error('Failed to update product:', response.statusText);
      // Handle the error accordingly (e.g., show an error message to the user)
    }
  } catch (error) {
    console.error('Error updating product:', error);
  }
};

// ... (existing code)


  const handleDelete = async () => {
    try {
      const url = `http://ec2-13-233-152-110.ap-south-1.compute.amazonaws.com:5000/product/deleteproductByid/${product._id}`;

      // Your Bearer token goes here
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1N2M2NGRjMGU3MWYxYzVmNGUwM2RiMSIsImVtYWlsIjoid2FzZWVtQGdtYWlsLmNvbSIsImlhdCI6MTcwMzcxMDEwNn0.xO46SiJ82Ds1DoDxjls7JCy9a1sahuc3CseAm41ySss';

      const response = await axios.delete(url, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      // console.log(response.status);

      if (response.status === 200) {
        // If the deletion is successful, trigger the onDelete callback
        onDelete(product._id);
        // Close the modal
        onClose();
      } else {
        console.error('Failed to delete product:', response.statusText);
        // Handle the error accordingly (e.g., show an error message to the user)
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  // ... (other functions)

  const handleChange = (e) => {
    const { name, value, type } = e.target;
  
    if (type === 'file') {
      const files = e.target.files;
      const fileArray = Array.from(files);
  
      // Create an array of file objects with additional URL properties
      const updatedFiles = fileArray.map((file) => ({
        file,
        url: URL.createObjectURL(file),
      }));
  
      setUpdatedProduct((prevProduct) => ({
        ...prevProduct,
        [name]: updatedFiles,
      }));
    } else {
      setUpdatedProduct((prevProduct) => ({
        ...prevProduct,
        [name]: type === 'number' ? parseFloat(value) : value,
      }));
    }
  };
  
  

  // Calculate discount based on selling price and MRP
  const calculateDiscount = () => {
    const { selling_price, MRP } = updatedProduct;
    if (MRP > 0) {
      return ((MRP - selling_price) / MRP) * 100;
    }
    return 0;
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h3 className="modal-title">{product.name} Details</h3>
        </div>
        <div className="modal-body">
          <p>
            Name:
            <br />
            <input
              type="text"
              name="name"
              value={updatedProduct.name}
              onChange={handleChange}
              className="modal-input"
            />
          </p>
          <p>
            MRP: ₹
            <input
              type="number"
              name="MRP"
              value={updatedProduct.MRP}
              onChange={handleChange}
              className="modal-input"
            />
          </p>
          <p>
            Selling Price: ₹
            <input
              type="number"
              name="selling_price"
              value={updatedProduct.selling_price}
              onChange={handleChange}
              className="modal-input"
            />
          </p>
          <p>
            Quantity:
            <br />
            <input
              type="number"
              name="quantity"
              value={updatedProduct.quantity}
              onChange={handleChange}
              className="modal-input"
            />
          </p>
          <p>
            Description:
            <br />
            <textarea
              name="description"
              value={updatedProduct.description}
              onChange={handleChange}
              className="modal-input"
              rows="6"
              cols="60"
            />
          </p>
          <p>
            Images:
            <br />
            <input
              type="file"
              name="images"
              onChange={handleChange}
              className="modal-input"
              multiple  // Allow multiple file selection
            />
          </p>
          <p>
            Discount: {calculateDiscount().toFixed(2)}%
          </p>
          {/* ... (other fields) */}
        </div>
        <div className="modal-footer">
          <button onClick={handleDelete} className="delete-button">
            Delete
          </button>
          <button onClick={handleUpdate} className="update-button">
            Update
          </button>
          <button onClick={onClose} className="close-button">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsModal;
