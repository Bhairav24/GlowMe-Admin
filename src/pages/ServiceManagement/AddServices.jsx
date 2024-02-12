import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const AddServices = ({ closeModal, fetchDataFromApi, accessToken }) => {

  const [serviceNameError, setServiceNameError] = useState('');

  const [imagePreview, setImagePreview] = useState(null); // State to store image preview URL

  const [allServiceNames, setAllServiceNames] = useState([]);
 
  const [serviceData, setServiceData] = useState({

    name: '',
   images: null, 
    imageUrl:''
    
  });

 
  useEffect(() => {
    const fetchAllServiceNames = async () => {
      try {
        const response = await axios.get('http://ec2-13-233-113-80.ap-south-1.compute.amazonaws.com:5000/admin/getServicesCatogory');
        const serviceNames = response.data.payload.map(service => service.name);
        setAllServiceNames(serviceNames);
      } catch (error) {
        console.error('Error fetching service names:', error);
      }
    };
    fetchAllServiceNames();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setServiceData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Check if the entered service name already exists
    if(name==='name') {
        
       const typedServiceName = value.trim().toLowerCase(); // Trim and convert to lowercase
       const existingServiceNames = allServiceNames.map(serviceName => serviceName.trim().toLowerCase()); // Trim and convert each existing service name to lowercase
       
    if (existingServiceNames.includes(typedServiceName)) {
      setServiceNameError('Service name already exists');
    } else {
      setServiceNameError('');
    }
      // You can perform further actions such as showing an error message to the user
    }
  };


  const handleImage=(e) =>{
    const file = e.target.files[0];
    setServiceData({
      ...serviceData,
      images: file,
      imageUrl: URL.createObjectURL(file) // Store the URL of the uploaded image
    }); 
    
    setImagePreview(URL.createObjectURL(file));
};




  const handleSubmit = async (e) => {
                 
    e.preventDefault(); 

    try {

      
    const formData = new FormData();
    formData.append('name', serviceData.name)
    formData.append('images', serviceData.images)

      const result = await axios.post('http://ec2-13-233-113-80.ap-south-1.compute.amazonaws.com:5000/admin/createServicesCategory',
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'multipart/form-data'
          },
        }
      );
      console.log(result);
      fetchDataFromApi();
      closeModal();
      toast.success('New Service Added!') // Close the modal after adding an astrologer
    } catch (error) {
      toast.error('Something went wrong')
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
      <div className="mb-4">
        <h2 className="text-xl font-bold mb-4">Create New Service</h2>
        <form onSubmit={handleSubmit}>

        <div className="mb-1">
            <label className="block text-gray-700 text-sm font-bold mb-2">
             Service Name 
            </label>

            {serviceNameError && <span className="text-red-500 text-sm ">{serviceNameError}</span>}
            <input
              type="text"
              id="name"
              name="name" 
              value={serviceData.name}
              onChange={handleChange}
              className="border rounded-md w-full py-2 px-3 mb-5"
              required
            />
          </div>
          


          <div className="mb-1">
      

          {imagePreview && (
              <img src={imagePreview} alt="Selected" className="h-20 w-20 rounded-full mx-auto" />
            )}
                  <label className="block text-gray-700 text-sm font-bold mb-2">Upload Image</label>
            <input
              type="file"
             
              className=" mb-5 mt-1"
              onChange={handleImage}
              required

             
            />
          </div>
          
    
          

          <button
  type="submit"
  disabled={!!serviceNameError || serviceData.name.trim() === ''}
  className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${
    !!serviceNameError || serviceData.name.trim() === '' ? 'opacity-50 cursor-not-allowed' : ''
  }`}
>
  Submit
</button>
        </form>
      </div>
    </div>
  );
};

export default AddServices;
