import React from 'react'

export default function FormSection({ title, description, children }) {
  return (
    <div className="rounded-xl border border-ink/10 dark:border-white/10 bg-white dark:bg-white/[0.03] p-4 sm:p-5">
      <h3 className="font-display text-base font-semibold text-ink dark:text-white">{title}</h3>
      {description && (
        <p className="text-xs text-ink/50 dark:text-white/45 mt-0.5 mb-4">{description}</p>
      )}
      <div className={description ? '' : 'mt-4'}>{children}</div>
    </div>
  )
}
