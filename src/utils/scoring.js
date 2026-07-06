export function computeM(mg) {
  if (mg === '' || mg === null || isNaN(mg)) return null
  const value = Number(mg)
  if (value >= 15) return 100
  if (value > 10 && value < 15) return 20 * (value - 10)
  return 0
}


export function computeRi(rang, effectif) {
  if (!rang || !effectif || isNaN(rang) || isNaN(effectif) || Number(effectif) <= 0) return null
  const ri = (Number(rang) - 1) / Number(effectif)
  if (ri <= 0.3) return 100 - (700 * ri) / 3
  return 0
}

export function computeR(ri1, ri2) {
  if (ri1 === null || ri2 === null) return null
  return (ri1 + ri2) / 2
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

export function computeML(fr1, fr2, en1, en2) {
  const values = [fr1, fr2, en1, en2]
  if (values.some((v) => v === '' || v === null || isNaN(v))) return null
  return (Number(fr1) + Number(fr2) + Number(en1) + Number(en2)) / 4
}

export function computeScoreA({ M, R, ML, B1, B2 }) {
  if ([M, R, ML, B1, B2].some((v) => v === null || v === undefined)) return null
  return 0.2 * M + (1.4 / 3) * R + (5 / 6) * ML + (2 / 3) * (B1 + B2)
}

export function computeGlobalYear1(scoreA, scoreE) {
  if (scoreA === null || scoreE === '' || scoreE === null || isNaN(scoreE)) return null
  return scoreA * 0.7 + Number(scoreE) * 0.3
}

export function computeScoreYear2({ M, B1, B2, C }) {
  if ([M, B1, B2].some((v) => v === null || v === undefined)) return null
  return C * (M + B1 + B2)
}

export function getBandYear1(score) {
  if (score === null || isNaN(score)) return null
  if (score < 40) {
    return {
      key: 'red',
      label: 'Insuffisant',
      message: "Ce score ne permet pas de réussir la sélection.",
    }
  }
  if (score < 65) {
    return {
      key: 'orange',
      label: 'Probabilité faible',
      message: "Le candidat a une probabilité faible d'être sélectionné.",
    }
  }
  if (score < 85) {
    return {
      key: 'cyan',
      label: 'Probabilité modérée',
      message:
        "Le candidat a une probabilité modérée d'être sélectionné (élevée s'il peut participer à un concours interne).",
    }
  }
  return {
    key: 'green',
    label: 'Probabilité élevée',
    message: "Le candidat a une probabilité élevée d'être sélectionné.",
  }
}

export function getBandYear2(score) {
  if (score === null || isNaN(score)) return null
  if (score < 60) {
    return {
      key: 'red',
      label: 'Insuffisant',
      message: "Ce score ne permet pas de réussir la sélection.",
    }
  }
  if (score < 90) {
    return {
      key: 'orange',
      label: 'Probabilité faible',
      message: "Le candidat a une probabilité faible d'être sélectionné.",
    }
  }
  if (score < 110) {
    return {
      key: 'cyan',
      label: 'Probabilité modérée',
      message: "Le candidat a une probabilité modérée d'être sélectionné.",
    }
  }
  return {
    key: 'green',
    label: 'Probabilité élevée',
    message: "Le candidat a une probabilité élevée d'être sélectionné.",
  }
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
