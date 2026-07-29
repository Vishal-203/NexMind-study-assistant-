import React from 'react'

export default function TopNav(){
  return (
    <header className="w-full sticky top-0 z-40 bg-black/30 backdrop-blur-sm border-b border-white/6">
      <div className="max-w-[1600px] mx-auto flex items-center gap-4 px-4 py-3">
        <div className="flex-1">
          <h2 className="text-xl font-bold">Dashboard</h2>
        </div>

        <div className="flex-1 max-w-xl">
          <label className="relative block">
            <input aria-label="Search" placeholder="Search notes, tasks, concepts..." className="w-full rounded-md py-2 px-3 bg-white/6 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-neon" />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-300">⌕</span>
          </label>
        </div>

        <div className="flex items-center gap-3">
          <button className="p-2 rounded-md hover:bg-white/6" aria-label="Notifications">🔔</button>
          <button className="p-2 rounded-md hover:bg-white/6" aria-label="Settings">⚙️</button>
          <button className="w-9 h-9 rounded-full bg-white/8">V</button>
        </div>
      </div>
    </header>
  )
}
