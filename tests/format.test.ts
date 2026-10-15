import { describe, expect, it } from 'vitest'
import { formatNewsDate } from '@/lib/format'

describe('formatNewsDate', () => {
  it('respeita a precisão da data', () => {
    expect(formatNewsDate({ date: '2016-08', datePrecision: 'month' })).toBe('agosto de 2016')
    expect(formatNewsDate({ date: '2016-08-05', datePrecision: 'day' })).toBe('5 de agosto de 2016')
    expect(formatNewsDate({ date: '2016', datePrecision: 'year' })).toBe('2016')
  })
})
