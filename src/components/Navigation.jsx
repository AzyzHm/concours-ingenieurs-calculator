import React from 'react'
import { Calculator, FileText, Layers } from 'lucide-react'

const TABS = [
  { id: 'year1', label: '1ère année', icon: Calculator },
  { id: 'year2', label: '2ème année', icon: Layers },
  { id: 'docs', label: 'Documents utiles', icon: FileText },
]

export default function Navigation({ active, onChange }) {
  return (
    <nav className="max-w-4xl mx-auto px-4 sm:px-6 mt-6">
      <div className="grid grid-cols-3 gap-2 p-1 rounded-xl bg-ink/[0.04] dark:bg-white/[0.06]">
        {TABS.map(({ id, label, icon: Icon }) => {
          const isActive = active === id
          return (
            <button
              key={id}
              onClick={() => onChange(id)}
              className={`flex flex-col sm:flex-row items-center justify-center gap-1.5 rounded-lg px-2 py-2.5 text-xs sm:text-sm font-medium transition-colors
                ${isActive
                  ? 'bg-white dark:bg-ink text-brand dark:text-red-400 shadow-card'
                  : 'text-ink/55 dark:text-white/50 hover:text-ink dark:hover:text-white'}`}
              aria-current={isActive ? 'page' : undefined}
            >
              <Icon size={16} strokeWidth={2} />
              <span className="truncate">{label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
