import React from 'react'

export default function AIMatch(){
  return (
    <div className="card-glass p-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">AI Recommendation</h3>
          <p className="text-sm text-slate-300">Next best action to keep your momentum.</p>
        </div>
        <div className="text-sm text-slate-400">Priority: <span className="font-bold text-neon">High</span></div>
      </div>

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <div className="text-sm text-slate-300">Next Best Action</div>
          <div className="font-bold">Complete Project Report</div>
        </div>
        <div>
          <div className="text-sm text-slate-300">Estimated Time</div>
          <div className="font-bold">45 minutes</div>
        </div>
      </div>

      <div className="mt-4 flex gap-3">
        <button className="btn-primary px-4 py-2 rounded-md bg-gradient-to-r from-neon to-accent text-black font-semibold">Start Now</button>
        <button className="px-4 py-2 rounded-md border border-white/8">View Planner</button>
      </div>
    </div>
  )
}
