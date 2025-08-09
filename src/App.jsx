import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Sidebar from './layouts/Sidebar'
import Supplier from './pages/products/supplier'
import TypeProducts from './pages/products/typeProducts'
import PriceList from './pages/products/priceList'
import ListProduct from './pages/products/listProduct'


function App() {
  return (
    <>
      <div className="min-h-screen bg-gray-100">
        <Sidebar />
        <ListProduct />
      </div>
    </>
  )
}

export default App
