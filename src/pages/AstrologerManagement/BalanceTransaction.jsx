import React, { useState } from 'react';
import axios from 'axios';
import { FaTimes } from 'react-icons/fa'; // Assuming you have imported FontAwesome icons

const BalanceTransaction = ({ userId, closeModal }) => {
  const [balanceOperation, setBalanceOperation] = useState('credit');
  const [amount, setAmount] = useState('');

  const handleBalanceSubmit = async () => {
    try {
      const response = await axios.post("http://ec2-13-233-152-110.ap-south-1.compute.amazonaws.com:5000/auth/updateProfile", {
        userId: userId,
        operation: balanceOperation,
        amount: parseFloat(amount),
      });

      console.log(response.data);
      // You may want to update the user data after a successful balance operation
      // Example: refetch user data
      // fetchDataFromApi();
    } catch (error) {
      console.error('Error updating profile:', error.message);
    } finally {
      closeModal();
      setAmount('');
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-end mb-4">
        <button
          className="text-gray-500 hover:text-gray-700"
          onClick={closeModal}
        >
          <FaTimes /> {/* FontAwesome 'X' icon */}
        </button>
      </div>
      <h2 className="text-xl font-semibold mb-4">Balance Operation</h2>
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
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Amount</label>
        <input
          type="number"
          className="mt-1 p-2 border rounded-md w-full"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
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
