import React from 'react'

export default function Hero(){
  return (
    <section className="card-glass p-4 md:p-6 lg:p-8 flex items-center justify-between gap-4">
      <div>
        <p className="text-sm text-slate-300">Study Dashboard</p>
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight">Welcome back, Vishal</h1>
        <p className="mt-2 text-slate-400 max-w-xl">Your AI Assistant is ready. Check your momentum and pick the next best action to stay focused.</p>
      </div>

      <div className="hidden md:flex flex-col items-end gap-3">
        <div className="px-4 py-2 rounded-lg bg-gradient-to-r from-neon/20 via-[#8ef0ff]/10 to-accent/10 border border-white/6">
          <div className="text-sm text-slate-300">🔥 Study Streak</div>
          <div className="font-bold text-lg">12 days</div>
        </div>
        <div className="px-4 py-2 rounded-lg bg-white/3 border border-white/6">
          <div className="text-sm text-slate-300">📚 Notes</div>
          <div className="font-bold text-lg">9</div>
        </div>
      </div>
    </section>
  )
}
