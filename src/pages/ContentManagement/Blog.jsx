import React, { useState, useEffect, useCallback } from 'react';
import Sidebar from '../../partials/Sidebar';
import Header from '../../partials/Header';
import axios from 'axios';

const Blog = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [articleImages, setArticleImages] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: null,
  });

  const fetchData = useCallback(async () => {
    try {
      // Replace 'YOUR_BEARER_TOKEN' with the actual bearer token
      const bearerToken = 'YOUR_BEARER_TOKEN';

      const response = await fetch(
        'http://ec2-13-233-152-110.ap-south-1.compute.amazonaws.com:5000/articles/published-articles',
        {
          headers: {
            Authorization: `Bearer ${bearerToken}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setArticleImages(data.payload);
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
      image: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataForUpload = new FormData();
      formDataForUpload.append('title', formData.title);
      formDataForUpload.append('description', formData.description);
      formDataForUpload.append('images', formData.image);

      // Replace 'YOUR_BEARER_TOKEN' with the actual bearer token
      const bearerToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ODQxOGI2OTI3M2Q0MDA5N2NiNTNhYSIsImlhdCI6MTcwNTkxMDQyOX0.3jCVjm1HDo8ZMeTdKiN0M58812Ul_txVkVqFnnkdOc4';

      const response = await fetch(
        'http://ec2-13-233-152-110.ap-south-1.compute.amazonaws.com:5000/articles/createarticle',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${bearerToken}`,
          },
          body: formDataForUpload,
        }
      );

      if (response.ok) {
        // Handle success, maybe refresh the list of images
        console.log('Image uploaded successfully');
        fetchData(); // Refresh the data
      } else {
        console.error('Error uploading image:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDelete = (userId) => {
    console.log('Delete user with id:', userId);
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
            {/* Image upload form */}
            <form onSubmit={handleSubmit} className="mb-8 p-8 bg-white rounded shadow-md">
              <h2 className="text-2xl font-semibold mb-4">Upload Image for Article</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-4">
                    Title:
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      className="form-input mt-1 block w-full"
                    />
                  </label>
                </div>
                <div>
                  <label className="block mb-4">
                    Description:
                    <input
                      type="text"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      className="form-input mt-1 block w-full"
                    />
                  </label>
                </div>
              </div>
              <div className="mb-4">
                <label className="block mb-2">
                  Image:
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="form-input mt-1 block w-full"
                  />
                </label>
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                Upload Image
              </button>
            </form>

            {/* Display article images */}
            <div className="flex flex-wrap -mx-4">
              {articleImages.map((image) => (
                <div
                  key={image._id}
                  className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 p-4 flex-shrink-0"
                >
                  <div className="border rounded-md overflow-hidden h-full flex flex-col">
                    <img
                      src={image.image}
                      alt={image.title}
                      className="w-full h-48 object-cover rounded-t-md"
                    />
                    <div className="p-4 flex-grow">
                      <h2 className="text-xl font-bold">{image.title}</h2>
                      <p className="text-lg">{image.description}</p>
                    </div>
                    {/* delete the article */}
                    <button
                      onClick={() => handleDelete(image._id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-b-md hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default Blog;
