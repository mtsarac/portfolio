import { describe, expect, it } from 'vitest'
import tr from './translations/tr.json'
import en from './translations/en.json'

function flattenKeys(obj: Record<string, unknown>, prefix = ''): string[] {
  return Object.entries(obj).flatMap(([key, value]) => {
    const path = prefix ? `${prefix}.${key}` : key
    return value && typeof value === 'object' ? flattenKeys(value as Record<string, unknown>, path) : [path]
  })
}

describe('translations', () => {
  it('define the same keys in tr and en', () => {
    const trKeys = flattenKeys(tr)
    const enKeys = flattenKeys(en)

    expect(trKeys.filter((key) => !enKeys.includes(key))).toEqual([])
    expect(enKeys.filter((key) => !trKeys.includes(key))).toEqual([])
  })
})
