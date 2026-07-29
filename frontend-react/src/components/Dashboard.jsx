import React from 'react'
import Hero from './sections/Hero'
import QuickStats from './sections/QuickStats'
import AIMatch from './sections/AIMatch'
import ActiveTasks from './sections/ActiveTasks'
import KnowledgeHub from './sections/KnowledgeHub'

export default function Dashboard(){
  return (
    <div className="space-y-6">
      <Hero />

      <QuickStats />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7">
          <AIMatch />
          <div className="mt-4"><ActiveTasks /></div>
        </div>
        <div className="lg:col-span-5">
          <KnowledgeHub />
        </div>
      </div>
    </div>
  )
}
