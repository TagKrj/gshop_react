import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Sidebar from './layouts/Sidebar'
import router from './routes/router'
import Supplier from './pages/products/supplier'
import { BrowserRouter, Route, Routes, Navigate, Outlet } from 'react-router-dom'
import Login from "./pages/auth/Login";

// Layout với Sidebar cho các trang chính
const MainLayout = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar />
      <div className="ml-64 p-5">
        <Outlet />
      </div>
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Route đăng nhập riêng biệt, không có sidebar */}
        <Route path="/auth/login" element={<Login />} />

        {/* Các route chính với sidebar */}
        <Route element={<MainLayout />}>
          {router.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={<route.screen />}
            />
          ))}
        </Route>

        {/* Route mặc định chuyển hướng đến trang login */}
        <Route path="*" element={<Navigate to="/auth/login" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
