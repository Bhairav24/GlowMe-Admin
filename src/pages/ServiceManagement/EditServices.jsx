// // EditUserForm.jsx
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const EditServices = ({ serviceData, closeModal, fetchDataFromApi, accessToken }) => {
//   const [editedService, setEditedService] = useState({
//     name: serviceData.name,
//    // images: serviceData.url,
    
//   });

//   useEffect(() => {
//     // Update the form fields when userData changes
//     setEditedService({
//         name: serviceData.name,
//      //   images: serviceData.url,
//     });
//   }, [serviceData]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setEditedService((prevUser) => ({
//       ...prevUser,
//       [name]: value,
//     }));
//   };

//   const handleEditService = async () => {
//     try {
        
//         console.log(editedService);
      
        
//       const result = await axios.patch("http://ec2-13-233-113-80.ap-south-1.compute.amazonaws.com:5000/admin/createServicesCategory",
       
   
//         {
//           userID: serviceData._id,
//           updatedData: editedService,
//         },
//         {
//           headers: {
          
//             Authorization: `Bearer ${accessToken}`,
//           },
//         }
//       );
//       console.log(result);
//       fetchDataFromApi();
//       closeModal(); // Close the modal after editing the user
//     } catch (error) {
//       console.log(error);
//     }
//   };

 
//   return (
//     <div className="bg-white dark:bg-slate-800 p-4 shadow-lg rounded-sm">
//         <div className="flex justify-end">
//           <button className="text-gray-500 hover:text-gray-700" onClick={closeModal}>
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-6 w-6"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
//             </svg>
//           </button>
//         </div>
//       <h2 className="text-lg font-semibold mb-4">Edit User</h2>

//       <div className="mb-4">
//           <label className="block text-gray-700 text-sm font-bold mb-2">First Name:</label>
//       <input
//         type="text"
//         name="name"
//         value={editedService.name}
//         onChange={handleInputChange}
    
//         className="mb-2 p-2 border border-slate-200 rounded-sm w-full"
//       />
//       </div>
// {/* 
//       <div className="mb-4">
//           <label className="block text-gray-700 text-sm font-bold mb-2">Last Name:</label>
//       <input
//         type="text"
//         name="Last_name"
//         value={editedUser.Last_name}
//         onChange={handleInputChange}
    
//         className="mb-2 p-2 border border-slate-200 rounded-sm w-full"
//       /> 
//       </div> */}

   
      
//       <button
//         className="btn bg-indigo-500 hover:bg-indigo-600 text-white"
//         onClick={handleEditService}
//       >
//         Edit User
//       </button>
//     </div>
//   );
// };

// export default EditServices;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

const EditServices = ({ serviceData, closeModal, fetchDataFromApi, accessToken }) => {
  const [editedService, setEditedService] = useState({
    name: serviceData.name,
    image: null,
    crop: { aspect: 1 },
    croppedImageUrl: null,
  });

  useEffect(() => {
    setEditedService((prevService) => ({
      ...prevService,
      name: serviceData.name,
    }));
  }, [serviceData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedService((prevService) => ({
      ...prevService,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const imageFile = e.target.files[0];
      const imageUrl = URL.createObjectURL(imageFile);
      setEditedService((prevService) => ({
        ...prevService,
        image: imageFile,
        croppedImageUrl: imageUrl,
      }));
    }
  };

  const handleCropChange = (crop) => {
    setEditedService((prevService) => ({
      ...prevService,
      crop,
    }));
  };

  const handleCropComplete = (crop, croppedAreaPixels) => {
    if (editedService.image && croppedAreaPixels) {
      createCroppedImage(editedService.image, croppedAreaPixels);
    }
  };

  const createCroppedImage = (image, croppedAreaPixels) => {
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = croppedAreaPixels.width;
    canvas.height = croppedAreaPixels.height;
    const ctx = canvas.getContext('2d');

    ctx.drawImage(
      image,
      croppedAreaPixels.x * scaleX,
      croppedAreaPixels.y * scaleY,
      croppedAreaPixels.width * scaleX,
      croppedAreaPixels.height * scaleY,
      0,
      0,
      croppedAreaPixels.width,
      croppedAreaPixels.height
    );

    canvas.toBlob((blob) => {
      setEditedService((prevService) => ({
        ...prevService,
        croppedImage: blob,
      }));
    });
  };

  const handleEditService = async () => {
    try {
      const formData = new FormData();
      formData.append('name', editedService.name);
      formData.append('croppedImage', editedService.croppedImage);

      const result = await axios.patch(
        "http://ec2-13-233-113-80.ap-south-1.compute.amazonaws.com:5000/admin/createServicesCategory",
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      console.log(result);
      fetchDataFromApi();
      closeModal();
    } catch (error) {
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
      <h2 className="text-lg font-semibold mb-4">Edit User</h2>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">First Name:</label>
        <input
          type="text"
          name="name"
          value={editedService.name}
          onChange={handleInputChange}
          className="mb-2 p-2 border border-slate-200 rounded-sm w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Upload Image:</label>
        <input type="file" onChange={handleImageChange} />
      </div>
      {editedService.croppedImageUrl && (
        <ReactCrop
          src={editedService.croppedImageUrl}
          crop={editedService.crop}
          onChange={handleCropChange}
          onComplete={handleCropComplete}
        />
      )}
      <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white" onClick={handleEditService}>
        Edit User
      </button>
    </div>
  );
};

export default EditServices;
