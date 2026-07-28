import { describe, it, expect } from 'vitest'
import { computeScoreYear2, getBandYear2 } from './year2.scoring'

describe('computeScoreYear2', () => {
  it('applies the redoublant coefficient correctly', () => {
    expect(computeScoreYear2({ M: 100, B1: 5, B2: 20, C: 1 })).toBe(125)
    expect(computeScoreYear2({ M: 100, B1: 5, B2: 20, C: 0.8 })).toBe(100)
  })

  it('returns null if any required component is missing', () => {
    expect(computeScoreYear2({ M: null, B1: 5, B2: 20, C: 1 })).toBeNull()
  })
})

describe('getBandYear2', () => {
  it('bands scores into the correct category', () => {
    expect(getBandYear2(50).key).toBe('red')
    expect(getBandYear2(75).key).toBe('orange')
    expect(getBandYear2(100).key).toBe('cyan')
    expect(getBandYear2(120).key).toBe('green')
  })
})