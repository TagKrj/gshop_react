import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Sidebar from './layouts/Sidebar'
import ReceiptTypes from './pages/receiptTypes'


function App() {
  return (
    <>
      <div className="min-h-screen bg-gray-100">
        <Sidebar />
        <ReceiptTypes />
      </div>
    </>
  )
}

export default App
