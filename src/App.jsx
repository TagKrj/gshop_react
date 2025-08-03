import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Sidebar from './layouts/Sidebar'
import Main from './layouts/Main'
import ButtonDemo from './components/ButtonDemo'
import { ButtonFilterDemo } from './components/buttonFilter'
import { ButtonAddDemo } from './components/buttonAdd'

function App() {

  return (
    <>
      <div className="min-h-screen bg-gray-100">
        <Sidebar />
        <Main
          title="Dashboard"
          breadcrumb="Trang chủ / Dashboard"
        >
          <div style={{ marginBottom: '40px' }}>
            <ButtonDemo />
          </div>
          <div style={{ borderTop: '1px solid #E5E7EB', paddingTop: '40px', marginBottom: '40px' }}>
            <ButtonFilterDemo />
          </div>
          <div style={{ borderTop: '1px solid #E5E7EB', paddingTop: '40px' }}>
            <ButtonAddDemo />
          </div>
        </Main>
      </div>
    </>
  )
}

export default App
