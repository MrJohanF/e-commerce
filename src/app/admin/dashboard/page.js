// src\app\admin\dashboard\page.js

"use client";

import React, { useState } from 'react';
import Navbar from "../../components/navbar";
import AddProductDashboard from "../products/page";
import ProductsList from "../products/list";
import AccountSettings from "../account/settings"; 

const AdminDashboard = () => {
  const [activeView, setActiveView] = useState('products'); 

  const handleViewChange = (view) => {
    setActiveView(view);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <Navbar onViewChange={handleViewChange} activeView={activeView} />
      
      {/* Appropriate view based on activeView state */}
      {activeView === 'products' ? (
        <ProductsList />
      ) : activeView === 'add-product' ? (
        <AddProductDashboard />
      ) : activeView === 'settings' ? (
        <AccountSettings />
      ) : null}
    </div>
  );
};

export default AdminDashboard;