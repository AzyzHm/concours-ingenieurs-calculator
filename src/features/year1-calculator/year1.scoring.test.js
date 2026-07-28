import { describe, it, expect } from 'vitest'
import {
  computeRi,
  computeR,
  computeMg,
  computeML,
  computeScoreA,
  computeGlobalYear1,
  getBandYear1,
} from './year1.scoring'

describe('computeRi', () => {
  it('computes a valid Ri within the top 30%', () => {
    expect(computeRi(5, 120)).toBeCloseTo(100 - (700 * (4 / 120)) / 3)
  })

  it('returns 0 outside the top 30%', () => {
    expect(computeRi(100, 120)).toBe(0)
  })

  it('rejects a negative rank', () => {
    expect(computeRi(-5, 120)).toBeNull()
  })

  it('rejects rang greater than effectif', () => {
    expect(computeRi(130, 120)).toBeNull()
  })

  it('rejects zero/empty/non-integer input', () => {
    expect(computeRi(0, 120)).toBeNull()
    expect(computeRi('', 120)).toBeNull()
    expect(computeRi(2.5, 120)).toBeNull()
  })
})

describe('computeMg', () => {
  it('averages two valid grades', () => {
    expect(computeMg(12, 14)).toBe(13)
  })

  it('rejects if either grade is out of range', () => {
    expect(computeMg(-1, 14)).toBeNull()
    expect(computeMg(12, 25)).toBeNull()
  })

  it('rejects missing input', () => {
    expect(computeMg('', 14)).toBeNull()
  })
})

describe('computeML', () => {
  it('averages four valid grades', () => {
    expect(computeML(10, 12, 14, 16)).toBe(13)
  })

  it('rejects if any grade is out of range', () => {
    expect(computeML(10, 12, 14, 25)).toBeNull()
    expect(computeML(-1, 12, 14, 16)).toBeNull()
  })
})

describe('computeScoreA / computeGlobalYear1 / getBandYear1', () => {
  it('returns null if any component is missing', () => {
    expect(computeScoreA({ M: 100, R: null, ML: 13, B1: 5, B2: 20 })).toBeNull()
  })

  it('computes a plausible weighted score', () => {
    const score = computeScoreA({ M: 100, R: 100, ML: 20, B1: 5, B2: 20 })
    expect(score).toBeCloseTo(0.2 * 100 + (1.4 / 3) * 100 + (5 / 6) * 20 + (2 / 3) * 25)
  })

  it('rejects an out-of-range Score E for the global score', () => {
    expect(computeGlobalYear1(80, 150)).toBeNull()
  })

  it('bands scores into the correct category', () => {
    expect(getBandYear1(30).key).toBe('red')
    expect(getBandYear1(50).key).toBe('orange')
    expect(getBandYear1(70).key).toBe('cyan')
    expect(getBandYear1(90).key).toBe('green')
  })
})