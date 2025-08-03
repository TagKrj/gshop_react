import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Sidebar from './layouts/Sidebar'
import Main from './layouts/Main'


function App() {
  return (
    <>
      <div className="min-h-screen bg-gray-100">
        <Sidebar />
        <Main
          title="Dashboard"
          breadcrumb={['Home', 'Dashboard']}
          headerButtons={[
            'Loại phiếu thu',
            'Thêm phiếu thu',
          ]}

        />
      </div>
    </>
  )
}

export default App
