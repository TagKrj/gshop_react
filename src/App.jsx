import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Sidebar from './layouts/Sidebar'

function App() {

  return (
    <>
      <div className="flex min-h-screen p-3">
        <Sidebar />
        <div className="flex-1 ml-5">
          {/* Main content area */}
        </div>
      </div>
    </>
  )
}

export default App
