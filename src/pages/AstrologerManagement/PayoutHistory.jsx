import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import Sidebar from '../../partials/Sidebar';
import Header from '../../partials/Header';
import BalanceTransaction from './BalanceTransaction';

Modal.setAppElement('#root'); // replace '#root' with the ID or class of your root element

const PayoutHistory = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAstrologerId, setselectedAstrologerId] = useState(null);

  useEffect(() => {
    const fetchDataFromApi = async () => {
      try {
        const result = await axios.get("http://ec2-13-233-152-110.ap-south-1.compute.amazonaws.com:5000/astrologer/getallAstrologers");
        setData(result.data.payload);  // Update this line to use the 'payload' directly
        console.log(result.data.payload, "data");
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDataFromApi();
  }, []);

  const handleBalance = (userId) => {
    setselectedAstrologerId(userId);
    setIsModalOpen(true);
  };

  const handleDisplay = (userId) => {
    console.log(`Displaying details for user with ID: ${userId}`);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setselectedAstrologerId(null);
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
                <BalanceTransaction userId={selectedAstrologerId} closeModal={closeModal} />
              {/* Include your BalanceTransaction component or relevant content here */}
            </Modal>

            <div className="col-span-full xl:col-span-8 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
              <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
                <h2 className="font-semibold text-slate-800 dark:text-slate-100">Astrologer Payout History</h2>
              </header>
              <div className="p-3">
                <div className="overflow-x-auto">
                  <table className="table-auto w-full dark:text-slate-300">
                    <thead className="text-xs uppercase text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-700 dark:bg-opacity-50 rounded-sm">
                      <tr>
                        <th className="p-2">
                          <div className="font-semibold text-left">Date</div>
                        </th>
                        <th className="p-2">
                          <div className="font-semibold text-center">Number</div>
                        </th>
                        <th className="p-2">
                          <div className="font-semibold text-center">Amount</div>
                        </th>
                        <th className="p-2">
                          <div className="font-semibold text-center">Payment Mode</div>
                        </th>
                        <th className="p-2">
                          <div className="font-semibold text-center">Transaction Id</div>
                        </th>
                        <th className="p-2">
                          <div className='font-semibold text-center'>Status</div>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="text-sm font-medium divide-y divide-slate-100 dark:divide-slate-700">
                      {data && data.map((astrologerData, index) => (
                        <tr key={index}>
                          <td className="p-2">
                            <div className="flex items-center">
                              <div className="text-slate-800 dark:text-slate-100">{}</div>
                            </div>
                          </td>
                          <td className="p-2">
                            <div className="text-center">{}</div>
                          </td>
                          <td className="p-2">
                            <div className="text-center">{}</div>
                          </td>
                          <td className="p-2">
                            <div className="text-center">{}</div>
                          </td>
                          <td className="p-2" align="center">
                          <div className="text-center">{}</div>
                          </td>
                          <td className="p-2" align="center">
                          <div className="text-center">{}</div>
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
}

export default PayoutHistory;
