export function isValidGrade(value, { min = 0, max = 20 } = {}) {
  if (value === '' || value === null || value === undefined) return false
  const n = Number(value)
  if (Number.isNaN(n)) return false
  return n >= min && n <= max
}

export function isValidPositiveInt(value) {
  if (value === '' || value === null || value === undefined) return false
  const n = Number(value)
  return Number.isInteger(n) && n >= 1
}

export function isValidYear(value, { min = 1900, max = 2100 } = {}) {
  if (value === '' || value === null || value === undefined) return false
  const n = Number(value)
  return Number.isInteger(n) && n >= min && n <= max
}