import { describe, it, expect } from 'vitest'
import { isValidGrade, isValidPositiveInt, isValidYear } from './validators'

describe('isValidGrade', () => {
  it('accepts values within 0-20 by default', () => {
    expect(isValidGrade('0')).toBe(true)
    expect(isValidGrade('20')).toBe(true)
    expect(isValidGrade('13.45')).toBe(true)
  })

  it('rejects negative values', () => {
    expect(isValidGrade('-5')).toBe(false)
  })

  it('rejects values above the max', () => {
    expect(isValidGrade('21')).toBe(false)
  })

  it('rejects empty, null, undefined, and non-numeric input', () => {
    expect(isValidGrade('')).toBe(false)
    expect(isValidGrade(null)).toBe(false)
    expect(isValidGrade(undefined)).toBe(false)
    expect(isValidGrade('abc')).toBe(false)
  })

  it('respects a custom max (e.g. Score E out of 100)', () => {
    expect(isValidGrade('72', { min: 0, max: 100 })).toBe(true)
    expect(isValidGrade('150', { min: 0, max: 100 })).toBe(false)
  })
})

describe('isValidPositiveInt', () => {
  it('accepts positive integers', () => {
    expect(isValidPositiveInt('1')).toBe(true)
    expect(isValidPositiveInt('120')).toBe(true)
  })

  it('rejects zero and negative numbers', () => {
    expect(isValidPositiveInt('0')).toBe(false)
    expect(isValidPositiveInt('-3')).toBe(false)
  })

  it('rejects non-integers', () => {
    expect(isValidPositiveInt('1.5')).toBe(false)
  })

  it('rejects empty/null/undefined', () => {
    expect(isValidPositiveInt('')).toBe(false)
    expect(isValidPositiveInt(null)).toBe(false)
    expect(isValidPositiveInt(undefined)).toBe(false)
  })
})

describe('isValidYear', () => {
  it('accepts a reasonable year', () => {
    expect(isValidYear('2001')).toBe(true)
  })

  it('rejects years outside the default 1900-2100 range', () => {
    expect(isValidYear('1899')).toBe(false)
    expect(isValidYear('2101')).toBe(false)
  })

  it('rejects non-integers and empty input', () => {
    expect(isValidYear('2001.5')).toBe(false)
    expect(isValidYear('')).toBe(false)
  })
})