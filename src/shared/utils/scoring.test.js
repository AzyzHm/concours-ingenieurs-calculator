import { describe, it, expect } from 'vitest'
import { computeM, computeB1, computeB2 } from './scoring'

describe('computeM', () => {
  it('returns 100 for mg >= 15', () => {
    expect(computeM(15)).toBe(100)
    expect(computeM(20)).toBe(100)
  })

  it('scales linearly between 10 and 15', () => {
    expect(computeM(12)).toBeCloseTo(40)
    expect(computeM(14)).toBeCloseTo(80)
  })

  it('returns 0 for mg <= 10', () => {
    expect(computeM(10)).toBe(0)
    expect(computeM(5)).toBe(0)
  })

  it('rejects negative or out-of-range mg instead of treating it as 0', () => {
    expect(computeM(-5)).toBeNull()
    expect(computeM(21)).toBeNull()
  })

  it('rejects empty/invalid input', () => {
    expect(computeM('')).toBeNull()
    expect(computeM(null)).toBeNull()
    expect(computeM('abc')).toBeNull()
  })
})

describe('computeB1', () => {
  it('returns 5 when birth year is recent enough', () => {
    expect(computeB1(2003, 2025, 22)).toBe(5)
  })

  it('returns 0 when birth year is too early', () => {
    expect(computeB1(1990, 2025, 22)).toBe(0)
  })

  it('rejects a negative or nonsensical birth year', () => {
    expect(computeB1(-5, 2025, 22)).toBeNull()
  })

  it('rejects empty/invalid input', () => {
    expect(computeB1('', 2025, 22)).toBeNull()
    expect(computeB1(null, 2025, 22)).toBeNull()
  })
})

describe('computeB2', () => {
  it('returns 0 unconditionally in session de contrôle', () => {
    expect(computeB2(18, true)).toBe(0)
    expect(computeB2('', true)).toBe(0)
  })

  it('applies the correct bac-average band', () => {
    expect(computeB2(16, false)).toBe(20)
    expect(computeB2(14, false)).toBe(15)
    expect(computeB2(12, false)).toBe(10)
    expect(computeB2(11, false)).toBe(5)
    expect(computeB2(9, false)).toBe(0)
  })

  it('rejects out-of-range averages instead of defaulting to 0', () => {
    expect(computeB2(-3, false)).toBeNull()
    expect(computeB2(25, false)).toBeNull()
  })
})