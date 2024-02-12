// import React, { useState } from 'react';
// import { useNavigate, Link} from 'react-router-dom';
// import logo from '../images/SideLogo.png'


// export default function SignUp() {
//   const [name, setName] = useState("");
//   const [phone_number,setPhone]=useState("")
//   const [email, setEmail] = useState("");
//   const[age,setAge]=useState("")
//  const [password, setPassword] = useState("");
//  const [image,setimage]=useState("")
//  const [city,setCity]=useState("")
//  const [gender,setGender]=useState("")
//   const [userType, setUserType] = useState("");
//   const [secretKey, setSecretKey] = useState("");
  

//  // const token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1N2M2NGRjMGU3MWYxYzVmNGUwM2RiMSIsImVtYWlsIjoid2FzZWVtQGdtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcwNjM5MzA2Nn0.qW547zMKOn3a2Tv6ikp0tdGcNCRTrF7SMnx5mGbNFPg"
//   const checkUniqueEmail = async () => {
//     // Make an API request to check if the email is unique
//     const response = await fetch('http://ec2-13-233-113-80.ap-south-1.compute.amazonaws.com:5000/admin/loginAdmin', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ email }),
//     });
//     const data = await response.json();
//     setIsEmailUnique(data.isUnique);
//   };


//   const checkUniquePhone = async () => {
//     // Make an API request to check if the phone number is unique
//     const response = await fetch('http://ec2-13-233-113-80.ap-south-1.compute.amazonaws.com:5000/admin/loginAdmin', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
        
//       },
//       body: JSON.stringify({ phone }),
//     });
//     const data = await response.json();
//     setIsPhoneUnique(data.isUnique);
//   };





//   const handleSubmit = (e) => {
                    
//                         e.preventDefault();
                        
                        
//                         if (checkUniqueEmail && checkUniquePhone) {

    
//     if (userType == "Admin" && secretKey != "Bhairav") {
//       e.preventDefault();
//       alert("Invalid Admin");
//     } else {
//       e.preventDefault();

//       console.log(name,email,phone_number,age,gender,image,city, password);
//       fetch("http://ec2-13-233-113-80.ap-south-1.compute.amazonaws.com:5000/admin/registerAdmin",
//        {
//         method: "POST",
//         crossDomain: true,
//         headers: {
//           "Content-Type": "application/json; charset=utf-8",
//           "Accept": "application/json",
//           "Access-Control-Allow-Origin": "*"
         
//         },
//         body: JSON.stringify({
//           name,
//           email,
//           phone_number,
//           age,
//           gender,
//           image,
//           city,
//           password,
//           userType,
//         }),
//       })
//       .then((res) => {
//           if (!res.ok) {
//               throw new Error("Network response was not ok");
//           }
//           return res.json();
//       })
//         .then((data) => {
//           console.log(data, "userRegister");
//           if (data.status == "ok") {
//             alert("Registration Successful");
//           } else {
//             alert("Something went wrong");
//           }
//         });
//     }
// } else {
//     alert('Email or phone number is not unique');
//   }
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0]; // Assuming single file upload
    
//     if (file) {
//       const reader = new FileReader();
      
//       reader.onloadend = () => {
//         // After the file is read, you can access its data URL
//         // which represents the file contents as a base64-encoded string
//         const imageDataUrl = reader.result;
        
//         // Update state with the image data URL
//         setimage(imageDataUrl);
//       };
      
//       // Read the file as a data URL
//       reader.readAsDataURL(file);
//     }
//   };
  

//   return (
//     <div className="min-h-screen flex items-center justify-center">
//       <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
//       <div className="flex items-center justify-center mb-4">
//           {/* Your logo goes here */}
//           <img
//             src={logo}
//             alt="Logo"
//             className="w-30 h-14 mr-2" // Adjust the width and height as needed
//           />
//           {/* <h2 className="text-2xl font-bold">Login</h2> */}
//         </div>
//         <form onSubmit={handleSubmit}>
        
         
// <div className="flex items-center mb-4">
//         <span className="mr-4">Sign in as</span>
//         <label className="flex items-center">
//           <input
//             type="radio"
//             name="UserType"
//             value="User"
//             onChange={(e) => setUserType(e.target.value)}
//           />
//           <span className="ml-2">User</span>
//         </label>
//         <label className="flex items-center ml-4">
//           <input
//             type="radio"
//             name="UserType"
//             value="Admin"
//             onChange={(e) => setUserType(e.target.value)}
//           />
//           <span className="ml-2">Admin</span>
//         </label>
//       </div>
//           {userType == "Admin" ? (
//             <label className="block mb-4">
//               <label>Secret Key</label>
//               <input
//                 type="text"
//                 className="border p-2 w-full"
             
//                 onChange={(e) => setSecretKey(e.target.value)}
                
//               />
//             </label>
//           ) : null}

        
//             <label >Name</label>
//             <input
//               type="text"
             
//               className="border p-2 w-full mb-4"
//               onChange={(e) => setName(e.target.value)}
              
//             />


//           <label >Email address</label>
//             <input
//               type="email"
//               className="border p-2 w-full mb-4"
            
//               onChange={(e) => setEmail(e.target.value)}
//             />

      
//             <label >Phone</label>
//             <input
//               type="text"
//               className="border p-2 w-full mb-4 "
            
//               onChange={(e) => setPhone(e.target.value)}
//             />
        

      
            
          
//           <label >Age</label>
//             <input
//               type="number"
//               className="border p-2 w-full mb-4"
            
//               onChange={(e) => setAge(e.target.value)}
//             />
//           `                   <label >Gender</label>
           

//                             <select  type="gender"
//                             onChange={(e)=>setGender(e.target.value)}
//                             className="border p-1 w-full mb-4"
//                             required
//                           >
//                             <option value="" disabled>Select Gender</option>
//                             <option value="male">Male</option>
//                             <option value="female">Female</option>
//                             <option value="other">Other</option>
//                           </select>


//                        <label >Photo</label>
//                       <input
//                         type="file"
//                         src={image}
//                         className="border p-4 w-full mb-4 flex "
//                         onChange={(e) => handleImageChange(e)}
//                       />


//                            <label >City</label>
//                             <input
//                               type="text"
//                               className="border p-2 w-full mb-4 "
//                               onChange={(e) => setCity(e.target.value)}
//                             />
//             <label >Password</label>
//             <input
//               type="password"
//               className="border p-2 w-full mb-4"
             
//               onChange={(e) => setPassword(e.target.value)}
//             />
           
         

//           <div className="d-grid ">
//                       <button type="submit" className="btn success btn-primary">
//                         Sign Up
//                       </button>
//           </div>
//           <p className="forgot-password text-right">
//             Already registered <Link to="/">Log in</Link>
//           </p>
//         </form>
//       </div>
//     </div>
//   );
// }





/////////////////////////

// import React, { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import logo from '../images/SideLogo.png';

// export default function SignUp() {


//   const [userType,setUserType]=useState('')
//   const[secretKey,setSecretKey]=useState('')
//   const [credentials, setCredentials] = useState({
//     name: "",
//     email: "",
//     password: "",
//     phone_number: "",
//     age: "",
//     gender: "",
//     city: "",
//     images:""
//   });
  
//   const navigate = useNavigate();

  
//  // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1N2M2NGRjMGU3MWYxYzVmNGUwM2RiMSIsImVtYWlsIjoid2FzZWVtQGdtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcwNjM5MzA2Nn0.qW547zMKOn3a2Tv6ikp0tdGcNCRTrF7SMnx5mGbNFPg";
  
//   // const checkUniqueEmail = async () => {
//   //   try {
//   //     const response = await fetch('http://ec2-13-233-113-80.ap-south-1.compute.amazonaws.com:5000/admin/loginAdmin', {
//   //       method: 'POST',
//   //       headers: {
//   //         'Content-Type': 'application/json',
//   //       },
//   //       body: JSON.stringify({ email: credentials.email }),
//   //     });
//   //     const data = await response.json();
//   //     console.log(data)
//   //     return data.isUnique;
//   //   } catch (error) {
//   //     console.error('Error checking email uniqueness:', error);
//   //     return false; // Return false in case of error to indicate uniqueness is not confirmed
//   //   }
//   // };
//   // checkUniqueEmail();

//   // const checkUniquePhone = async () => {
//   //   try {
//   //     const response = await fetch('http://ec2-13-233-113-80.ap-south-1.compute.amazonaws.com:5000/admin/loginAdmin', {
//   //       method: 'POST',
//   //       headers: {
//   //         'Content-Type': 'application/json',
//   //       },
//   //       body: JSON.stringify({ phone: credentials.phone_number }),
//   //     });
//   //     const data = await response.json();
//   //     return data.isUnique;
//   //   } catch (error) {
//   //     console.error("Error checking phone uniqueness:", error);
//   //     return false;
//   //   }
//   // };
  

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // try {
//     //   const isEmailUnique = await checkUniqueEmail();
//     //   const isPhoneUnique = await checkUniquePhone();

//     //   if (!isEmailUnique) {
//     //     alert('Email is already registered');
//     //   } else if (!isPhoneUnique) {
//     //     alert('Phone number is already registered');
//     //   } else 
//    try {
//     if(userType=='Admin'&&secretKey!='Bhairav'){
//       alert('Invalid Admin')
//     }
//     else{


//    const formData=new FormData()
//    formData.append('images',credentials.images)
     


//       const req = await fetch('http://ec2-13-233-113-80.ap-south-1.compute.amazonaws.com:5000/admin/registerAdmin'
                                        
//       , formData,{
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json;charset=utf-8',
//          Accept:'application/json'
//         },
//         body: JSON.stringify(credentials)
//       });
//       console.log(credentials)
// const response = await req.json().catch((e) => {
//   console.warn(e);
//   return null;
// });

// if (!response) {
//   alert('Failed to fetch response');
// } else {
//   console.log(response);
//   if (!response.success) {
//       alert('Enter Valid Credentials');
//   } else {
//     //  localStorage.setItem('authToken', response.payload.token);
//       navigate('/login');
//   }
// }
//   }
// }
// catch (error) {
//   console.error("Error in handle:", error);
//   alert("Error while creating user");
// };


// };
// const onChange = (event) => {
//   setCredentials({ ...credentials, [event.target.name]: event.target.value });
 
       
  
//   };
 
//   // function handleImage(e) {
//   //  console.log(e.target.files[0])
//   //   setCredentials(e.target.files[0])
//   // }
//   function handleImage(e) {
//     setCredentials({ ...credentials, images: e.target.files[0] });
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center">
//       <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
//         <div className="flex items-center justify-center mb-4">
//           <img
//             src={logo}
//             alt="Logo"
//             className="w-30 h-14 mr-2"
//           />
//         </div>
//         <form onSubmit={handleSubmit}>
//           <div className="flex items-center mb-4">
//             <span className="mr-4">Sign in as</span>
//             <label className="flex items-center">
//               <input
//                 type="radio"
//                 name="userType"
//                 value="User"
//                 onChange={(e)=>setUserType(e.target.value)}
//               />
//               <span className="ml-2">User</span>
//             </label>
//             <label className="flex items-center ml-4">
//               <input
//                 type="radio"
//                 name="userType"
//                 value="Admin"
//                 onChange={(e)=>setUserType(e.target.value)}
//               />
//               <span className="ml-2">Admin</span>
//             </label>
//           </div>
//           {userType === "Admin" && (
//             <label className="block mb-4">
//               <label>Secret Key</label>
//               <input
//                 type="text"
//                 className="border p-2 w-full"
              
           
//                 onChange={(e)=>setSecretKey(e.target.value)}
//               />
//             </label>
//           )}
//           <label>Name</label>
//           <input
//             type="text"
//             className="border p-2 w-full mb-4"
//             name="name"
//             value={credentials.name}
//             onChange={onChange}
//           />
//           <label>Email address</label>
//           <input
//             type="email"
//             className="border p-2 w-full mb-4"
//             name="email"
//             value={credentials.email}
//             onChange={onChange}
//           />
//           <label>Phone</label>
//           <input
//             type="text"
//             className="border p-2 w-full mb-4"
//             name="phone_number"
//             value={credentials.phone_number}
//             onChange={onChange}
//           />
//           <label>Age</label>
//           <input
//             type="number"
//             className="border p-2 w-full mb-4"
//             name="age"
//             value={credentials.age}
//             onChange={onChange}
//           />
//           <label>Gender</label>
//           <select
//             onChange={onChange}
//             className="border p-1 w-full mb-4"
//             name="gender"
//             value={credentials.gender}
//             required
//           >
//             <option value="" disabled>Select Gender</option>
//             <option value="male">Male</option>
//             <option value="female">Female</option>
//             <option value="other">Other</option>
//           </select>


//           <label>Photo</label>
//           <input
//             type="file"
//            name='file'
//             className="border p-4 w-full mb-4" 
            
//             onChange={handleImage}
//           />
//           <label>City</label>
//           <input
//             type="text"
//             className="border p-2 w-full mb-4"
//             name="city"
//             value={credentials.city}
//             onChange={onChange}
//           />
//           <label>Password</label>
//           <input
//             type="password"
//             className="border p-2 w-full mb-4"
//             name="password"
//             value={credentials.password}
//             onChange={onChange}
//           />
//           <div className="d-grid ">
//             <button type="submit" className="btn success btn-primary">
//               Sign Up
//             </button>
//           </div>
//           <p className="forgot-password text-right">
//             Already registered <Link to="/">Log in</Link>
//           </p>
//         </form>
//       </div>
//     </div>
//   );
// }










// import React, { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import logo from '../images/SideLogo.png';


// export default function SignUp() {
//   const [userType, setUserType] = useState('');
//   const [secretKey, setSecretKey] = useState('');
//   const [credentials, setCredentials] = useState({
//     name: "",
//     email: "",
//     password: "",
//     phone_number: "",
//     age: "",
//     gender: "",
//     city: "",
//     images: null,
//     imageUrl:""
//   });
//       console.log(credentials)
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if (userType === 'Admin' && secretKey !== 'Bhairav') {
//         alert('Invalid Admin');
//       } else {
//         const formData = new FormData();

//         formData.append('name', credentials.name);
//         formData.append('email', credentials.email);
//         formData.append('password', credentials.password);
//         formData.append('phone_number', credentials.phone_number);
//         formData.append('age', credentials.age);
//         formData.append('gender', credentials.gender);
//         formData.append('city', credentials.city);
//         formData.append('images', credentials.imageUrl);
//         console.log([...formData]);
//         const req = await fetch('http://ec2-13-233-113-80.ap-south-1.compute.amazonaws.com:5000/admin/registerAdmin',{
//         method:'POST',
        
          
         
//           headers: {
            
//             'Accept': 'application/json',
//           },
//         body:JSON.stringify(formData)
//         });
       

//         if (req.ok) {
//           const response = await req.json();
//           console.log(response);
//           if (response && response.payload && response.payload.image) {
//             navigate('/login');
//           } else {
//             alert('Failed to create admin');
//           }
//         } else {
//           alert('Failed to fetch response');
//         }
        
//       }
//     } catch (error) {
//       console.error('Error in handle:', error);
//       alert('Error while creating user');
//     }
//   };

//   const onChange = (event) => {
//     setCredentials({ ...credentials, [event.target.name]: event.target.value });
    
//   };

//   function handleImage(e) {
//     const file = e.target.files[0];
//     setCredentials({
//       ...credentials,
//       images: file,
//       imageUrl: URL.createObjectURL(file) // Store the URL of the uploaded image
//     });
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center">
//       <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
//         <div className="flex items-center justify-center mb-4">
//           <img
//             src={logo}
//             alt="Logo"
//             className="w-30 h-14 mr-2"
//           />
//         </div>
//         <form onSubmit={handleSubmit}>
//           <div className="flex items-center mb-4">
//             <span className="mr-4">Sign in as</span>
//             <label className="flex items-center">
//               <input
//                 type="radio"
//                 name="userType"
//                 value="User"
//                 onChange={(e) => setUserType(e.target.value)}
//               />
//               <span className="ml-2">User</span>
//             </label>
//             <label className="flex items-center ml-4">
//               <input
//                 type="radio"
//                 name="userType"
//                 value="Admin"
//                 onChange={(e) => setUserType(e.target.value)}
//               />
//               <span className="ml-2">Admin</span>
//             </label>
//           </div>
//           {userType === "Admin" && (
//             <label className="block mb-4">
//               <label>Secret Key</label>
//               <input
//                 type="text"
//                 className="border p-2 w-full"
//                 onChange={(e) => setSecretKey(e.target.value)}
//               />
//             </label>
//           )}
//           <label>Name</label>
//           <input
//             type="text"
//             className="border p-2 w-full mb-4"
//             name="name"
//             value={credentials.name}
//             onChange={onChange}
//           />
//           <label>Email address</label>
//           <input
//             type="email"
//             className="border p-2 w-full mb-4"
//             name="email"
//             value={credentials.email}
//             onChange={onChange}
//           />
//           <label>Phone</label>
//           <input
//             type="text"
//             className="border p-2 w-full mb-4"
//             name="phone_number"
//             value={credentials.phone_number}
//             onChange={onChange}
//           />
//           <label>Age</label>
//           <input
//             type="number"
//             className="border p-2 w-full mb-4"
//             name="age"
//             value={credentials.age}
//             onChange={onChange}
//           />
//           <label>Gender</label>
//           <select
//             onChange={onChange}
//             className="border p-1 w-full mb-4"
//             name="gender"
//             value={credentials.gender}
//             required
//           >
//             <option value="" disabled>Select Gender</option>
//             <option value="male">Male</option>
//             <option value="female">Female</option>
//             <option value="other">Other</option>
//           </select>
//           <label>Photo</label>
//           <input
//             type="file"
//             name="images"
//             className="border p-4 w-full mb-4"
//             onChange={handleImage}
//           />
//           <label>City</label>
//           <input
//             type="text"
//             className="border p-2 w-full mb-4"
//             name="city"
//             value={credentials.city}
//             onChange={onChange}
//           />
//           <label>Password</label>
//           <input
//             type="password"
//             className="border p-2 w-full mb-4"
//             name="password"
//             value={credentials.password}
//             onChange={onChange}
//           />
//           <div className="d-grid ">
//             <button type="submit" className="btn success btn-primary">
//               Sign Up
//             </button>
//           </div>
//           <p className="forgot-password text-right">
//             Already registered <Link to="/">Log in</Link>
//           </p>
//         </form>
//       </div>
//     </div>
//   );
// }



import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import logo from '../images/SideLogo.png';
import {toast} from 'react-toastify'

export default function SignUp() {
  const [userType, setUserType] = useState('');
  //const [secretKey, setSecretKey] = useState('');
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    phone_number: "",
    age: "",
    gender: "",
    city: "",
    images: null,
    imageUrl:""
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // if (userType === 'Admin' && secretKey !== 'Bhairav') {
      //   alert('Invalid Admin');
      // } else {
        const formData = new FormData();
        formData.append('name', credentials.name);
        formData.append('email', credentials.email);
        formData.append('password', credentials.password);
        formData.append('phone_number', credentials.phone_number);
        formData.append('age', credentials.age);
        formData.append('gender', credentials.gender);
        formData.append('city', credentials.city);
        formData.append('images', credentials.images);
        
        const req = await fetch('https://ec2-13-233-113-80.ap-south-1.compute.amazonaws.com:5000/admin/registerAdmin', {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json',
          },
        });

        if (req.ok) {
          const response = await req.json();
          console.log(response);
          if (response && response.payload && response.payload.image) {
            console.log(response.payload)
            localStorage.setItem("authToken", response.payload.token)
            localStorage.setItem("authName",response.payload.name)
            localStorage.setItem("authImage",response.payload.image)
            navigate('/dashboard');
          } else {
            toast.error('Failed to create admin');
          }
        } else {
          toast.error('Failed to fetch response');
        }
    //  }
    } catch (error) {
      console.error('Error in handle:', error);
      toast.error('Please ensure that your email and phone no is unique');
    }
  };

  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  function handleImage(e) {
    const file = e.target.files[0];
    setCredentials({
      ...credentials,
      images: file,
      imageUrl: URL.createObjectURL(file) // Store the URL of the uploaded image
    });
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <div className="flex items-center justify-center mb-4">
          <img
            src={logo}
            alt="Logo"
            className="w-30 h-14 mr-2"
          />
        </div>
        <form onSubmit={handleSubmit}>
          {/* <div className="flex items-center mb-4">
            <span className="mr-4">Sign in as</span>
            <label className="flex items-center">
              <input
                type="radio"
                name="userType"
                value="User"
                onChange={(e) => setUserType(e.target.value)}
              />
              <span className="ml-2">User</span>
            </label>
            <label className="flex items-center ml-4">
              <input
                type="radio"
                name="userType"
                value="Admin"
                onChange={(e) => setUserType(e.target.value)}
              />
              <span className="ml-2">Admin</span>
            </label>
          </div>
          {userType === "Admin" && (
            <label className="block mb-4">
              <label>Secret Key</label>
              <input
                type="text"
                className="border p-2 w-full"
                onChange={(e) => setSecretKey(e.target.value)}
              />
            </label>
          )} */}
          <label>Name</label>
          <input
            type="text"
            className="border p-2 w-full mb-4"
            name="name"
            value={credentials.name}
            onChange={onChange}
          />
          <label>Email address</label>
          <input
            type="email"
            className="border p-2 w-full mb-4"
            name="email"
            value={credentials.email}
            onChange={onChange}
          />
          <label>Phone</label>
          <input
            type="text"
            className="border p-2 w-full mb-4"
            name="phone_number"
            value={credentials.phone_number}
            onChange={onChange}
          />
          <label>Age</label>
          <input
            type="number"
            className="border p-2 w-full mb-4"
            name="age"
            value={credentials.age}
            onChange={onChange}
          />
          <label>Gender</label>
          <select
            onChange={onChange}
            className="border p-1 w-full mb-4"
            name="gender"
            value={credentials.gender}
            required
          >
            <option value="" disabled>Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>



          
            <label className="mb-5">Upload Image</label>
            <input
              type="file"
              name="images"
              className="p-0 w-full mb-4 mt-1"
              onChange={handleImage}
            />
        
{/* <label className="mb-2">
  <span className="block text-center border border-gray-300 py-2 px-4 bg-white rounded cursor-pointer">
    Upload Image
    <input
      type="file"
      name="images"
      className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
      onChange={handleImage}
    />
  </span>
</label> */}


          <label>City</label>
          <input
            type="text"
            className="border p-2 w-full mb-4"
            name="city"
            value={credentials.city}
            onChange={onChange}
          />
          <label>Password</label>
          <input
            type="password"
            className="border p-2 w-full mb-4"
            name="password"
            value={credentials.password}
            onChange={onChange}
          />
          <div className="d-grid ">
            <button type="submit" className="btn success btn-primary">
              Sign Up
            </button>
           
          </div>
          <p className="forgot-password text-right">
            Already registered <Link to="/"> Log in?</Link>
          </p>
        </form>
      </div>
    </div>
  );
}



//
