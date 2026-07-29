import React from 'react'

const TaskRow = ({title,progress})=> (
  <div className="flex items-center justify-between gap-3">
    <div>
      <div className="font-semibold">{title}</div>
      <div className="text-xs text-slate-400">Due: Feb 28, 2026</div>
    </div>
    <div className="w-40">
      <div className="w-full bg-white/6 rounded-full h-2 overflow-hidden">
        <div className="bg-neon h-2 rounded-full" style={{width: `${progress}%`}}></div>
      </div>
      <div className="text-xs text-slate-300 text-right mt-1">{progress}%</div>
    </div>
  </div>
)

export default function ActiveTasks(){
  return (
    <div className="card-glass p-4">
      <div className="flex items-center justify-between">
        <h4 className="font-semibold">Active Tasks</h4>
        <a className="text-sm text-slate-300" href="#">Manage</a>
      </div>
      <div className="mt-4 space-y-3">
        <TaskRow title={'Project Report'} progress={75} />
        <TaskRow title={'Java Assignment'} progress={40} />
        <TaskRow title={'DBMS Notes'} progress={15} />
      </div>
    </div>
  )
}
