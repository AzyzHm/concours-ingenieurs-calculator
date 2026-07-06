import React from 'react'
import { BAND_STYLES } from '../utils/scoring'

const DOT_COLORS = {
  red: '#DC2626',
  orange: '#F97316',
  cyan: '#0891B2',
  green: '#16A34A',
}

export default function ScoreGauge({ score, band, domainMax = 100, sizeLabel = 'Score' }) {
  const radius = 80
  const stroke = 14
  const cx = 100
  const cy = 100
  const circumference = Math.PI * radius

  const pct = score === null || isNaN(score) ? 0 : Math.max(0, Math.min(1, score / domainMax))
  const dashOffset = circumference * (1 - pct)
  const color = band ? DOT_COLORS[band.key] : '#9CA3AF'

  return (
    <div className="flex flex-col items-center">
      <svg viewBox="0 0 200 115" className="w-full max-w-[260px]">
        <path
          d={`M ${cx - radius} ${cy} A ${radius} ${radius} 0 0 1 ${cx + radius} ${cy}`}
          fill="none"
          stroke="currentColor"
          strokeWidth={stroke}
          strokeLinecap="round"
          className="text-ink/10 dark:text-white/10"
        />
        <path
          d={`M ${cx - radius} ${cy} A ${radius} ${radius} 0 0 1 ${cx + radius} ${cy}`}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          style={{ transition: 'stroke-dashoffset 0.6s ease, stroke 0.4s ease' }}
        />
      </svg>
      <div className="-mt-8 text-center">
        <div
          className="font-display text-4xl sm:text-5xl font-semibold tabular-nums"
          style={{ color }}
        >
          {score === null || isNaN(score) ? '—' : score.toFixed(2)}
        </div>
        <div className="text-xs uppercase tracking-wider text-ink/40 dark:text-white/40 mt-1">
          {sizeLabel}
        </div>
      </div>
    </div>
  )
}
