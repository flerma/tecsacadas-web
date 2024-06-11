import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login/Login';
import CustomerRegister from './components/customer/CustomerRegister';
import './App.css';
import CustomerSearch from './components/customer/CustomerSearch';
import Layout from './components/layout/Layout';

const App = () => {

  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/main" element={<Layout />}>
          <Route path="customer-register" element={<CustomerRegister />} />
          <Route path="customer-search" element={<CustomerSearch />} />
        </Route>
      </Routes>
    </div>
  );
};



export default App;
