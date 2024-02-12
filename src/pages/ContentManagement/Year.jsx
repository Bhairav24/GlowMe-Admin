import React, { useState, useEffect, useCallback } from 'react';
import Sidebar from '../../partials/Sidebar';
import Header from '../../partials/Header';

const Year = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sliderImages, setSliderImages] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    heading: '2023',
    url: '',
    images: null,
  });

  const fetchData = useCallback(async () => {
    try {
      // Replace 'YOUR_BEARER_TOKEN' with the actual bearer token
      const bearerToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NzFkMzE0YWY0ZDMxMzM0MzhkNGIyOSIsImlhdCI6MTcwMTk1ODQzM30.BXxPMQElC7dnJ1CvgViXt9rawhZhfDRkLMZRHfcDX24';

      const response = await fetch(
        'http://ec2-13-233-152-110.ap-south-1.compute.amazonaws.com:5000/user/getAllImages/2023',
        {
          headers: {
            Authorization: `Bearer ${bearerToken}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setSliderImages(data.payload);
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
      images: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataForUpload = new FormData();
      formDataForUpload.append('name', formData.name);
      formDataForUpload.append('heading', formData.heading);
      formDataForUpload.append('url', formData.url);
      formDataForUpload.append('images', formData.images);

      // Replace 'YOUR_BEARER_TOKEN' with the actual bearer token
      const bearerToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1N2M2NGRjMGU3MWYxYzVmNGUwM2RiMSIsImVtYWlsIjoid2FzZWVtQGdtYWlsLmNvbSIsImlhdCI6MTcwMzE3NTMwOX0.4wQD8TD2Vg7sZb52-nUtm2TTCpGI1poNDkqIWFv1Xe0';

      const response = await fetch(
        'http://ec2-13-233-152-110.ap-south-1.compute.amazonaws.com:5000/admin/uploadSliderImage',
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
              <h2 className="text-2xl font-semibold mb-4">Upload Image</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-4">
                    Name:
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="form-input mt-1 block w-full"
                    />
                  </label>
                </div>
                <div>
                  <label className="block mb-4">
                    URL:
                    <input
                      type="text"
                      name="url"
                      value={formData.url}
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
                    name="images"
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

            {/* Display slider images */}
            {/* Display slider images */}
<div className="flex flex-wrap -mx-4">
  {sliderImages.map((image) => (
    <div key={image._id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 p-4">
      <div className="flex flex-col h-full border rounded-md overflow-hidden">
        <img
          src={image.image}
          alt={image.name}
          className="w-full h-48 object-cover rounded-t-md"
        />
        <div className="p-4 flex-grow">
          <h2 className="text-xl font-bold">{image.name}</h2>
          <p className="text-lg">{image.heading}</p>
          <a
            href={image.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500"
          >
            {image.url}
          </a>
        </div>
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

export default Year;
