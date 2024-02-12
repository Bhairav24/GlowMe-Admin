import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../../partials/Sidebar';
import Header from '../../partials/Header';

const PayRefund = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Replace 'YOUR_BEARER_TOKEN' with your actual bearer token
        const bearerToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ODJhNmM3MDY0MDIyZTc2ZWI5NWE3MiIsImlhdCI6MTcwMzA2MjEwMX0.N75dcp9-EN89LXMdNDcCIoR48Ol3vA11AcdBYQgfGAg';

        const response = await axios.get('http://ec2-13-233-152-110.ap-south-1.compute.amazonaws.com:5000/payment/getUserTransaction', {
          headers: {
            Authorization: `Bearer ${bearerToken}`,
          },
        });

        setTransactions(response.data.payload);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleRefund = (transactionId) => {
    // Assuming you have a refund API endpoint and you want to open it in a new window
    const refundEndpoint = `http://example.com/refund/${transactionId}`;

    // Open a new window for the refund
    window.open(refundEndpoint, '_blank');
  };

  return (
    <>
      <div className="flex h-screen overflow-hidden">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden bg-gray-100">
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <main className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            <h1 className="text-3xl font-semibold mb-8">Pay Refund</h1>

            {loading ? (
              <p>Loading...</p>
            ) : (
              <div>
                {transactions.map((transaction) => (
                  <div key={transaction._id} className="bg-white p-6 rounded-lg shadow-md mb-4">
                    <ul className="list-disc">
                      <li>
                        <strong>Title:</strong> {transaction.title}
                      </li>
                      <li>
                        <strong>Amount:</strong> {transaction.amount}
                      </li>
                      <li>
                        <strong>Payment Method:</strong> {transaction.paymentMethod}
                      </li>
                      <li>
                        <strong>Payment Status:</strong> {transaction.paymentStatus}
                      </li>
                      <li>
                        <strong>Transaction ID:</strong> {transaction.transactionId}
                      </li>
                      <li>
                        <strong>Transaction Type:</strong> {transaction.transactionType}
                      </li>
                      <li>
                        <strong>Description:</strong> {transaction.description}
                      </li>
                      <li>
                        <strong>Created At:</strong> {transaction.createdAt}
                      </li>
                    </ul>
                    <button onClick={() => handleRefund(transaction._id)} className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4">
                      Refund
                    </button>
                  </div>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </>
  );
};

export default PayRefund;
