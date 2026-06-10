import React from 'react'

const StatCard = ({icon,label,value})=> (
  <div className="card-glass p-4 flex items-center gap-3">
    <div className="w-12 h-12 rounded-lg bg-white/6 flex items-center justify-center text-neon">{icon}</div>
    <div>
      <div className="text-sm text-slate-300">{label}</div>
      <div className="font-bold text-xl">{value}</div>
    </div>
  </div>
)

export default function QuickStats(){
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard icon={'📚'} label={'Notes'} value={'9'} />
      <StatCard icon={'✅'} label={'Completed'} value={'42'} />
      <StatCard icon={'⏳'} label={'Pending'} value={'3'} />
      <StatCard icon={'🔥'} label={'Focus Streak'} value={'12d'} />
    </div>
  )
}
