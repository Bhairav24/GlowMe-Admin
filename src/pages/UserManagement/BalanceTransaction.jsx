import React, { useState } from 'react';
import axios from 'axios';
import { FaTimes } from 'react-icons/fa';

const BalanceTransaction = ({ userId, closeModal, balance }) => {
  const [amount, setAmount] = useState('');
  const [balanceOperation, setBalanceOperation] = useState('credit');
  const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1N2M2NGRjMGU3MWYxYzVmNGUwM2RiMSIsImVtYWlsIjoid2FzZWVtQGdtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcwNjU2Mjg5OX0.XN0oYm-aILTalPOMGHyIaI6HvmOHQvombL6xv67fXkQ";

  const handleBalanceSubmit = async () => {
    try {
      const parsedAmount = parseFloat(amount);
      
      if (isNaN(parsedAmount) || parsedAmount <= 0) {
        console.error('Please enter a valid positive amount.');
        return;
      }

      // Calculate the adjusted amount based on the selected operation
      const adjustedAmount = (balanceOperation === 'credit') ? parsedAmount+balance : balance-parsedAmount;

      // Construct the request payload
      const requestData = {
        amount: adjustedAmount,
        userID: userId,
      };

      // Make the API call
      const response = await axios.post('http://ec2-13-233-152-110.ap-south-1.compute.amazonaws.com:5000/admin/updateUserBalance', requestData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      // Handle the response as needed
      console.log('API Response:', response.data);

      // Close the modal or perform other actions after a successful request
      closeModal();
      // update the balance
      window.location.reload();
    } catch (error) {
      console.error('Error submitting balance:', error.message);
      // Handle error, e.g., show an error message to the user
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-end mb-4">
        <button
          className="text-gray-500 hover:text-gray-700"
          onClick={closeModal}
        >
          <FaTimes />
        </button>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Amount</label>
        <input
          type="number"
          className="mt-1 p-2 border rounded-md w-full"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Operation</label>
        <select
          className="mt-1 p-2 border rounded-md w-full"
          value={balanceOperation}
          onChange={(e) => setBalanceOperation(e.target.value)}
        >
          <option value="credit">Credit</option>
          <option value="debit">Debit</option>
        </select>
      </div>
      <div className="flex justify-end">
        <button
          className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 mr-2"
          onClick={handleBalanceSubmit}
        >
          Submit
        </button>
        <button
          className="text-gray-500 hover:text-gray-700 p-2 rounded-md"
          onClick={closeModal}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default BalanceTransaction;
