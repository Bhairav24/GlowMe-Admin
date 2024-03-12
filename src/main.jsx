import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import ThemeProvider from './utils/ThemeContext';
import App from './App';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
   
      <ThemeProvider>
        <App />
        <ToastContainer 
       
position="bottom-center"
        autoClose={3000}
        hideProgressBar={true}
        pauseOnHover={false}
        rtl={false}/>
      </ThemeProvider>

     
    </Router>
  </React.StrictMode>
);
