import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../../partials/Sidebar';
import Header from '../../partials/Header';

const OrderManagement = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [orders, setOrders] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ODJhNmM3MDY0MDIyZTc2ZWI5NWE3MiIsImlhdCI6MTcwMzA2MjEwMX0.N75dcp9-EN89LXMdNDcCIoR48Ol3vA11AcdBYQgfGAg'; // Replace with the actual bearer token
        const response = await axios.get('http://ec2-13-233-152-110.ap-south-1.compute.amazonaws.com:5000/order/list', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setOrders(response.data.payload);
      } catch (error) {
        console.error('Error fetching orders:', error);
        console.error('Response:', error.response);
      }
    };

    fetchOrders();
  }, []);

  const handleStatusUpdate = async (orderId) => {
    try {
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ODJhNmM3MDY0MDIyZTc2ZWI5NWE3MiIsImlhdCI6MTcwMzA2MjEwMX0.N75dcp9-EN89LXMdNDcCIoR48Ol3vA11AcdBYQgfGAg'; // Replace with the actual bearer token
      const response = await axios.put(
        `http://ec2-13-233-152-110.ap-south-1.compute.amazonaws.com:5000/order/${orderId}`,
        {
          status: selectedStatus,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status: selectedStatus } : order
        )
      );

      setSelectedStatus('');
    } catch (error) {
      console.error('Error updating order status:', error);
      console.error('Response:', error.response);
    }
  };

  return (
    <>
      <div className="flex h-screen overflow-hidden">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden bg-gray-100">
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

          <main>
            <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
              <div className="sm:flex sm:justify-between sm:items-center mb-8">
                <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                  {/* Additional components or filters related to order management */}
                </div>
              </div>

              <div className="grid grid-cols-12 gap-6">
                {orders.map((order) => (
                  <div key={order._id} className="col-span-12 sm:col-span-6 lg:col-span-4 p-4 bg-white rounded-md shadow-md">
                    <p className="text-lg font-semibold mb-2">Order ID: {order._id}</p>
                    <p>Status: <span className={`capitalize ${order.status === 'processing' ? 'text-green-600' : 'text-yellow-600'}`}>{order.status}</span></p>
                    <p>Total Amount: ${order.totalAmount.toFixed(2)}</p>
                    <p>Customer ID: {order.customer}</p>
                    <p>Shipping Address: {order.shippingAddress}</p>
                    <p>Payment Method: {order.paymentMethod}</p>
                    <p>Created At: {new Date(order.createdAt).toLocaleString()}</p>
                    <p>Updated At: {new Date(order.updatedAt).toLocaleString()}</p>

                    <div className="mt-4">
                      <label htmlFor={`statusDropdown-${order._id}`} className="block text-sm font-medium text-gray-700">
                        Update Status:
                      </label>
                      <div className="mt-1 relative">
                        <select
                          id={`statusDropdown-${order._id}`}
                          name={`statusDropdown-${order._id}`}
                          value={selectedStatus}
                          onChange={(e) => setSelectedStatus(e.target.value)}
                          className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                        >
                          <option value="" disabled>
                            Select a status
                          </option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Canceled">Canceled</option>
                          {/* Add more status options as needed */}
                        </select>
                      </div>
                    </div>
                    <button
                      onClick={() => handleStatusUpdate(order._id)}
                      disabled={!selectedStatus}
                      className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 cursor-pointer"
                    >
                      Update Status
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default OrderManagement;
 