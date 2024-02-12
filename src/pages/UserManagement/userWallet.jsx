import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Modal from 'react-modal';
import Sidebar from '../../partials/Sidebar';
import Header from '../../partials/Header';
import BalanceTransaction from './BalanceTransaction';

Modal.setAppElement('#root');

const UserWallet = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchDataFromApi = async () => {
      try {
        const result = await axios.get("http://ec2-13-233-152-110.ap-south-1.compute.amazonaws.com:5000/user/findAll");
        setData(result.data.payload.account);
        console.log(result.data.payload.account, "data");
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDataFromApi();
  }, []);

  const handleBalance = (userId) => {
    const user = data.find((user) => user._id === userId);
    if (user) {
      setSelectedUserId(userId);
      setSelectedUser(user);
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUserId(null);
    setSelectedUser(null);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            <Modal
              isOpen={isModalOpen}
              onRequestClose={closeModal}
              contentLabel="Balance Transaction Modal"
              className="modal"
              overlayClassName="modal-overlay"
            >
              {selectedUserId && (
                <BalanceTransaction
                  userId={selectedUserId}
                  balance={selectedUser.amount}
                  closeModal={closeModal}
                />
              )}
            </Modal>
            <div className="col-span-full xl:col-span-8 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
              {/* ... (your existing code) */}
              <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
                <h2 className="font-semibold text-slate-800 dark:text-slate-100">All Users</h2>
              </header>
              <div className="p-3">
                {/* Table */}
                <div className="overflow-x-auto">
                  <table className="table-auto w-full dark:text-slate-300">
                    {/* Table header */}
                    <thead className="text-xs uppercase text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-700 dark:bg-opacity-50 rounded-sm">
                      <tr>
                        <th className="p-2">
                          <div className="font-semibold text-left">Name</div>
                        </th>
                        <th className="p-2">
                          <div className="font-semibold text-center">Email</div>
                        </th>
                        <th className="p-2">
                          <div className="font-semibold text-center">Phone Number</div>
                        </th>
                        <th className="p-2">
                          <div className="font-semibold text-center">Balance</div>
                        </th>
                        <th className="p-2">
                          <div className="font-semibold text-center">Actions</div>
                        </th>
                        <th className="p-2">
                          <div className='front-semibold text-cebter'>Details</div>
                        </th>
                      </tr>
                    </thead>
                    {/* Table body */}
                    <tbody className="text-sm font-medium divide-y divide-slate-100 dark:divide-slate-700">
                      {/* Rows dynamically generated based on data */}
                      {data.map((user, index) => (
                        <tr key={index}>
                          <td className="p-2">
                            <div className="flex items-center">
                              <div className="text-slate-800 dark:text-slate-100">{user.name}</div>
                            </div>
                          </td>
                          <td className="p-2">
                            <div className="text-center">{user.email}</div>
                          </td>
                          <td className="p-2">
                            <div className="text-center">{user.phone_number}</div>
                          </td>
                          <td className="p-2">
                            <div className="text-center">{user.amount}</div>
                          </td>
                          <td className="p-2" align="center">
                            <button className="btn bg-red-500 hover:bg-red-600 text-white" onClick={() => handleBalance(user._id)}>
                              {/* Replace with Edit Symbol */}
                              <svg className="w-4 h-4 fill-current opacity-50 flex-shrink-0 ml-2 -mr-1" viewBox="0 0 24 24">
                                <path d="M12 19l7-7 1.4 1.4-7 7-1.4-1.4zM5 12h2"></path>
                                <path d="M21 10v2"></path>
                                <path d="M3 6v12a2 2 0 0 0 2 2h12"></path>
                              </svg>
                            </button>

                          </td>
                          <td className="p-2" align="center">
                            <button className="btn bg-green-500 hover:bg-green-600 text-white" onClick={() => handleDisplay(user.id)}>
                              Details
                              {/* bal edit Symbol */}
                              <svg className="w-4 h-4 fill-current opacity-50 flex-shrink-0 ml-2 -mr-1" viewBox="0 0 16 16">
                                <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                              </svg>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default UserWallet;
