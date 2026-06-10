import React from 'react'

const NavItem = ({children, active})=> (
  <a className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${active ? 'text-black bg-white/80 font-semibold shadow-sm' : 'text-slate-300 hover:bg-white/5'}`} href="#">{children}</a>
)

export default function Sidebar(){
  return (
    <aside className="hidden md:flex md:flex-col md:shrink-0 md:w-60 lg:w-64 bg-gradient-to-b from-[#070913]/80 to-[#0b0f14]/80 p-4 h-screen sticky top-0">
      <div className="flex items-center gap-3 mb-6">
        <img src="/assets/study-logo-theme.png" alt="NexMind" className="w-9 h-9" />
        <div className="text-lg font-bold tracking-tight">NexMind</div>
      </div>

      <nav className="flex-1 space-y-1">
        <NavItem active>Dashboard</NavItem>
        <NavItem>Notes</NavItem>
        <NavItem>AI Assistant</NavItem>
        <NavItem>Tasks</NavItem>
        <NavItem>Planner</NavItem>
      </nav>

      <div className="mt-auto pt-4">
        <div className="flex items-center gap-3 p-2 rounded-md hover:bg-white/3">
          <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">V</div>
          <div>
            <div className="text-sm font-semibold">Vishal</div>
            <div className="text-xs text-slate-400">View profile</div>
          </div>
        </div>
      </div>
    </aside>
  )
}
