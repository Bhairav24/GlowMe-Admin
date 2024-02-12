import React, { useState, useEffect } from 'react';
import axios from 'axios';

import 'react-image-crop/dist/ReactCrop.css';
import { toast } from 'react-toastify';

const AddCarousel = ({closeModal, fetchDataFromApi, accessToken }) => {
  const [editedCarousel, setEditedCarousel] = useState({
    name: '',
    images: null,
   imageUrl:""
  });


  const [imagePreview, setImagePreview] = useState(null); // State to store image preview URL
  
 
  



//   useEffect(() => {
//     setEditedCarousel((prevCarousel) => ({
//       ...prevCarousel,
//       name: carouselData.name,
//     }));
//   }, [carouselData]);

  const handleCarouselChange = (e) => {
    const { name, value } = e.target;
    setEditedCarousel((prevCarousel) => ({
      ...prevCarousel,
      [name]: value,
    }));

  
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setEditedCarousel({
      ...editedCarousel,
      images: file,
      imageUrl: URL.createObjectURL(file) // Store the URL of the uploaded image
    }); 
    
    setImagePreview(URL.createObjectURL(file));
  };

  

  const handleEditCarousel = async () => {
    try {
      const formData = new FormData();
      formData.append('name', editedCarousel.name);
      formData.append('images', editedCarousel.images)

      const result = await axios.post(
        "http://ec2-13-233-113-80.ap-south-1.compute.amazonaws.com:5000/admin/uploadSliderImage",
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
           
          },
        }
      );

      console.log(result);

      fetchDataFromApi();
      closeModal();
      toast.success('New Carousel Added!')
    } catch (error) {
      toast.error('Something went wrong :(')
      console.log(error);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-800 p-4 shadow-lg rounded-sm">
      <div className="flex justify-end">
        <button className="text-gray-500 hover:text-gray-700" onClick={closeModal}>
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
      <h2 className="text-lg font-semibold mb-4">Add Carousel</h2>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Name:</label>
        <input
          type="text"
          name="name"
          value={editedCarousel.name}
          onChange={handleCarouselChange}
          className="mb-2 p-2 border border-slate-200 rounded-sm w-full"
        />
      </div>
      <div className="mb-4">

      <label className="block text-gray-700 text-sm font-bold mb-2">Upload Image:</label>
      {imagePreview && <img src={imagePreview} className='h-20 w-20 rounded-full mx-auto' alt="Image Preview" />}
    
        <input type="file" onChange={handleImageChange} />
      </div>
     
      
      
      <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white" onClick={handleEditCarousel}>
        Create 
      </button>
    </div>
  );
};

export default AddCarousel;


