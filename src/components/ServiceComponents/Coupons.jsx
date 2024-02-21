import React,{useState} from "react";
import SideLogo from "../../images/SideLogo.png";
import EditMenu from "../../components/DropdownEditMenu";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Coupons({ coupon,accessToken }) {
  const result = coupon.data.coupons;







  const [showConfirmation, setShowConfirmation] = useState(false);
  const [couponToDelete, setCouponToDelete] = useState(null);

  const handleDeleteConfirmation = (couponId) => {
    
    setCouponToDelete(couponId);
    setShowConfirmation(true);
  };

  const handleDelete =async() => {
   try{
const result=await axios.delete("http://ec2-13-233-113-80.ap-south-1.compute.amazonaws.com:5000/coupon/deleteCoupon",{
data: { couponIds: [couponToDelete] }, 


    headers:{
        "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
    }
}
);
console.log(result);
}catch(error){
    console.log(error)
}


    setShowConfirmation(false);
  };
  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-8">
        {result.map((coupon, index) => (
          <div key={index}>
            <h1>{coupon.title}</h1>
            <div className="bg-gradient-to-br from-purple-600 to-indigo-600 text-white text-center py-10 px-20 rounded-lg shadow-md relative">
          
            <EditMenu align="right" className="absolute top-0 right-0">
                 
                  <li>
                    <button
                      onClick={() => handleDeleteConfirmation(coupon._id)}
                      className="font-medium text-sm text-rose-500 hover:text-rose-600 flex py-1 px-3"
                    >
                      Delete
                    </button>
                  </li>
                </EditMenu>
              <img src={SideLogo} className="w-12 mx-auto mb-3 rounded-lg" />

          
              <h3 className="text-x font-semibold mb-4">
                {coupon.description}
              </h3>
              <div className="flex items-center space-x-2 mb-6">
                <span
                  id="cpnCode"
                  className="border-dashed border text-white px-4 py-2 rounded-l"
                >
                  {coupon.code}
                </span>
                <span
                  id="cpnBtn"
                  className="border border-white bg-white text-purple-600 px-4 py-2 rounded-r cursor-pointer"
                >
                  Copy Code
                </span>
              </div>
              <p className="text-sm">Valid Till: {coupon.validityPeriod}</p>
              <div className="w-12 h-12 bg-white rounded-full absolute top-1/2 transform -translate-y-1/2 left-0 -ml-6"></div>
              <div className="w-12 h-12 bg-white rounded-full absolute top-1/2 transform -translate-y-1/2 right-0 -mr-6"></div>
            </div>
          </div>
        ))}
      </div>
      {showConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
          <div className="bg-white p-6 rounded-lg">
            <p className="mb-4">Are you sure you want to delete this coupon?</p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={handleDelete}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
              <button
                onClick={() => setShowConfirmation(false)}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
