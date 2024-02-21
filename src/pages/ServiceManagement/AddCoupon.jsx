import React, { useState } from 'react'
import SideLogo from '../../images/SideLogo.png'
import axios from 'axios';

export default function AddCoupon({closeModal,accessToken,fetchDataFromApi}) {

  const [coupon,setCoupon]=useState({
    title:'',
    description:'',
    code:"",
    discount:"",
    discountType:"",
    validityPeriod:""

  })

    const handleChange=(e)=>{
      const {name,value}=e.target;
      setCoupon((couponData)=>({
        ...couponData,
        [name]:value

      }))
    }

const handleclick=async (e)=>{
  e.preventDefault();
  try {
const result= await axios.post('http://ec2-13-233-113-80.ap-south-1.compute.amazonaws.com:5000/coupon/create',
coupon,
{
  headers:{
    Authorization: `Bearer ${accessToken}`,
  }
})
console.log(result)
fetchDataFromApi();
closeModal();

    
  } catch (error) {
    console.log(error);
  }
}


 
    return(
 <div className="container mx-auto flex-center w-full md:w-2/3 lg:w-1/3">
          
 <div className="bg-gradient-to-br from-purple-600 to-indigo-600  text-center py-10 px-20 rounded-lg shadow-md relative">
 <div className="flex justify-end">
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={closeModal}
          >
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
   <img src={SideLogo} className="w-12 mx-auto mb-3 rounded-lg" alt="Coupon Logo" />
   <div className="mb-4">
     <h1>Name:</h1>
     <input
       type="text"
       id="fname"
       name="title"
       value={coupon.title}
       onChange={handleChange}
       className="border rounded-md w-full py-2 px-3"
       required
     />
   </div>
   <div className="mb-4">
     <h3>Description:</h3>
     <input
       type="text"
       id="fname"
       name="description"
       value={coupon.description}
       onChange={handleChange}
       className="border rounded-md w-full py-2 px-3"
       required
     />
   </div>
   <div className="mb-4">
   <h3>Code:</h3>
       <input
         type="text"
         id="fname"
         name="code"
         value={coupon.code}
         onChange={handleChange}
         className="border rounded-md w-full py-2 px-3"
         required
       />
     <div className="mb-4">
     <h3>Discount:</h3>
     <input
       type="text"
     
       name="discount"
       value={coupon.discount}
       onChange={handleChange}
       className="border rounded-md w-full py-2 px-3"
       required
     />
   </div>
   <div className="mb-4">
     <h3>Discount Type:</h3>
     <input
       type="text"
    
       name="discountType"
       value={coupon.discountType}
       onChange={handleChange}
       className="border rounded-md w-full py-2 px-3"
       required
     />
   </div>
     
   </div>
   <div className="mb-4">
     <p>Valid Till:</p>
     <input
       type="text"
       id="fname"
       name="validityPeriod"
       value={coupon.validityPeriod}
       onChange={handleChange}
       className="border rounded-md w-full py-2 px-3"
       required
     />
   </div>
   <button
   type="submit"
   onClick={handleclick}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Submit
            </button>
   <div className="w-12 h-12 bg-white rounded-full absolute top-1/2 transform -translate-y-1/2 left-0 -ml-6"></div>
   <div className="w-12 h-12 bg-white rounded-full absolute top-1/2 transform -translate-y-1/2 right-0 -mr-6"></div>
 </div>
</div>
    )
}