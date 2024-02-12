import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import './css/style.css';
import './charts/ChartjsConfig';

// Import pages
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import User from './pages/UserManagement/user';
import Userwallet from './pages/UserManagement/userWallet';
import Activity from './pages/UserManagement/activityLogs';
import Support from './pages/UserManagement/supportTickets';
import Astrologer from './pages/AstrologerManagement/AstrologerOverviewPage'
import AstrologerSchedule from './pages/AstrologerSchedulePage';
import AstrologerWallet from './pages/AstrologerManagement/AstrologerWallet';
import AstrologerKYC from './pages/AstrologerManagement/AstrologerKYC';
import AstrologerPayoutManagement from './pages/AstrologerManagement/AstrologerPayout'
import AstrologerRate from './pages/AstrologerManagement/AstrologerRate';
import PayoutHistory from './pages/AstrologerManagement/PayoutHistory';
import SupportTickets from './pages/AstrologerManagement/supportsTicketsAst';
import Earning from './pages/FinanceManagement/Earning';
import PaymentGateWay from './pages/FinanceManagement/PaymentGateWay';
import TransactionDetails from './pages/FinanceManagement/TransactionDetails';
import Reporting from './pages/FinanceManagement/Reporting';

import MessageRate from './pages/ServiceManagement/MessageRate';
import LiveSessionRate from './pages/ServiceManagement/LiveSessionRate';
import OffersDiscounts from './pages/ServiceManagement/OffersDiscounts';
import OrderManagement from './pages/E-CommerceManagement/OrderManagement';
import ProductManagement from './pages/E-CommerceManagement/ProductManagement';
import PayRefund from './pages/E-CommerceManagement/PayRefund';
import CategeoryManagement from './pages/E-CommerceManagement/CategeoryManagement';
import Year from './pages/ContentManagement/Year';
import Reports from './pages/ContentManagement/Reports';
import Blog from './pages/ContentManagement/Blog';
import SignUp from './pages/SignUp';

import AllServices from './pages/ServiceManagement/AllServices';
import AllCarousel from './pages/ServiceManagement/AllCarousel';
import AllAppointments from './pages/ServiceManagement/AllAppointments';

function App() {

  const location = useLocation();

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto'
    window.scroll({ top: 0 })
    document.querySelector('html').style.scrollBehavior = ''
  }, [location.pathname]); // triggered on route change

  return (
    <>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/dashboard" element={<Dashboard/>} />
        <Route exact path="/user" element={<User />} />
        <Route exact path="/userwallet/*" element={<Userwallet />} />
        <Route exact path="/activity" element={<Activity />} />
        <Route exact path="/support" element={<Support />} />
        <Route exact path="/astrologer/*" element={<Astrologer />} />
        <Route exact path="/astrologerschedule" element={<AstrologerSchedule />} />
        <Route exact path="/astrologerwallet" element={<AstrologerWallet />} />
        <Route exact path="/astrologerpayout" element={<AstrologerPayoutManagement />} />
        <Route exact path="/astrologerrate" element={<AstrologerRate />} />
        <Route exact path="/astrologerkyc" element={<AstrologerKYC />} />
        <Route exact path="/payouthistory" element={<PayoutHistory />} />
        <Route exact path="/supportTickets" element={<SupportTickets />} />
        <Route exact path="/earning" element={<Earning />} />
        <Route exact path="/paymentgateway" element={<PaymentGateWay />} />
        <Route exact path="/finance/transaction-details" element={<TransactionDetails />} />
        <Route exact path="/finance/reporting" element={<Reporting />} />
        <Route exact path="/all_services" element={<AllServices />} />
        <Route exact path="/messagerate" element={<MessageRate />} />
        <Route exact path="/livesessionrate" element={<LiveSessionRate />} />
        <Route exact path="/offersdiscounts" element={<OffersDiscounts />} />
        <Route exact path="/ordermanagement" element={<OrderManagement />} />
        <Route exact path="/productmanagement" element={<ProductManagement />} />
        <Route exact path="/categeorymanagement" element={<CategeoryManagement />} />
        <Route exact path="/payrefund" element={<PayRefund />} />
        <Route exact path="/year" element={<Year />} />
        <Route exact path="/reports" element={<Reports />} />
        <Route exact path="/blog" element={<Blog />} />
        <Route exact path="/signup" element={<SignUp/>} />
        <Route exact path="/allcarousel" element={<AllCarousel/>} />
        <Route exact path='/allappointments' element={<AllAppointments/>} />
  
      </Routes>
    </>
  );
}

export default App;
