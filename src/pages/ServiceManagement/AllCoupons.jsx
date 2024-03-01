

import React, { useEffect, useState } from "react";

import axios from "axios";
import Sidebar from "../../partials/Sidebar";
import Header from "../../partials/Header";
import { HomeOutlined, UserOutlined } from "@ant-design/icons";
import { Breadcrumb } from "antd";
import Coupons from "../../components/ServiceComponents/Coupons";
import AddCoupon from '../ServiceManagement/AddCoupon'
import Buttons from "../../components/Buttons";
import BreadCrumbs from "../../components/BreadCrumbs";
const AllCoupons = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const[coupon,SetCoupon]=useState('')
  const accessToken = localStorage.getItem("authToken");

 
    const fetchDataFromApi = async () => {
      try {
        const result = await axios.get('http://ec2-13-233-113-80.ap-south-1.compute.amazonaws.com:5000/coupon/getAllCoupon');
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
          <BreadCrumbs currentPage='All Coupons' parentPage='Service'/>
            <h2 className="font-semibold text-slate-800 dark:text-slate-100 mb-8 text-4xl">
              All Coupons
            </h2>

            <div className="col-span-full xl:col-span-8 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 overflow-hidden ">
              <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center">
              
              <Buttons buttonName='Create New Coupon' modelOpen={() => setIsModalOpen(true)}/>
               
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
