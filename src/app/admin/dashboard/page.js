// src\app\admin\dashboard\page.js

"use client";

import React, { useState, useEffect } from 'react';
import Navbar from "../../components/navbar";
import AddProductDashboard from "../products/page";
import ProductsList from "../products/list";
import AccountSettings from "../account/settings"; 
import { useAuth } from '../../authContext';
import { useRouter } from 'next/navigation';

const AdminDashboard = () => {
  const [activeView, setActiveView] = useState('products'); 
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
    
    if (user && user.role !== 'ADMIN') {
      router.push('/login');
    }
  }, [user, loading, router]);


  const handleViewChange = (view) => {
    setActiveView(view);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!user || user.role !== 'ADMIN') {
    return null; // Don't render anything while redirecting
  }

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