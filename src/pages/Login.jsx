import React, { useState } from 'react';
import { useNavigate, Link} from 'react-router-dom';
import logo from '../images/SideLogo.png'
import { toast } from 'react-toastify';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState("");
    const history = useNavigate();

  const handleLogin = async () => {
    try {
      const apiUrl =  'http://ec2-13-233-113-80.ap-south-1.compute.amazonaws.com:5000/admin/loginAdmin'
     



      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

    
      if (response.ok) {
        const data = await response.json();
         
        // Check userType from the response
    
          // If userType is Admin, navigate to the admin page
          localStorage.setItem("authToken", data.payload.token)
        localStorage.setItem("authName",data.payload.account.name)
        localStorage.setItem("authImage",data.payload.account.image)
          history('/dashboard');
          toast.success('Login Successfull!!')
        //  <Link to={{ pathname: '/dashboard', state: { userData: data.payload } }}>Go to Dashboard</Link>

       
      } else {
        // Handle login failure, e.g., show error message
        toast.error('Login failed');
      }
    } catch (error) {
      // Handle network or other errors
      toast.warn('Error during login:', error);
    }
  };

  return (
<div className="min-h-screen flex items-center justify-center ">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <div className="flex items-center justify-center mb-4">
          {/* Your logo goes here */}
          <img
            src={logo}
            alt="Logo"
            className="w-30 h-14 mr-2" // Adjust the width and height as needed
          />
          {/* <h2 className="text-2xl font-bold">Login</h2> */}
        </div>
        <form>
    
       

{/* <div className="flex items-center mb-4">
        <span className="mr-4">Sign in as</span>
        <label className="flex items-center">
          <input
            type="radio"
            name="UserType"
            value="User"
            onChange={(e) => setUserType(e.target.value)}
          />
          <span className="ml-2">User</span>
        </label>
        <label className="flex items-center ml-4">
          <input
            type="radio"
            name="UserType"
            value="Admin"
            onChange={(e) => setUserType(e.target.value)}
          />
          <span className="ml-2">Admin</span>
        </label>
      </div>
          {userType == "Admin" ? (
            <label className="block mb-4">
              <label>Secret Key</label>
              <input
                type="text"
                className="border p-2 w-full"
             
                onChange={(e) => setSecretKey(e.target.value)}
                
              />
            </label>
          ) : null} */}


          <label className="block mb-4">
            Email:
            <input
              type="email"
              className="border p-2 w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label className="block mb-4">
            Password:
            <input
              type="password"
              className="border p-2 w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <button
            type="button"
            className="bg-slate-900 text-white p-2 rounded w-full"
            onClick={handleLogin}
          >
            Login
          </button>

          <Link to="/signup" className="block text-center mt-2">
            Sign up
          </Link>

        </form>
      </div>
    </div>
  );
};

export default Login;
