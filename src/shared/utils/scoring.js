export function computeM(mg) {
  if (mg === '' || mg === null || isNaN(mg)) return null
  const value = Number(mg)
  if (value >= 15) return 100
  if (value > 10 && value < 15) return 20 * (value - 10)
  return 0
}

export function computeB1(birthYear, contestYear, offset) {
  if (!birthYear || isNaN(birthYear)) return null
  return Number(birthYear) >= Number(contestYear) - offset ? 5 : 0
}

export function computeB2(bacAvg, isSessionControle) {
  if (isSessionControle) return 0
  if (bacAvg === '' || bacAvg === null || isNaN(bacAvg)) return null
  const value = Number(bacAvg)
  if (value >= 16) return 20
  if (value >= 14) return 15
  if (value >= 12) return 10
  if (value >= 11) return 5
  return 0
}

export const BAND_STYLES = {
  red: {
    text: 'text-red-600 dark:text-red-400',
    bg: 'bg-red-50 dark:bg-red-950/40',
    border: 'border-red-300 dark:border-red-800',
    dot: 'bg-red-600 dark:bg-red-400',
  },
  orange: {
    text: 'text-orange-600 dark:text-orange-400',
    bg: 'bg-orange-50 dark:bg-orange-950/40',
    border: 'border-orange-300 dark:border-orange-800',
    dot: 'bg-orange-500 dark:bg-orange-400',
  },
  cyan: {
    text: 'text-cyan-700 dark:text-cyan-400',
    bg: 'bg-cyan-50 dark:bg-cyan-950/40',
    border: 'border-cyan-300 dark:border-cyan-800',
    dot: 'bg-cyan-600 dark:bg-cyan-400',
  },
  green: {
    text: 'text-green-700 dark:text-green-400',
    bg: 'bg-green-50 dark:bg-green-950/40',
    border: 'border-green-300 dark:border-green-800',
    dot: 'bg-green-600 dark:bg-green-400',
  },
}