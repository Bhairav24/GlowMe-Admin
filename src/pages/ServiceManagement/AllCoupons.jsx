

import React, { useEffect, useState } from "react";

import axios from "axios";
import Sidebar from "../../partials/Sidebar";
import Header from "../../partials/Header";
import { HomeOutlined, UserOutlined } from "@ant-design/icons";
import { Breadcrumb } from "antd";
import Coupons from "../../components/ServiceComponents/Coupons";
import AddCoupon from '../ServiceManagement/AddCoupon'

const AllCoupons = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const[coupon,SetCoupon]=useState('')
  const accessToken = localStorage.getItem("authToken");

 
    const fetchDataFromApi = async () => {
      try {
        const result = await axios.post('http://ec2-13-233-113-80.ap-south-1.compute.amazonaws.com:5000/coupon/getAllCoupon');
  SetCoupon(result)
      } catch (error) {
        console.error('Error fetching time slots:', error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    useEffect(() => {
    fetchDataFromApi();
  }, []);


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
            <Breadcrumb
              className="mb-5"
              items={[
                { title: <HomeOutlined /> },
                {
                  title: (
                    <>
                      <UserOutlined />
                      <span>Service</span>
                    </>
                  ),
                },
                { title: "All Coupons" },
              ]}
            />
            <h2 className="font-semibold text-slate-800 dark:text-slate-100 mb-8 text-4xl">
              All Coupons
            </h2>

            <div className="col-span-full xl:col-span-8 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 overflow-hidden ">
              <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center">
              
                <button
                  className="btn bg-indigo-500 hover:bg-indigo-600 text-white"
                  onClick={() => setIsModalOpen(true)}
                >
                  <svg
                    className="w-4 h-4 fill-current opacity-50 shrink-0"
                    viewBox="0 0 16 16"
                  >
                    <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                  </svg>
                  <span className="hidden xs:block ml-2">Add Coupon</span>
                </button>
               
              </header>
              
              <div className="p-3">
                <div className="overflow-x-auto">
                <Coupons coupon={coupon} accessToken={accessToken}/>
                </div>
            
              </div>
            </div>
          </div>
        </main>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <AddCoupon
            closeModal={() => setIsModalOpen(false)}
            fetchDataFromApi={fetchDataFromApi}
            accessToken={accessToken}
          />
        </div>
      )}
    </div>
  );
};

export default AllCoupons;
