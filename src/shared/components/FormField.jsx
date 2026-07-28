import React from 'react'

export default function FormField({
  label,
  hint,
  suffix,
  error,
  ...inputProps
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-ink/80 dark:text-white/80">{label}</span>
      <div className="mt-1.5 relative">
        <input
          {...inputProps}
          className={`w-full rounded-lg border bg-white dark:bg-ink/40 px-3 py-2.5 text-ink dark:text-white font-mono text-[15px]
            border-ink/15 dark:border-white/15 focus:border-brand dark:focus:border-red-400
            placeholder:text-ink/30 dark:placeholder:text-white/30 transition-colors
            ${error ? 'border-red-500 dark:border-red-500' : ''}`}
        />
        {suffix && (
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-ink/40 dark:text-white/40">
            {suffix}
          </span>
        )}
      </div>
      {hint && !error && <p className="mt-1 text-xs text-ink/45 dark:text-white/40">{hint}</p>}
      {error && <p className="mt-1 text-xs text-red-600 dark:text-red-400">{error}</p>}
    </label>
  )
}
