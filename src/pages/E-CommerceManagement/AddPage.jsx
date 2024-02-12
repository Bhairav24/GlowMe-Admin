import React, { useEffect, useState } from 'react';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://ec2-13-233-152-110.ap-south-1.compute.amazonaws.com:5000',
});

const AddPage = ({ onClose, onCreateProduct }) => {
  const [catogory, setCatogory] = useState([]);

  useEffect(() => {
    const fetchCatogory = async () => {
      try {
        const response = await axios.get('http://ec2-13-233-152-110.ap-south-1.compute.amazonaws.com:5000/product/getCatogory/?type=mallProduct');
        setCatogory(response.data.payload);
      } catch (error) {
        console.error('Error fetching category:', error.message);
      }
    };

    fetchCatogory();
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    selling_price: '',
    MRP: '',
    quantity: '',
    description: '',
    images: null,
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === 'file') {
      const selectedFiles = files.length > 1 ? files : files[0];

      setFormData((prevData) => ({
        ...prevData,
        [name]: selectedFiles,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.selling_price || !formData.MRP || !formData.quantity) {
      console.error('Please fill in all required fields.');
      return;
    }

    try {
      const formDataWithImage = new FormData();
      formDataWithImage.append('name', formData.name);
      formDataWithImage.append('selling_price', formData.selling_price);
      formDataWithImage.append('MRP', formData.MRP);
      formDataWithImage.append('quantity', formData.quantity);

      if (formData.description) {
        formDataWithImage.append('description', formData.description);
      }

      if (formData.images) {
        formDataWithImage.append('images', formData.images);
      }

      const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1N2M2NGRjMGU3MWYxYzVmNGUwM2RiMSIsImVtYWlsIjoid2FzZWVtQGdtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcwNjM3ODM5NX0.2uCe46R5KPij2NHIeSz__sveq6FBv_r0mKP7ogJ8xHc';

      const response = await api.post('/product/createproducts', formDataWithImage, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        const data = response.data;
        console.log('Product created successfully:', data);

        onCreateProduct(data);

        onClose();
      } else {
        console.error('Failed to create product');
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Axios error:', error);
      } else {
        console.error('Error creating product:', error);
      }

      if (error.response) {
        console.error('Server response:', error.response.data);
      }
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white p-8 max-w-md w-full rounded-md shadow-md">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold mb-4">Add New Product</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="border rounded-md w-full py-2 px-3 focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
              Category
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="border rounded-md w-full py-2 px-3 focus:outline-none focus:border-blue-500"
              required
            >
              <option value="">Select Category</option>
              {catogory && catogory.map((catogoryItem) => (
                <option key={catogoryItem._id} value={catogoryItem._id}>
                  {catogoryItem.categoryName}
                </option>
              ))}
            </select>
          </div>
          {/* Other form fields (similar structure) */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="selling_price">
              Selling Price
            </label>
            <input
              type="text"
              id="selling_price"
              name="selling_price"
              value={formData.selling_price}
              onChange={handleChange}
              className="border rounded-md w-full py-2 px-3 focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="MRP">
              MRP
            </label>
            <input
              type="text"
              id="MRP"
              name="MRP"
              value={formData.MRP}
              onChange={handleChange}
              className="border rounded-md w-full py-2 px-3 focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="quantity">
              Quantity
            </label>
            <input
              type="text"
              id="quantity"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              className="border rounded-md w-full py-2 px-3 focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="border rounded-md w-full py-2 px-3 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="images">
              Images
            </label>
            <input
              type="file"
              id="images"
              name="images"
              accept="image/*"
              onChange={handleChange}
              className="border rounded-md w-full py-2 px-3 focus:outline-none focus:border-blue-500"
              multiple
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue"
          >
            Create Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPage;
