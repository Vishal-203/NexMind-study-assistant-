import React from 'react'
import Sidebar from './components/Sidebar'
import TopNav from './components/TopNav'
import Dashboard from './components/Dashboard'

export default function App(){
  return (
    <div className="min-h-screen">
      <div className="flex">
        <Sidebar />
        <div className="flex-1">
          <TopNav />
          <main className="max-w-[1600px] mx-auto p-4 md:p-5 lg:p-6">
            <Dashboard />
          </main>
        </div>
      </div>
    </div>
  )
}
