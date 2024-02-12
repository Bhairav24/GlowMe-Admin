import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import './AddButton.css'
import fetchDataFromApi from './user';

const AddButton = ({ closeModal }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone_number: '',
    age: '',
    city: '',
    // Add other fields as needed
  });

    const addNewUser = async (formData) => {
      try {
        const response = await fetch('http://ec2-13-233-152-110.ap-south-1.compute.amazonaws.com:5000/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ formData }),
        });
  
        if (response.ok) {
          const data = await response.json();
          fetchDataFromApi();
          // setData(result.data.payload.account);
          // Handle successful login, e.g., store authentication token
          console.log(' successful:', data);
          history('/user');
        } else {
          // Handle login failure, e.g., show error message
          console.error('failed');
        }
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Perform any validation if needed before submitting to the API
    addNewUser(formData);
    closeModal();
  };

  return (
    <Modal
      isOpen={true} // Pass the modal state from the parent component
      onRequestClose={closeModal}
      contentLabel="Add Page Modal"
      className="modal medium" // Use the custom modal class
      overlayClassName="modal-overlay"
    >
      <div className="flex justify-end">
        <button className="text-gray-500 hover:text-gray-700" onClick={closeModal}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <div className="p-4 modal-content">
        <h2 className="text-xl font-bold mb-4">Add New User</h2>
        <form onSubmit={handleSubmit}>
          {/* Input fields */}
          <div className="mb-1">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="border rounded-md w-full py-2 px-3"
              required
            />
          </div>
          <div className="mb-1">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="border rounded-md w-full py-2 px-3"
              required
            />
          </div>
          <div className="mb-1">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Phone_number">
              Phone_number
            </label>
            <input
              type="number"
              id="Phone_number"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
              className="border rounded-md w-full py-2 px-3"
              required
            />
          </div>
          <div className="mb-1">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="age">
              age
            </label>
            <input
              type="number"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="border rounded-md w-full py-2 px-3"
              required
            />
          </div>
          <div className="mb-1">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="city">
              city
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="border rounded-md w-full py-2 px-3"
              required
            />
          </div>

         

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Submit
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default AddButton;
