import React from 'react'

const Row = ({title,topic,date})=> (
  <div className="flex items-center justify-between py-3 border-b border-white/4">
    <div>
      <div className="font-semibold">{title}</div>
      <div className="text-xs text-slate-400">{topic}</div>
    </div>
    <div className="flex items-center gap-3">
      <div className="text-xs text-slate-400">{date}</div>
      <button className="px-3 py-1 rounded-md border border-white/6 text-sm">Open</button>
    </div>
  </div>
)

export default function KnowledgeHub(){
  return (
    <div className="card-glass p-4">
      <div className="flex items-center justify-between">
        <h4 className="font-semibold">Knowledge Hub</h4>
        <div className="flex items-center gap-2">
          <input placeholder="Search notes" className="bg-white/6 rounded-md px-3 py-1 text-sm" />
          <button className="px-3 py-1 rounded-md border border-white/6">Filter</button>
        </div>
      </div>

      <div className="mt-3">
        <Row title={'Java'} topic={'Inheritance'} date={'Feb 21, 2026'} />
        <Row title={'Inheritance'} topic={'OOP'} date={'Feb 20, 2026'} />
        <Row title={'DBMS'} topic={'SQL'} date={'Feb 18, 2026'} />
      </div>
    </div>
  )
}
