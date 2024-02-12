import React, { useState, useEffect, useCallback } from 'react';
import Sidebar from '../../partials/Sidebar';
import Header from '../../partials/Header';

const CategeoryManagement = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [productCategories, setProductCategories] = useState([]);
  const [formData, setFormData] = useState({
    categoryName: '',
    url: null,
  });

  const fetchData = useCallback(async () => {
    try {
      // Replace 'YOUR_BEARER_TOKEN' with the actual bearer token
      const bearerToken = 'YOUR_BEARER_TOKEN';

      const response = await fetch(
        'http://ec2-13-233-152-110.ap-south-1.compute.amazonaws.com:5000/product/getcatogory/?type=mallProduct',
        {
          headers: {
            Authorization: `Bearer ${bearerToken}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setProductCategories(data.payload);
      } else {
        console.error('Error fetching data:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }, []); // Empty dependency array ensures the function is only created once

  useEffect(() => {
    fetchData();
  }, [fetchData]); // Include fetchData in the dependency array to trigger a re-fetch when it changes

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      url: e.target.files[0],
    });
  };

  const handleCreateCategory = async (e) => {
    e.preventDefault();

    try {
      const formDataForUpload = new FormData();
      formDataForUpload.append('categoryName', formData.categoryName);
      formDataForUpload.append('images', formData.url);

      // Replace 'YOUR_BEARER_TOKEN' with the actual bearer token
      const bearerToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1N2M2NGRjMGU3MWYxYzVmNGUwM2RiMSIsImVtYWlsIjoid2FzZWVtQGdtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcwNTI1NDQyNX0._wuUc7mItFaM24GPwRl0NFw3uAOKmUuOAefdlPHf3OY';

      const response = await fetch(
        'http://ec2-13-233-152-110.ap-south-1.compute.amazonaws.com:5000/product/createProductCategory',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${bearerToken}`,
          },
          body: formDataForUpload,
        }
      );

      if (response.ok) {
        // Handle success, maybe refresh the list of categories
        console.log('Product category created successfully');
        fetchData(); // Refresh the data
      } else {
        console.error('Error creating product category:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* Content area */}
        <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
          {/* Site header */}
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

          <main className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            {/* Product category creation form */}
            <form onSubmit={handleCreateCategory} className="mb-8 p-8 bg-white rounded shadow-md">
              <h2 className="text-2xl font-semibold mb-4">Create Product Category</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-4">
                    Category Name:
                    <input
                      type="text"
                      name="categoryName"
                      value={formData.categoryName}
                      onChange={handleInputChange}
                      className="form-input mt-1 block w-full"
                    />
                  </label>
                </div>
                <div>
                  <label className="block mb-4">
                    Images:
                    <input
                      type="file"
                      name="url"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="form-input mt-1 block w-full"
                    />
                  </label>
                </div>
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                Create Category
              </button>
            </form>

            {/* Display product categories */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {productCategories.map((category) => (
                <div key={category._id} className="p-4 bg-white rounded-md shadow-md">
                  <h2 className="text-xl font-semibold mb-2">{category.categoryName}</h2>
                  <img
                    src={category.url}
                    alt={category.categoryName}
                    className="w-full h-48 object-cover mb-2 rounded-md"
                  />
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default CategeoryManagement;
