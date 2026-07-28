export function computeScoreYear2({ M, B1, B2, C }) {
  if ([M, B1, B2].some((v) => v === null || v === undefined)) return null
  return C * (M + B1 + B2)
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