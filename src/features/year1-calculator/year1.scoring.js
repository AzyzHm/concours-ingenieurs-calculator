import { isValidGrade, isValidPositiveInt } from '../../shared/utils/validators'

export function computeRi(rang, effectif) {
  if (!isValidPositiveInt(rang) || !isValidPositiveInt(effectif)) return null
  if (Number(rang) > Number(effectif)) return null
  const ri = (Number(rang) - 1) / Number(effectif)
  if (ri <= 0.3) return 100 - (700 * ri) / 3
  return 0
}

export function computeR(ri1, ri2) {
  if (ri1 === null || ri2 === null) return null
  return (ri1 + ri2) / 2
}

export function computeMg(l1, l2) {
  if (!isValidGrade(l1) || !isValidGrade(l2)) return null
  return (Number(l1) + Number(l2)) / 2
}

export function computeML(fr1, fr2, en1, en2) {
  const values = [fr1, fr2, en1, en2]
  if (values.some((v) => !isValidGrade(v))) return null
  return (Number(fr1) + Number(fr2) + Number(en1) + Number(en2)) / 4
}

export function computeScoreA({ M, R, ML, B1, B2 }) {
  if ([M, R, ML, B1, B2].some((v) => v === null || v === undefined)) return null
  return 0.2 * M + (1.4 / 3) * R + (5 / 6) * ML + (2 / 3) * (B1 + B2)
}

export function computeGlobalYear1(scoreA, scoreE) {
  if (scoreA === null || !isValidGrade(scoreE, { min: 0, max: 100 })) return null
  return scoreA * 0.7 + Number(scoreE) * 0.3
}

export function getBandYear1(score) {
  if (score === null || isNaN(score)) return null
  if (score < 40) return { key: 'red', label: 'Insuffisant', message: "Ce score ne permet pas de réussir la sélection." }
  if (score < 65) return { key: 'orange', label: 'Probabilité faible', message: "Le candidat a une probabilité faible d'être sélectionné." }
  if (score < 85) return { key: 'cyan', label: 'Probabilité modérée', message: "Le candidat a une probabilité modérée d'être sélectionné (élevée s'il peut participer à un concours interne)." }
  return { key: 'green', label: 'Probabilité élevée', message: "Le candidat a une probabilité élevée d'être sélectionné." }
}